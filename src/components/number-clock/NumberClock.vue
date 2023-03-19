<template>
    <div class="clock">
        <div class="digit" v-for="(item, index) in hours" :key="index">
            <div v-for="(items, index) in item" :key="index" :class="{ segment: true, activate: items }"></div>
        </div>
        <div class="separator"></div>
        <div class="digit" v-for="(item, index) in minute" :key="index">
            <div v-for="(items, index) in item" :key="index" :class="{ segment: true, activate: items }"></div>
        </div>
        <div class="separator"></div>
        <div class="digit" v-for="(item, index) in second" :key="index">
            <div v-for="(items, index) in item" :key="index" :class="{ segment: true, activate: items }"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
const hours = ref<boolean[][]>([]);
const minute = ref<boolean[][]>([]);
const second = ref<boolean[][]>([]);
const numList = [
    [0, 1, 2, 3, 4, 5],
    [1, 2],
    [0, 1, 3, 4, 6],
    [0, 1, 2, 3, 6],
    [1, 2, 5, 6],
    [0, 2, 3, 5, 6],
    [0, 2, 3, 4, 5, 6],
    [0, 1, 2],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 5, 6]
];

const interval = 1000;
const startTime = Date.now();
let count = 0;
let timer = 0;

function clock() {
    const now = new Date();
    clockData(now);
    count++;
    const offset = now.getTime() - (startTime + count * interval);
    let nextTime = interval - offset;
    if (nextTime < 0) {
        nextTime = 0;
    }
    timer = setTimeout(clock, nextTime);
}

onMounted(() => {
    clock();
});

onUnmounted(() => {
    if (timer) {
        clearTimeout(timer);
    }
});

function clockDisplay(list: [boolean[], boolean[]], num: [number, number]) {
    const newArray: [boolean[], boolean[]] = JSON.parse(JSON.stringify(list));
    newArray.forEach((childArray, i) => {
        childArray.forEach((_, j) => {
            numList[num[i]].forEach((val) => {
                if (val === j) {
                    childArray[j] = true;
                }
            });
        });
    });
    return newArray;
}

function getTimeArray(s: number): [number, number] {
    return s < 10 ? [0, s] : [Math.floor(s / 10), s % 10];
}

function clockData(date: Date) {
    const getHours = getTimeArray(date.getHours());
    const getMinutes = getTimeArray(date.getMinutes());
    const getSeconds = getTimeArray(date.getSeconds());
    // 为时分秒创建数组用于显示
    const list = Array.from(new Array(2), () => new Array(7).fill(false)) as [boolean[], boolean[]];

    hours.value = clockDisplay(list, getHours);
    minute.value = clockDisplay(list, getMinutes);
    second.value = clockDisplay(list, getSeconds);
}
</script>

<style scoped lang="scss">
.clock {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .digit {
        width: 36px;
        height: 76px;
        position: relative;
        margin: 10px;
        box-sizing: border-box;
        padding: 2px;

        .segment.activate {
            opacity: 1;
            box-shadow: 0 0 50px $primary-color-2;
        }

        .segment {
            background: $primary-color-6;
            border-radius: 3px;
            position: absolute;
            opacity: 0.05;
        }

        .segment:nth-child(1),
        .segment:nth-child(4),
        .segment:nth-child(7) {
            width: 32px;
            height: 4px;
        }

        .segment:nth-child(2),
        .segment:nth-child(3) {
            right: 0;
            width: 4px;
            height: 32px;
        }

        .segment:nth-child(5),
        .segment:nth-child(6) {
            left: 0;
            width: 4px;
            height: 32px;
        }

        .segment:nth-child(1) {
            top: 0;
        }

        .segment:nth-child(2),
        .segment:nth-child(6) {
            top: 4px;
        }

        .segment:nth-child(3),
        .segment:nth-child(5) {
            top: 40px;
        }

        .segment:nth-child(4) {
            top: 72px;
        }

        .segment:nth-child(7) {
            top: 36px;
        }
    }

    .separator {
        width: 16px;
        height: 76px;
        position: relative;

        &::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: $primary-color-6;
            border-radius: 50%;
            position: absolute;
            top: 50px;
            left: 4px;
        }

        &::after {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: $primary-color-6;
            border-radius: 50%;
            position: absolute;
            bottom: 50px;
            left: 4px;
        }
    }
}
</style>
