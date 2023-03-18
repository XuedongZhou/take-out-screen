<template>
  <div class="base-scroll-list" :id="id">
    <div class="list-header"
      :style="{ backgroundColor: actualConfig?.headerBackgroundColor, height: `${actualConfig?.headerHeight}px` }">
      <div class="header-item ellipsis-text" v-for="(headerItem, i) in headerData" :key="headerItem + i"
        :style="{ color: actualConfig?.headerColor, fontSize: actualConfig?.headerFontSize, width: columnWidths[i], textAlign: aligns[i] }"
        v-html="headerItem"></div>
    </div>
    <div class="list-rows-wrapper" :style="{ height: rowsHeight }">
      <div class="list-rows" v-for="(row, index) in currentRowsData" :key="row.rowIndex"
        :style="{ height: rowsHeights[index], lineHeight: rowsHeights[index], backgroundColor: row.rowIndex % 2 === 0 ? actualConfig?.rowBackground[0] : actualConfig?.rowBackground[1] }">
        <div class="list-columns ellipsis-text" v-for="(col, colIndex) in row.data" :key="colIndex"
          :style="{ color: actualConfig?.rowColor, fontSize: actualConfig?.rowFontSize, textAlign: aligns[colIndex], width: columnWidths[colIndex], ...columnStyles[colIndex] }"
          v-html="col">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick, type CSSProperties, computed, onMounted } from 'vue';
import { v4 as uuidV4 } from 'uuid'
import { cloneDeep, assign } from 'lodash-es'
import useScreen from '@/hooks/useScreen';

export type BaseScrollListProps = {
  config: {
    data?: Array<any[]>;
    headerData?: string[];
    headerStyle?: CSSProperties[];
    headerBackgroundColor?: string;
    headerHeight?: number;
    headerIndex?: boolean;
    headerIndexStyle?: CSSProperties;
    headerIndexContent?: string;
    headerIndexData?: Array<string | number>;
    columnsStyles?: CSSProperties[];
    rowIndexStyle?: CSSProperties;
    rowNum?: number;
    rowBackground?: [string, string];
    aligns?: Array<CSSProperties['text-align']>;
    headerFontSize?: CSSProperties['fontSize'];
    rowFontSize?: CSSProperties['fontSize'];
    headerColor?: CSSProperties['color'];
    rowColor?: CSSProperties['color'];
    moveNum?: number;
    duration?: number;
  }
}

type Config = Required<BaseScrollListProps['config']>;

const props = defineProps<BaseScrollListProps>();
const defaultConfig: Config = {
  data: [],
  headerData: [],
  headerStyle: [],
  headerBackgroundColor: 'transparent',
  headerHeight: 35,
  headerIndex: false,
  headerIndexStyle: {
    width: '50px'
  },
  headerIndexData: [],
  headerIndexContent: '#',
  columnsStyles: [],
  rowIndexStyle: {
    width: '50px'
  },
  rowNum: 10,
  rowBackground: ['#fff', '#fff'],
  aligns: [],
  headerFontSize: '16px',
  rowFontSize: '16px',
  headerColor: '#000',
  rowColor: '#000',
  moveNum: 1,
  duration: 3000
}

const id = `base-scroll-list-${uuidV4()}`;
const { width, height } = useScreen(id)
const actualConfig = ref<Config>()

const rowsHeight = computed(() => `${height.value - (actualConfig.value?.headerHeight || 0)}px`)

const headerData = ref<string[]>([])
const headerStyleData = ref<CSSProperties[]>([])
const columnWidths = ref<CSSProperties['width'][]>([])
const rowsData = ref<Array<{ data: any[], rowIndex: number }>>([])
const currentRowsData = ref<Array<{ data: any[], rowIndex: number }>>([])
const currentRowIndex = ref<number>(0)
const rowsHeights = ref<string[]>([])
const rowNum = ref(defaultConfig.rowNum)
const columnStyles = ref<CSSProperties[]>([])
const aligns = ref<CSSProperties['text-align'][]>([])
const avgHeight = ref<number>()
const isAnimationStart = ref(true)

