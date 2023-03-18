<template>
    <div ref="flyBoxRef" class="fly-box">
        <svg :width="width" :height="height">
            <defs>
                <path :id="pathId" :d="dPath" fill="transparent"></path>
                <mask :id="maskId">
                    <circle :r="starLength" cx="0" cy="0" :fill="`url(#${radialGradientId}`">
                        <animateMotion :dur="`${duration}s`" :path="dPath" rotate="auto" repeatCount="indefinite" />
                    </circle>
                </mask>
                <radialGradient :id="radialGradientId" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">
                    <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
                    <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
                </radialGradient>
            </defs>
            <use :href="`#${pathId}`" stroke-width="1" :stroke="lineColor" />
            <use :href="`#${pathId}`" stroke-width="3" :stroke="starColor" :mask="`url(#${maskId}`" />
        </svg>

        <div class="fly-box-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

defineProps({
    lineColor: {
        type: String,
        default: '#235fa7'
    },
    starColor: {
        type: String,
        default: '#4fd2dd'
    },
    starLength: {
        type: Number,
        default: 50
    },
    duration: {
        type: Number,
        default: 3
    }
});
const uuid = uuidv4();
const pathId = `flyBoxRef-path-${uuid}`;
const radialGradientId = `flyBoxRef-gradient-${uuid}`;
const maskId = `flyBoxRef-mask-${uuid}`;

const width = ref(0);
const height = ref(0);

const flyBoxRef = ref<HTMLDivElement>();

const dPath = computed(() => `M5 5 L${width.value - 5} 5 L${width.value - 5} ${height.value - 5} L5 ${height.value - 5} Z`);

function init() {
    const dom = flyBoxRef.value;
    if (dom) {
        width.value = dom?.clientWidth;
        height.value = dom?.clientHeight;
    }
}

onMounted(() => {
    init();
});
</script>

<style scoped lang="scss">
.fly-box {
    position: relative;
    width: 100%;
    height: 100%;

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .fly-box-content {
        width: 100%;
        height: 100%;
        padding: 5px;
        box-sizing: border-box;
    }
}
</style>
