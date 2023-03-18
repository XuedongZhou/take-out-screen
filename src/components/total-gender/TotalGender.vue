<template>
    <div class="total-gender">
        <div class="title-wrapper">
            <div class="left">
                <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png" />
            </div>
            <div class="right">
                <div class="title">男性用户人数</div>
                <div class="sub-title">Number of male users</div>
                <div class="age">
                    <count-up :endVal="endMale" />
                    <span class="age-unit">万人</span>
                </div>
            </div>
        </div>
        <div class="title-wrapper">
            <div class="left">
                <img src="http://img.alicdn.com/tfs/TB1p9Luq8v0gK0jSZKbXXbK2FXa-500-500.png" />
            </div>
            <div class="right">
                <div class="title">女性用户人数</div>
                <div class="sub-title">Number of female users</div>
                <div class="age">
                    <count-up :endVal="endFemale" />
                    <span class="age-unit">万人</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import CountUp from 'vue-countup-v3';
import type { Gender } from '@/api/interface';

type Props = { data?: [Gender, Gender] }

const props = defineProps<Props>();

const endMale = ref(0);

const endFemale = ref(0);

watch(
    () => props.data,
    (newData) => {
        if (newData) {
            endMale.value = newData[0].value;
            endFemale.value = newData[1].value;
        }
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.total-gender {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    box-sizing: border-box;

    .title-wrapper {
        display: flex;

        .left {
            img {
                width: 75px;
                height: 75px;
            }
        }

        .right {
            margin-left: 40px;

            .title {
                font-size: 32px;
            }

            .sub-title {
                font-size: 16px;
                margin-top: 10px;
            }

            .age {
                font-size: 49px;
                font-family: DIN;
                font-weight: bold;
                margin-top: 10px;

                .age-unit {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
