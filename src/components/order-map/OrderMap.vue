<template>
    <div class="order-map">
        <div class="loading" v-if="!ready">加载中...</div>
        <VChart v-else :option="option" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import VChart from 'vue-echarts';
import { registerMap } from 'echarts';
import type { EChartsOption } from 'echarts/types/dist/shared';
import type { MapData } from '@/api/interface';
import { colors } from '@/config/color';

type Props = {
    data?: any;
    ready: boolean;
};

type MapValue = {
    city: string;
    name: string;
    value: number;
    value1: number;
};

const props = defineProps<Props>();

const option = ref<EChartsOption>();

function convertData(data: Array<MapValue>, geoCoordMap: Record<string, [number, number]>) {
    var res = [];
    for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
}

function convertToLineData(
    data: Array<MapValue>,
    gps: [number, number],
    geoCoordMap: Record<string, [number, number]>
): any {
    const res = [];
    for (let i = 0; i < data.length; i++) {
        const dataItem = data[i];
        const toCoord = geoCoordMap[dataItem.name];
        const fromCoord = gps;
        if (fromCoord && toCoord) {
            res.push({ coords: [fromCoord, toCoord] });
        }
    }
    return res;
}

const geoGpsMap: Record<string, [number, number]> = {
    '1': [116.4551, 40.2539],
    '2': [121.4648, 31.2891],
    '3': [113.4668, 22.8076],
    '4': [113.4668, 22.8076],
    '5': [120.0586, 32.915],
    '6': [102.9199, 30.1904]
};

const geoCoordMap: Record<string, [number, number]> = {
    江苏: [118.8062, 31.9208],
    黑龙江: [127.9688, 45.368],
    内蒙古: [110.3467, 41.4899],
    吉林: [125.8154, 44.2584],
    北京市: [116.4551, 40.2539],
    辽宁: [123.1238, 42.1216],
    河北: [114.4995, 38.1006],
    天津: [117.4219, 39.4189],
    山西: [112.3352, 37.9413],
    陕西: [109.1162, 34.2004],
    甘肃: [103.5901, 36.3043],
    宁夏: [106.3586, 38.1775],
    青海: [101.4038, 36.8207],
    新疆: [87.9236, 43.5883],
    四川: [103.9526, 30.7617],
    重庆: [108.384366, 30.439702],
    山东: [117.1582, 36.8701],
    河南: [113.4668, 34.6234],
    安徽: [117.29, 32.0581],
    湖北: [114.3896, 30.6628],
    浙江: [119.5313, 29.8773],
    福建: [119.4543, 25.9222],
    江西: [116.0046, 28.6633],
    湖南: [113.0823, 28.2568],
    贵州: [106.6992, 26.7682],
    云南: [102.9199, 25.4663],
    广东: [113.12244, 23.009505],
    广西: [108.479, 23.1152],
    海南: [110.3893, 19.8516],
    上海: [121.4648, 31.2891]
};

