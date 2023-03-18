<template>
    <div class="center-header">
        <div class="item-wrapper">
            <div class="item" v-for="(item, index) in headerData" :key="index">
                <div class="left">
                    <div class="bg">
                        <div class="img">
                            <Icon :icon="item.icon" />
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="title">{{ item.title }}</div>
                    <div class="sub-title">{{ item.subTitle }}</div>
                    <div class="total">
                        <count-up :end-val="item.value" :duration="1" />
                    </div>
                </div>
            </div>
        </div>
        <div class="project-wrapper">
            <div class="project" v-for="(item, index) in project" :key="index">
                <div class="project-img">
                    <img :src="item.img" />
                </div>
                <div class="project-text">{{ item.title }}</div>
                <div class="project-value">{{ item.value }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CountUp from 'vue-countup-v3';
import Icon from '@/components/icon/Icon.vue';
import type { SummaryData } from '@/api/interface';

type Props = { data?: SummaryData }

const props = defineProps<Props>();

const project = ref<{ title: string; value: string; img: string }[]>([]);
const headerData = ref<{ title: string; subTitle: string; value: number; icon: string }[]>([]);

watch(
    () => props.data,
    (newProps) => {
        if (!newProps) {
            return;
        }
        project.value = [
            {
                title: '转化率',
                value: `${props.data?.covertRate}%`,
                img: 'https://www.youbaobao.xyz/datav-res/success.png'
            },
            {
                title: '退单率',
                value: `${props.data?.returnRate}%`,
                img: 'https://www.youbaobao.xyz/datav-res/failed.png'
            }
        ];
        headerData.value = [
            {
                title: '今日销售额',
                subTitle: "Today's Sales Amount",
                value: newProps.salesToday || 0,
                icon: 'money-rmb'
            },
            {
                title: '今日订单量',
                subTitle: "Today's Total Orders",
                value: newProps.orderToday || 0,
                icon: 'order'
            },
            {
                title: '今日交易用户数',
                subTitle: "Today's Payed Users",
                value: newProps.orderUser || 0,
                icon: 'customer-fee'
            },
            {
                title: '今日新增用户数',
                subTitle: "Today's New Users",
                value: newProps.userToday || 0,
                icon: 'customer-add'
            }
        ];
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.center-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgb(66, 68, 70);
    padding: 0 40px;
    box-sizing: border-box;

    .item-wrapper {
        display: flex;

        .item {
            flex: 1;
            display: flex;

            .left {
                .bg {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 180px;
                    height: 180px;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    background-color: rgb(131, 167, 72);
                    border-radius: 50%;

                    .img {
                        width: 60%;
                        height: 60%;
                        border-radius: 50%;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 40px;
                width: 410px;

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
                    font-size: 56px;
                    font-weight: bolder;
                    letter-spacing: 2px;
                    margin-top: 10px;
                }
            }
        }
    }

    .project-wrapper {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .project {
            display: flex;
            flex-direction: column;
            align-items: center;

            .project-img {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 90px;
                height: 90px;
            }

            img {
                width: 100%;
                height: 100%;
            }

            .project-text {
                font-size: 18px;
                margin-top: 10px;
            }

            .project-value {
                font-size: 28px;
                font-weight: 700;
                margin-top: 5px;
            }
        }
    }
}
</style>
