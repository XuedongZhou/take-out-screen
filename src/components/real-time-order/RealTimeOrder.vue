<template>
    <div class="average-view">
        <div class="left">
            <div class="title">实时订单趋势图</div>
            <div class="sub-title">Number Of Real-time Orders</div>
            <div class="total">
                <count-up :end-val="endVal" :duration="1" autoplay />
            </div>
            <div class="tiny-title">周同比增长率</div>
            <div class="percent-text">
                <span class="percent-text-1">
                    <count-up :end-val="percent" :duration="1" :decimals="2">
                        <template #suffix>%</template>
                    </count-up>
                </span>
            </div>
        </div>
        <div class="right">
            <VChart :option="option" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import CountUp from 'vue-countup-v3';
import VChart from 'vue-echarts';
import { graphic, type EChartsOption } from 'echarts';
import { colors, colorsOpacity } from '@/config/color';

type Props = {
    data: {
        data: number[];
        date: string[];
    };
};

const kpi = 999999;

const props = defineProps<Props>();

const endVal = ref(23242);

const percent = computed(() => (endVal.value / kpi) * 100);

const option = ref<EChartsOption>();

function update() {
    option.value = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: props.data.date,
            axisLine: {
                lineStyle: {
                    color: colors['gray-color-4']
                }
            },
            axisLabel: {
                fontSize: 16
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: colors['gray-color-9']
                }
            },
            axisLine: {
                lineStyle: {
                    color: colors['gray-color-4']
                }
            },
            axisLabel: {
                fontSize: 16
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100,
                handleSize: '100%',
                handleStyle: {
                    color: colors['primary-color-6']
                },
                textStyle: {
                    color: colors['gray-color-2']
                },
                fillerColor: colorsOpacity(0.2),
                dataBackground: {
                    lineStyle: {
                        color: colors['gray-color-6']
                    },
                    areaStyle: {
                        color: colors['gray-color-6']
                    }
                },
                borderColor: colors['primary-color-5']
            }
        ],
        series: [
            {
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: colors['primary-color-5']
                        },
                        {
                            offset: 0.5,
                            color: colors['primary-color-6']
                        },
                        {
                            offset: 1,
                            color: colors['primary-color-7']
                        }
                    ])
                },
                data: props.data.data
            }
        ],
        grid: {
            top: 40,
            bottom: 80,
            right: 40,
            left: 80
        }
    };
}

watch(
    () => props.data,
    () => {
        update();
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.average-view {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: $gray-color-10;

    .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        flex: 0 0 320px;
        width: 320px;
        padding-left: 40px;
        box-sizing: border-box;

        .title {
            font-size: 32px;
        }

        .sub-title {
            font-size: 16px;
            letter-spacing: 1px;
            margin-top: 10px;
        }

        .total {
            font-family: DIN;
            font-size: 68px;
            font-weight: bolder;
            letter-spacing: 2px;
            padding: 10px 0;
        }

        .tiny-title {
            font-size: 18px;
            color: $gray-color-1;
            line-height: 36px;
        }

        .percent-text {
            font-size: 28px;
            font-family: DIN;
            letter-spacing: 2px;

            .percent-text-1 {
                color: $primary-color-6;
                font-weight: bolder;
            }
        }
    }

    .right {
        flex: 1;

        #average-view-chart {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
