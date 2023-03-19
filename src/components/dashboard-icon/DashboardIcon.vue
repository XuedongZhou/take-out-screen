<template>
    <div class="dashboard-icon">
        <svg viewBox="0 0 1024 1024">
            <path
                d="M691.2 823.2A304 304 0 0 0 512 275.04v265.44Q663.68 780.32 691.2 823.2z"
                :fill="areaColor"
                opacity=".15"
                p-id="7432"
            ></path>
            <path
                d="M563.52 535.04a14.56 14.56 0 0 1 1.12 2.24l80 166.08a18.88 18.88 0 0 1-29.6 22.4L476.8 604c-0.96 0-1.6-1.6-2.4-2.4a56.96 56.96 0 0 1 76.48-84.32A57.6 57.6 0 0 1 564 535.04z"
                :fill="pointColor"
            >
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    values="-150 512 560;5 512 560;-150 512 560;"
                    dur="3s"
                    repeatCount="indefinite"
                />
            </path>
            <path
                d="M788.8 896a18.88 18.88 0 0 1-24-29.28 398.4 398.4 0 1 0-505.44 0A19.04 19.04 0 0 1 235.2 896a436.16 436.16 0 1 1 553.6 0z"
                :fill="circleColor"
            ></path>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { colors, colorsOpacity } from '@/config/color';

defineProps({
    pointColor: { type: String, default: colors['primary-color-6'] },
    circleColor: { type: String, default: colors['primary-color-5'] },
    areaColor: { type: String, default: colorsOpacity(0.8) }
});
</script>

<style scoped lang="scss">
.dashboard-icon {
    width: 100%;
    height: 100%;

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
