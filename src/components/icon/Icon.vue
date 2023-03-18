<template>
    <svg class="icon" :style="style">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script setup lang="ts">
import type { CSSProperties, PropType } from 'vue';

const props = defineProps({
    prefix: {
        type: String,
        default: 'icon'
    },
    icon: {
        type: String,
        required: true
    },
    style: {
        type: Object as PropType<CSSProperties>
    }
});

const iconName = `#${props.prefix}-${props.icon}`;
</script>

<style scoped lang="scss">
.icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
    overflow: hidden;
}
</style>
