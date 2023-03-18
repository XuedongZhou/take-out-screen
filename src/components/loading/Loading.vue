<template>
    <div class="loading">
        <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
            <circle cx="25" cy="25" r="22" fill="transparent" stroke-width="3" :stroke="outStrokeColor" stroke-dasharray="34" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" :dur="`${duration}s`" repeatCount="indefinite" />
                <animate attributeName="stroke" :values="outSideColorAnimation" :dur="`${duration}s`" repeatCount="indefinite" />
            </circle>
            <circle cx="25" cy="25" r="12" fill="transparent" stroke-width="3" :stroke="inSideColor" stroke-dasharray="19" stroke-linecap="round">
                <animateTransform attributeName="transform" type="rotate" from="360 25 25" to="0 25 25" :dur="`${duration}s`" repeatCount="indefinite" />
                <animate attributeName="stroke" :values="inSideColorAnimation" :dur="`${duration}s`" repeatCount="indefinite" />
            </circle>
        </svg>
        <div class="loading-tip">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    width: { type: Number, default: 50 },
    height: { type: Number, default: 50 },
    outStrokeColor: { type: String, default: '#1677ff' },
    inSideColor: { type: String, default: '#13c2c2' },
    duration: { type: Number, default: 2 }
});

const outSideColorAnimation = computed(() => `${props.outStrokeColor};${props.inSideColor};${props.outStrokeColor}`);
const inSideColorAnimation = computed(() => `${props.inSideColor};${props.outStrokeColor};${props.inSideColor}`);
</script>

<style scoped lang="scss">
.loading {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .loading-tip {
        margin-top: 10px;
        font-size: 15px;
    }
}
</style>
