<template>
    <div class="transform-category">
        <div
            class="category"
            v-for="(item, index) in data"
            :key="item"
            @click="click(index)"
            @mouseenter="mouseEnter(index)"
            @mouseleave="mouseLeave()"
            @mousemove="mouseEnter(index)"
        >
            <div v-if="index === selected" class="selected" :style="{ background: color[0] }">
                {{ item }}
            </div>
            <div class="hovered" v-else-if="index === hover" :style="{ background: color[1] }">
                {{ item }}
            </div>
            <div v-else>{{ item }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, onMounted, onUnmounted } from 'vue';

type Props = {
    data?: string[];
    color?: [string, string];
};

const props = withDefaults(defineProps<Props>(), { data: () => [], color: () => ['rgb(140,160,173)', 'rgb(80,80,80)'] });

const selected = ref(0);

let task: number;

function update() {
    task && clearInterval(task);
    task = setInterval(() => {
        if (selected.value > props.data.length - 2) {
            selected.value = 0;
        } else {
            selected.value += 1;
        }
    }, 2000);
}
onMounted(update);
onUnmounted(() => {
    task && clearInterval(task);
});

const hover = ref(-1);

function click(index: number) {
    selected.value = index;
}

function mouseEnter(index: number) {
    hover.value = index;
}

function mouseLeave() {
    hover.value = -1;
}
</script>

<style scoped lang="scss">
.transform-category {
    display: flex;
    width: 100%;
    height: 100%;

    .category {
        flex: 1;
        background: rgb(53, 57, 65);
        font-size: 24px;
        color: rgb(144, 160, 174);

        .hovered {
            background: rgb(80, 80, 80);
        }

        .selected {
            background: rgb(140, 160, 173);
            color: #fff;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
