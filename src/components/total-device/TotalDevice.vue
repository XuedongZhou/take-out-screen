<template>
    <div class="total-device">
        <div class="total-device-left">
            <VChart :option="option" />
        </div>
        <div class="total-device-right">
            <div class="title-wrapper">
                <div class="left">
                    <div class="title">外卖登录设备</div>
                    <div class="sub-title">Distribution of Internet devices</div>
                </div>
                <div class="right">
                    <div class="age">
                        <count-up :endVal="data.totalDevices" />
                        <span class="age-unit">台</span>
                    </div>
                </div>
            </div>
            <div class="average-data-wrapper">
                <div class="average-data" v-for="(item, index) in refData" :key="index">
                    <div class="average-data-value">
                        <count-up :endVal="item.value" />
                    </div>
                    <div class="average-data-axis">
                        <div class="point" :style="{ background: item.color }" />
                        <div class="text">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import CountUp from 'vue-countup-v3';
import VChart from 'vue-echarts';
import type { DeviceData } from '@/api/interface';
import { colors } from '@/config/color';

const props = defineProps({
    data: { type: Object as PropType<DeviceData>, default: () => ({ totalDevices: 0, devices: [] }) }
});

const color = [colors['primary-color-6'], colors['primary-color-7'], colors['primary-color-8']];

const refData = ref<any>([]);

const option = ref();

function updateChart() {
    option.value = {
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '70%',
                selectedMode: 'multiple',
                selectedOffset: 10,
                clockwise: true,
                center: ['50%', '50%'],
                color,
                emphasis: {
                    itemStyle: {
                        color: colors['primary-color-5']
                    }
                },
                data: refData.value,
                roseType: 'radius',
                label: { show: false }
            }
        ]
    };
}

watch(
    () => props.data,
    (newData) => {
        if (refData.value.length > 0) {
            refData.value = newData.devices.map((item, index) => ({
                value: item.value,
                name: item.key,
                color: color[index]
            }));
        } else {
            refData.value = newData.devices.map((item, index) => ({
                value: item.value,
                name: item.key,
                color: color[index]
            }));
        }
        updateChart();
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.total-device {
    display: flex;
    width: 100%;
    height: 100%;
    background: $gray-color-10;

    .total-device-left {
        width: 30%;
        height: 100%;

        #total-device-chart {
            width: 100%;
            height: 100%;
        }
    }

    .total-device-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 40px 10px 40px 0;

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
                    font-size: 56px;
                    font-family: DIN;

                    .age-unit {
                        font-size: 20px;
                    }
                }
            }
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
                    width: 100%;
                }

                .average-data-axis {
                    display: flex;
                    align-items: center;
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
}
</style>