const d1: Record<string, number> = {
    江苏: 10041,
    黑龙江: 4093,
    内蒙古: 1157,
    吉林: 4903,
    北京市: 2667,
    辽宁: 8331,
    河北: 23727,
    天津: 681,
    山西: 5352,
    陕西: 38,
    甘肃: 77,
    宁夏: 65,
    青海: 10,
    新疆: 193,
    四川: 309,
    重庆: 77,
    山东: 21666,
    河南: 15717,
    安徽: 15671,
    湖北: 3714,
    浙江: 3141,
    福建: 955,
    江西: 4978,
    湖南: 778,
    贵州: 33,
    云南: 149,
    广东: 1124,
    广西: 125,
    海南: 7,
    上海: 2155
};
const d2: Record<string, number> = {
    江苏: 151,
    黑龙江: 12,
    内蒙古: 65,
    吉林: 152,
    北京市: 4545,
    辽宁: 1216,
    河北: 1232,
    天津: 1111,
    山西: 213,
    陕西: 1323,
    甘肃: 1231,
    宁夏: 544,
    青海: 456,
    新疆: 342,
    四川: 3455,
    重庆: 45,
    山东: 333,
    河南: 455,
    安徽: 666,
    湖北: 777,
    浙江: 876,
    福建: 956,
    江西: 90,
    湖南: 78,
    贵州: 768,
    云南: 45,
    广东: 45,
    广西: 53,
    海南: 342,
    上海: 234
};
const d3: Record<string, number> = {
    江苏: 11788,
    黑龙江: 1944,
    内蒙古: 2954,
    吉林: 3482,
    北京市: 1808,
    辽宁: 5488,
    河北: 27035,
    天津: 2270,
    山西: 13623,
    陕西: 4221,
    甘肃: 754,
    宁夏: 1783,
    青海: 91,
    新疆: 1907,
    四川: 4905,
    重庆: 1420,
    山东: 39781,
    河南: 16154,
    安徽: 7914,
    湖北: 6802,
    浙江: 5812,
    福建: 3345,
    江西: 4996,
    湖南: 5627,
    贵州: 1504,
    云南: 2725,
    广东: 6339,
    广西: 1009,
    海南: 0,
    上海: 1988
};
const d4: Record<string, number> = {
    江苏: 12343,
    黑龙江: 234,
    内蒙古: 230,
    吉林: 55,
    北京市: 6578,
    辽宁: 345,
    河北: 1231,
    天津: 322,
    山西: 234,
    陕西: 675,
    甘肃: 5657,
    宁夏: 6788,
    青海: 454,
    新疆: 456,
    四川: 898,
    重庆: 4534,
    山东: 676,
    河南: 111,
    安徽: 222,
    湖北: 345,
    浙江: 89,
    福建: 546,
    江西: 234,
    湖南: 2222,
    贵州: 2342,
    云南: 234,
    广东: 789,
    广西: 567,
    海南: 5689,
    上海: 555
};
const d5: Record<string, number> = {
    江苏: 159,
    黑龙江: 5,
    内蒙古: 54,
    吉林: 10,
    北京市: 0,
    辽宁: 0,
    河北: 1679,
    天津: 1,
    山西: 2698,
    陕西: 1744,
    甘肃: 362,
    宁夏: 429,
    青海: 122,
    新疆: 731,
    四川: 3925,
    重庆: 1480,
    山东: 79,
    河南: 1017,
    安徽: 208,
    湖北: 1209,
    浙江: 1418,
    福建: 1237,
    江西: 1004,
    湖南: 1511,
    贵州: 345,
    云南: 1429,
    广东: 2242,
    广西: 2271,
    海南: 59,
    上海: 8
};
const d6: Record<string, number> = {
    江苏: 32423,
    黑龙江: 3423,
    内蒙古: 222,
    吉林: 3243,
    北京市: 5768,
    辽宁: 4565,
    河北: 456,
    天津: 786,
    山西: 565,
    陕西: 2346,
    甘肃: 33,
    宁夏: 443,
    青海: 522,
    新疆: 65,
    四川: 3245,
    重庆: 2322,
    山东: 4334,
    河南: 7878,
    安徽: 6544,
    湖北: 4566,
    浙江: 4644,
    福建: 3333,
    江西: 5555,
    湖南: 9878,
    贵州: 3453,
    云南: 3453,
    广东: 6363,
    广西: 2342,
    海南: 5464,
    上海: 4566
};

const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都'];

const lineColors = ['#d32029', '#f8df8b', '#04B9FF', '#cb2b83', '#d89614', '#8bbb11', '#cb2b83'];