async function handleHeader(config: Config) {
  const cloneHeaderData = cloneDeep(config.headerData)
  const cloneHeaderStyle = cloneDeep(config.headerStyle)
  const cloneColumnsStyles = cloneDeep(config.columnsStyles)
  const cloneData = cloneDeep(config.data)
  const cloneAligns = new Array(cloneHeaderData.length).fill('center').map((item, index) => config.aligns[index] ? config.aligns[index] : item)

  if (config.headerIndex) {
    cloneHeaderData.unshift(config.headerIndexContent)
    cloneHeaderStyle.unshift(config.headerIndexStyle)
    cloneColumnsStyles.unshift(config.rowIndexStyle)
    cloneData.forEach((rows, index) => {
      if (config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[index] !== undefined) {
        rows.unshift(config.headerIndexData[index])
      } else {
        rows.unshift(index + 1)
      }
    })
    cloneAligns.unshift('center')
  }


  // 排除自定义 width 的列
  let usedWidth = 0;
  let usedColumnNum = 0;
  cloneHeaderStyle.forEach(style => {
    if (style.width) {
      usedColumnNum++;
      usedWidth += parseFloat(String(style.width))
    }
  })
  // 剩余 width / 未定义 width 的列
  const avgWidth = (width.value - usedWidth) / (cloneHeaderData.length - usedColumnNum)
  const columnWidthsData = new Array(cloneHeaderData.length).fill(`${avgWidth}px`).map((_, index) => {
    const columnsWidth = cloneHeaderStyle[index]?.width
    return columnsWidth == undefined ? `${avgWidth}px` : columnsWidth
  })

  columnWidths.value = columnWidthsData;
  headerData.value = cloneHeaderData
  headerStyleData.value = cloneHeaderStyle

  if (cloneData.length >= config.rowNum && cloneData.length < config.rowNum * 2) {
    const newRowData = [...cloneData, ...cloneData];
    rowsData.value = newRowData.map((item, index) => {
      return {
        data: item,
        rowIndex: index
      }
    })
  } else {
    rowsData.value = cloneData.map((item, index) => {
      return {
        data: item,
        rowIndex: index
      }
    })
  }
  columnStyles.value = cloneColumnsStyles
  aligns.value = cloneAligns
}

function handleRows(config: Config) {
  // 动态计算行高
  const { headerHeight } = config;
  rowNum.value = config.rowNum;
  const unUseHeight = height.value - headerHeight
  if (rowNum.value > rowsData.value.length) {
    rowNum.value = rowsData.value.length
  }
  avgHeight.value = unUseHeight / rowNum.value
  rowsHeights.value = new Array(rowNum.value).fill(`${avgHeight.value}px`)
}

async function startAnimation() {
  if (!isAnimationStart.value) {
    return
  }
  const config = actualConfig.value
  if (!config) {
    return
  }
  const { moveNum, duration } = config
  const totalLength = rowsData.value.length
  if (totalLength < rowNum.value) {
    return
  }
  const index = currentRowIndex.value;
  const cloneRowsData = cloneDeep(rowsData.value)
  const rows = cloneRowsData.slice(index)
  rows.push(...cloneRowsData.slice(0, index))
  currentRowsData.value = rows
  rowsHeights.value = new Array(totalLength).fill(`${avgHeight.value}px`)
  const waitTime = 300
  if (!isAnimationStart.value) {
    return
  }
  await new Promise(resolve => setTimeout(resolve, waitTime))
  // 将 moveNum 的行高设置为 0
  rowsHeights.value.splice(0, moveNum, ...new Array(moveNum).fill('0px'))
  currentRowIndex.value += moveNum
  const isLast = currentRowIndex.value - totalLength
  if (isLast >= 0) {
    currentRowIndex.value = isLast
  }
  if (!isAnimationStart.value) {
    return
  }
  await new Promise(resolve => setTimeout(resolve, duration - waitTime))
  await startAnimation()
}

function stopAnimation() {
  isAnimationStart.value = false
}

async function update() {
  stopAnimation();
  const config: Config = assign(defaultConfig, props.config)
  handleHeader(config)
  handleRows(config)
  actualConfig.value = config
  isAnimationStart.value = true
  startAnimation()
}

watch(() => props.config, () => {
  update()
}, { immediate: true })

// onMounted(async () => {
//   await nextTick()
//   update()
// })
</script>

<style scoped lang="scss">
.base-scroll-list {
  width: 100%;
  height: 100%;

  .ellipsis-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }

  .list-header {
    display: flex;
    font-size: 15px;
    align-items: center;
    overflow: hidden
  }

  .list-rows-wrapper {
    overflow: hidden;

    .list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;

      .list-columns {
        height: 100%;
      }
    }
  }
}
</style>
