<template>
    <div class="average-age">
        <div class="title-wrapper">
            <div class="left">
                <div class="title">外卖用户年龄分布&平均年龄</div>
                <div class="sub-title">Distribution of Age</div>
            </div>
            <div class="right">
                <div class="age">
                    <count-up :endVal="avgAge" :decimals="2" />
                    <span class="age-unit">岁</span>
                </div>
            </div>
        </div>
        <div class="average-age-chart">
            <VChart :option="option" />
        </div>
        <div class="average-data-wrapper">
            <div class="average-data" v-for="(item, index) in data" :key="index">
                <div class="average-data-value">
                    <count-up :endVal="item.value" />
                </div>
                <div class="average-data-axis">
                    <div class="point" :style="{ background: item.color }" />
                    <div class="text">{{ item.axis }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from 'vue';
import CountUp from 'vue-countup-v3';
import VChart from 'vue-echarts';

import type { AgeBar } from '@/api/interface';

const props = defineProps({
    data: { type: Array as PropType<AgeBar[]>, default: () => [] },
    avgAge: { type: String, default: '0' }
});

const option = ref();

function updateChart() {
    const data: Array<number | string> = ['年龄分布'];
    const color: string[] = [];
    const axis: string[] = ['指标'];
    let max = 0;
    props.data.forEach((item) => {
        data.push(item.value);
        max += item.value;
        color.push(item.color);
        axis.push(item.axis);
    });

    option.value = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            textStyle: {
                fontSize: 28
            },
            padding: 10
        },
        color,
        grid: {
            top: 20
        },
        dataset: {
            source: [axis, data]
        },
        xAxis: {
            type: 'value',
            max,
            splitLine: { show: false }, // 坐标轴在 grid 区域中的分隔线
            axisTick: { show: false }, // 是否显示坐标轴刻度。
            axisLabel: {
                // 坐标轴刻度标签
                color: 'rgb(98, 105, 113)',
                fontSize: 18
            },
            axisLine: {
                // 坐标轴轴线
                lineStyle: {
                    color: 'rgb(50, 51, 63)',
                    width: 3
                }
            }
        },
        yAxis: {
            type: 'category'
        },
        series: [
            { type: 'bar', stack: 'total' },
            { type: 'bar', stack: 'total' },
            { type: 'bar', stack: 'total' },
            { type: 'bar', stack: 'total' }
        ]
    };
}

onMounted(() => {
    updateChart();
});

watch(
    () => props.data,
    () => {
        updateChart();
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.average-age {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 20px 40px;
    box-sizing: border-box;

    .title-wrapper {
        display: flex;
        align-items: center;

        .left {
            .title {
                font-size: 32px;
            }

            .sub-title {
                font-size: 16px;
                margin-top: 10px;
            }
        }

        .right {
            flex: 1;
            margin-left: 40px;
            font-weight: bold;

            .age {
                font-size: 68px;
                font-family: DIN;

                .age-unit {
                    font-size: 20px;
                }
            }
        }
    }

    .average-age-chart {
        height: 120px;
    }

    .average-data-wrapper {
        display: flex;

        .average-data {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            font-weight: bolder;

            .average-data-value {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
            }

            .average-data-axis {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                margin-top: 5px;

                .point {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                .text {
                    margin-left: 10px;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
