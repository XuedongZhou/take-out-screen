<template>
    <div class="schedule-view">
        <VChart class="schedule-view-chart" :option="option" />
        <div class="bg1 bg"></div>
        <div class="bg2 bg"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VChart from 'vue-echarts';
import { number, time, type EChartsOption } from 'echarts';
import {} from 'echarts';
import { colors } from '@/config/color';

const option = ref<EChartsOption>();

function getVirtualData(year: string): Array<[string, number]> {
    year = year || '2021';
    const date = +number.parseDate(year + '-06-01');
    const end = +number.parseDate(+year + 1 + '-12-31');
    const dayTime = 3600 * 24 * 1000;
    const data: Array<[string, number]> = [];
    for (let dateTime = date; dateTime < end; dateTime += dayTime) {
        data.push([time.format(new Date(dateTime), '{yyyy}-{MM}-{dd}', true), Math.floor(Math.random() * 10000)]);
    }
    return data;
}

const data = getVirtualData('2021');

function update() {
    option.value = {
        calendar: [
            {
                top: 30,
                left: 80,
                right: 40,
                bottom: 10,
                range: ['2021-06-01', '2021-12-31'],
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: colors['primary-color-6']
                    }
                },
                yearLabel: { show: false },
                dayLabel: {
                    color: colors['primary-color-6'],
                    fontSize: 18
                },
                monthLabel: {
                    color: colors['primary-color-6'],
                    fontSize: 18
                },
                itemStyle: {
                    color: colors['gray-color-11'],
                    borderWidth: 1,
                    borderColor: colors['gray-color-11']
                }
            }
        ],
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'calendar',
                data: data,
                symbolSize: function (val) {
                    return val[1] / 600;
                },
                itemStyle: {
                    color: colors['primary-color-6']
                }
            },
            {
                type: 'effectScatter',
                coordinateSystem: 'calendar',
                data: data
                    .sort(function (a, b) {
                        return b[1] - a[1];
                    })
                    .slice(0, 12),
                symbolSize: function (val) {
                    return val[1] / 500;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                itemStyle: {
                    color: colors['primary-color-6'],
                    shadowBlur: 10,
                    shadowColor: colors['primary-color-6']
                },
                zlevel: 1
            }
        ]
    };
}

onMounted(() => {
    update();
});
</script>

<style scoped lang="scss">
.schedule-view {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background: $gray-color-10;
    padding: 20px 0;
    box-sizing: border-box;

    .schedule-view-chart {
        width: 100%;
        height: 100%;
    }

    .bg {
        width: 100%;
        height: 20px;
        background: $primary-color-6;
    }

    .bg1 {
        position: absolute;
        top: 0;
        left: 0;
    }

    .bg2 {
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
