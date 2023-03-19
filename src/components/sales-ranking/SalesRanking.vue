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
                        <div class="icon-wrapper">
                            <Icon :icon="item.icon" />
                        </div>
                        <VChart class="chart" :option="chartOptions[index]" />
                    </div>
                    <div class="category-wrapper">
                        <TransformCategory
                            :data="['商家', '订单数', '销售额']"
                            :color="[colors['primary-color-6'], colors['primary-color-4']]"
                        />
                    </div>
                    <div class="scroll-list-wrapper">
                        <BaseScrollList class="scroll-list" :config="config[index]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts';
import { ref, watch } from 'vue';
import type { EChartsOption } from 'echarts';
import Icon from '@/components/icon/Icon.vue';
import TransformCategory from '../transform-category/TransformCategory.vue';
import BaseScrollList, { type BaseScrollListProps } from '../base-scroll-list/BaseScrollList.vue';
import { colors } from '@/config/color';
import type { AreaTop } from '@/api/interface';

type Props = { data?: AreaTop[] };

const props = defineProps<Props>();

let currentIndex = 0;
const headerData = ref<{ title: string; icon: string }[]>([]);
const config = ref<Array<BaseScrollListProps['config']>>([]);
const chartOptions = ref<EChartsOption[]>([]);

function createOption(): EChartsOption {
    const data = [];
    data[0] = Math.ceil(Math.random() * 100);
    data[1] = 100 - data[0];
    return {
        color: [colors['primary-color-6'], colors['gray-color-9']],
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
                color: colors['primary-color-6'],
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
    };
}

watch(
    () => props.data,
    (newData) => {
        if (!newData) {
            return;
        }
        const currentData = newData.slice(currentIndex, currentIndex + 3);
        headerData.value = [
            {
                title: currentData[0].city,
                icon: 'beijing'
            },
            {
                title: currentData[1].city,
                icon: 'shanghai'
            },
            {
                title: currentData[2].city,
                icon: 'guangzhou'
            }
        ];

        const configArray = [];
        for (let i = 0; i < currentData.length; i++) {
            const data: Array<string[]> = [];
            const shopData = currentData[i].shop;
            for (let j = 0; j < shopData.length; j++) {
                data[j] = [];
                for (let k = 0; k < 3; k++) {
                    let text: string | number = '';
                    switch (k) {
                        case 0:
                            text = shopData[j].shop;
                            break;
                        case 1:
                            text = shopData[j].order;
                            break;
                        case 2:
                            text = shopData[j].sales;
                            break;
                        default:
                    }
                    if (k === 2) {
                        data[j].push(`<span style="color:${colors['primary-color-6']}">${text}</span>`);
                    } else {
                        data[j].push(`<span>${text}</span>`);
                    }
                }

                const config: BaseScrollListProps['config'] = {
                    headerData: headerData.value.map((item) => item.title),
                    data,
                    rowNum: 3,
                    headerHeight: 0,
                    headerBackgroundColor: colors['gray-color-9'],
                    rowColor: colors['gray-color-1'],
                    rowBackground: [colors['gray-color-10'], colors['gray-color-11']],
                    rowFontSize: '20px'
                };
                configArray.push(config);
            }
        }
        config.value = configArray;

        const chart: EChartsOption[] = [];
        headerData.value.forEach(() => {
            chart.push(createOption());
        });
        chartOptions.value = chart;
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.sales-ranking {
    width: 100%;
    height: 100%;
    background: $gray-color-10;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 36px;
        padding: 20px 40px 0;
        box-sizing: border-box;
    }

    .list-wrapper {
        flex: 1;
        display: flex;
        width: 100%;
        margin: 20px 0;
        padding: 0 10px;
        box-sizing: border-box;

        .list-inner {
            flex: 0 0 33.33%;
            width: 33.33%;
            height: 100%;
            padding: 0 10px;
            box-sizing: border-box;

            .list {
                width: 100%;
                height: 100%;
                background: $gray-color-10;
                display: flex;
                flex-direction: column;

                .list-title {
                    font-size: 24px;
                    padding: 10px 20px;
                    box-sizing: border-box;
                }

                .list-separator-wrapper {
                    flex: 1;
                    position: relative;
                    height: 30px;
                    background: $gray-color-9;

                    .list-separator {
                        position: absolute;
                        top: 12.5px;
                        right: 15px;
                        width: 15px;
                        height: 15px;
                        background: $gray-color-6;
                    }
                }
            }

            .chart-wrapper {
                position: relative;
                width: 100%;
                height: 200px;
                margin-top: 20px;

                .icon-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    color: $primary-color-6;

                    .icon {
                        width: 72px;
                        height: 72px;
                        margin-top: 40px;
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

                .scroll-list {
                    height: 190px;
                    background-color: $gray-color-10;
                }
            }
        }
    }
}
</style>
