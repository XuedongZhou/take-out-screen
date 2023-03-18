<template>
    <div class="sales-ranking">
        <div class="title">地区商家销售排行</div>
        <div class="list-wrapper">
            <div class="list-inner" v-for="(item, index) in headerData" :key="index">
                <div class="list">
                    <div class="list-title">{{ item.title }}</div>
                    <div class="list-separator-wrapper">
                        <div class="list-separator"></div>
                    </div>
                    <div class="chart-wrapper">
                        <div class="img-wrapper">
                            <img :src="item.img">
                        </div>
                        <VChart class="chart" :option="chartOptions[index]" />
                    </div>
                    <div class="category-wrapper">
                        <TransformCategory :data="['商家', '订单数', '销售额']"
                            :color="['rgb(178, 209, 126)', 'rgb(116, 166, 49)']" />
                    </div>
                    <div class="scroll-list-wrapper">
                        <BaseScrollList :config="config[index]" style="width:100%;height:190px;background:rgb(40,40,40);" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AreaTop } from '@/api/interface';
import VChart from 'vue-echarts';
import { ref, watch } from 'vue'
import type { EChartsOption } from 'echarts';
import TransformCategory from '../transform-category/TransformCategory.vue';
import BaseScrollList, { type BaseScrollListProps } from '../base-scroll-list/BaseScrollList.vue';
type Props = { data?: AreaTop[] }

const props = defineProps<Props>()

let currentIndex = 0;
const headerData = ref<{ title: string, img: string }[]>([])
const config = ref<Array<BaseScrollListProps['config']>>([])
const chartOptions = ref<EChartsOption[]>([])

function createOption(): EChartsOption {
    const data = []
    data[0] = Math.ceil(Math.random() * 100)
    data[1] = 100 - data[0]
    return {
        color: ['rgb(210, 244, 148)', 'rgb(79, 79, 79)'],
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        title: {
            text: `${data[0]}%`,
            left: 'center',
            top: '60%',
            textStyle: {
                color: 'rgb(210, 244, 148)',
                fontSize: 18,
                align: 'center'
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['70%', '90%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                labelLine: {
                    show: false
                },
                data: [
                    {
                        value: data[0],
                        name: '活跃用户'
                    },
                    {
                        value: data[1],
                        name: '非活跃用户'
                    }
                ]
            }
        ]
    }
}

watch(() => props.data, (newData) => {
    if (!newData) {
        return
    }
    const currentData = newData.slice(currentIndex, currentIndex + 3)
    headerData.value = [{
        title: currentData[0].city,
        img: 'https://img.alicdn.com/tfs/TB1Z171qebviK0jSZFNXXaApXXa-30-29.png'
    }, {
        title: currentData[1].city,
        img: 'https://img.alicdn.com/tfs/TB1b8Tzq7T2gK0jSZFkXXcIQFXa-28-24.png'
    }, {
        title: currentData[2].city,
        img: 'https://img.alicdn.com/tfs/TB12MbzqYY1gK0jSZTEXXXDQVXa-28-30.png'
    }]

    const configArray = []
    for (let i = 0; i < currentData.length; i++) {
        const data: Array<string[]> = []
        const shopData = currentData[i].shop
        for (let j = 0; j < shopData.length; j++) {
            data[j] = []
            for (let k = 0; k < 3; k++) {
                let text: string | number = ''
                switch (k) {
                    case 0:
                        text = shopData[j].shop
                        break
                    case 1:
                        text = shopData[j].order
                        break
                    case 2:
                        text = shopData[j].sales
                        break
                    default:
                }
                if (k === 2) {
                    data[j].push(`<span style="color:rgb(178,209,126)">${text}</span>`)
                } else {
                    data[j].push(`<span>${text}</span>`)
                }
            }

            const config: BaseScrollListProps['config'] = {
                headerData: headerData.value.map(item => item.title),
                data, // 表格数据
                rowNum: 3, // 显示行数
                headerHeight: 0,
                headerBackgroundColor: 'rgb(80,80,80)',
                rowColor: '#fff',
                aligns: ['center', 'center', 'center'],
                rowBackground: ['rgb(40, 40, 40)', 'rgba(50,50,50)'], // 奇数背景色
                rowFontSize: '20px' // 表格文字大小
            }
            configArray.push(config)
        }
    }
    config.value = configArray

    const chart: EChartsOption[] = [];
    headerData.value.forEach((item) => {
        chart.push(createOption())
    })
    chartOptions.value = chart;
}, { immediate: true })
</script>

<style scoped lang="scss">
.sales-ranking {
    width: 100%;
    height: 100%;
    background: rgb(55, 55, 55);
    padding-right: 20px;
    box-sizing: border-box;

    .title {
        font-size: 36px;
        margin-left: 20px;
        padding: 20px 40px 0;
        box-sizing: border-box;
    }

    .list-wrapper {
        display: flex;
        width: 100%;
        height: 563px;
        margin-top: 20px;
        padding: 0 10px;
        box-sizing: border-box;

        .list-inner {
            flex: 0 0 33.33%;
            width: 33.33%;
            padding: 0 10px;
            box-sizing: border-box;

            .list {
                width: 100%;
                height: 100%;
                background: rgb(45, 45, 45);

                .list-title {
                    font-size: 24px;
                    padding: 10px 20px;
                    box-sizing: border-box;
                }

                .list-separator-wrapper {
                    position: relative;
                    height: 30px;
                    background: rgb(93, 93, 93);

                    .list-separator {
                        position: absolute;
                        top: 7.5px;
                        right: 15px;
                        width: 15px;
                        height: 15px;
                        background: rgb(50, 50, 50);
                    }
                }
            }

            .chart-wrapper {
                position: relative;
                width: 100%;
                height: 200px;
                margin-top: 20px;

                .img-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 100%;

                    img {
                        width: 42px;
                        height: 42px;
                        margin-top: 60px;
                    }
                }

                .chart {
                    width: 100%;
                    height: 100%;
                }
            }

            .category-wrapper {
                margin-top: 20px;
            }

            .scroll-list-wrapper {
                margin-top: 20px;
            }
        }
    }
}
</style>