async function update(data: MapData) {
    const mapData: Array<MapValue[]> = [[], [], [], [], [], []];

    for (var key in geoCoordMap) {
        mapData[0].push({
            city: '北京',
            name: key,
            value: d1[key] / 100,
            value1: d1[key] / 100
        });
        mapData[1].push({
            city: '上海',
            name: key,
            value: d2[key] / 100,
            value1: d2[key] / 100
        });
        mapData[2].push({
            city: '广州',
            name: key,
            value: d3[key] / 100,
            value1: d3[key] / 100
        });
        mapData[3].push({
            city: '深圳',
            name: key,
            value: d4[key] / 100,
            value1: d4[key] / 100
        });
        mapData[4].push({
            city: '杭州',
            name: key,
            value: d5[key] / 100,
            value1: d5[key] / 100
        });
        mapData[5].push({
            city: '成都',
            name: key,
            value: d6[key] / 100,
            value1: d6[key] / 100
        });
    }

    const categoryData: string[][] = [];
    const barData: number[][] = [];

    for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a: any, b: any) {
            return a.value - b.value;
        });
        barData.push([]);
        categoryData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
            barData[i].push(mapData[i][j].value1);
            categoryData[i].push(mapData[i][j].name);
        }
    }

    const currentOption: EChartsOption = {
        timeline: {
            data: cities,
            axisType: 'category',
            autoPlay: true,
            playInterval: 3000,
            left: '10%',
            right: '10%',
            bottom: '3%',
            width: '80%',
            label: {
                color: '#fff'
            },
            itemStyle: {
                color: colors['gray-color-8']
            },
            emphasis: {
                itemStyle: {
                    color: colors['primary-color-6']
                },
                controlStyle: {
                    borderColor: colors['primary-color-8']
                }
            },
            symbolSize: 10,
            lineStyle: {
                color: colors['gray-color-9']
            },
            checkpointStyle: {
                color: colors['primary-color-6'],
                borderColor: colors['gray-color-1'],
                borderWidth: 2
            },
            controlStyle: {
                color: colors['gray-color-8'],
                borderColor: colors['gray-color-8']
            },
            progress: {
                lineStyle: {
                    color: colors['primary-color-4']
                },
                itemStyle: {
                    color: colors['primary-color-6']
                }
            }
        },
        baseOption: {
            backgroundColor: colors['gray-color-10'],
            grid: {
                width: '20%',
                right: '5%',
                top: '15%',
                bottom: '15%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            geo: {
                map: 'china',
                zoom: 1.1,
                roam: false,
                center: [113.83531246, 34.0267395887],
                scaleLimit: { min: 0.5, max: 3 },
                itemStyle: {
                    borderColor: colors['primary-color-7'],
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [
                            {
                                offset: 0,
                                color: colors['gray-color-10'] // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: colors['gray-color-8'] // 100% 处的颜色
                            }
                        ],
                        global: false // 缺省为 false
                    },
                    shadowColor: colors['primary-color-4'],
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10
                },
                emphasis: {
                    itemStyle: {
                        areaColor: colors['primary-color-6'],
                        borderWidth: 0
                    },
                    label: {
                        show: false
                    }
                }
            }
        },
        options: []
    };

    for (let i = 0; i < cities.length; i++) {
        currentOption.options?.push({
            title: [
                {
                    text: '外卖销售大盘',
                    subtext: '数据为 mock 数据，仅用于演示',
                    left: '10%',
                    top: '2%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 35,
                        fontWeight: 600
                    }
                },
                {
                    id: 'statistic',
                    text: cities[i] + '销售额统计情况',
                    left: '75%',
                    top: '8%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 25
                    }
                }
            ],
            xAxis: {
                type: 'value',
                position: 'top',
                min: 0,
                boundaryGap: false,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    margin: 2,
                    color: '#aaa'
                }
            },
            yAxis: {
                type: 'category',
                data: categoryData[i],
                axisLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    color: '#ddd'
                }
            },
            series: [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(mapData[i], geoCoordMap),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        position: 'right',
                        show: true,
                        formatter: function (params) {
                            return params.name;
                        }
                    },
                    itemStyle: {
                        color: lineColors[i],
                        shadowColor: lineColors[i],
                        shadowBlur: 10
                    },
                    zlevel: 1
                },
                {
                    type: 'lines',
                    data: convertToLineData(mapData[i], geoGpsMap[i + 1], geoCoordMap),
                    effect: {
                        show: true,
                        period: 2,
                        symbol: 'arrow',
                        trailLength: 0.02
                    },
                    lineStyle: {
                        color: lineColors[i],
                        width: 0.1,
                        opacity: 0.5,
                        curveness: 0.1
                    },
                    zlevel: 2
                },
                {
                    type: 'bar',
                    data: barData[i],
                    itemStyle: {
                        color: lineColors[i]
                    }
                }
            ]
        });
    }

    option.value = currentOption;
    registerMap('china', data as any);
}

watch(
    () => props.data,
    async (newData) => {
        await nextTick();
        update(newData);
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.order-map {
    width: 100%;
    height: 100%;
    background-color: $gray-color-10;

    .loading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
        background-color: $gray-color-10;
        color: $gray-color-1;
    }
}
</style>
