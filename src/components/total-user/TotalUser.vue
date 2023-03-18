<template>
    <div class="total-user">
        <div class="title">外卖用户总数</div>
        <div class="sub-title">User Total Count</div>
        <div class="total">
            <CountUp :end-val="data.userToday" />
        </div>
        <div class="percent-text">
            <div class="percent-text-day">
                每日增长率:
                <count-up :end-val="data.userGrowthLastDay" :decimal-places="2">
                    <template #suffix>%</template>
                </count-up>
            </div>
            <div class="percent-text-month">
                每月增长率:
                <count-up :end-val="data.userGrowthLastMonth" :decimal-places="2">
                    <template #suffix>%</template>
                </count-up>
            </div>
        </div>
        <div class="percent">
            <div class="percent-inner-wrapper">
                <div class="percent-inner" :style="{ width: `${data.userGrowthLastDay}%` }"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3';

type Props = {
    data?: {
        userToday: number;
        userGrowthLastDay: string;
        userGrowthLastMonth: string;
    }
}

withDefaults(defineProps<Props>(), { data: () => ({ userToday: 0, userGrowthLastDay: '0.00', userGrowthLastMonth: '0.00' }) });
</script>

<style scoped lang="scss">
.total-user {
    width: 100%;
    height: 100%;
    background: rgb(66, 68, 70);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
    padding: 20px 40px;
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

    .percent-text {
        font-size: 28px;
        font-family: DIN;
        letter-spacing: 2px;
        display: flex;
        align-items: center;

        .percent-text-day {
            color: rgb(197, 251, 121);
        }

        .percent-text-month {
            color: rgb(99, 169, 0);
            margin-left: 20px;
        }
    }

    .percent {
        height: 20px;
        box-sizing: border-box;
        border: 1px solid #fff;
        margin-top: 10px;

        .percent-inner-wrapper {
            height: 100%;
            padding: 2px;
            box-sizing: border-box;
            overflow: hidden;

            .percent-inner {
                height: 100%;
                background: rgb(150, 150, 150);
                transition: all 1s linear;
            }
        }
    }
}
</style>
