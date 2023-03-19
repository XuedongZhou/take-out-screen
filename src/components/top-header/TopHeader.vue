<template>
    <div class="top-header">
        <div class="logo-wrapper">
            <ScreenLogo :stroke="colors['primary-color-6']" />
        </div>
        <div class="logo-text">
            <div class="cn-text">Snoweast 外卖业务数据大盘</div>
            <div class="en-text">Delivery Overview of Business Data</div>
        </div>
        <div class="right-text">
            <NumberClock />
        </div>
    </div>
</template>

<script setup lang="ts">
import ScreenLogo from '@/components/screen-logo/ScreenLogo.vue';
import NumberClock from '@/components/number-clock/NumberClock.vue';
import { colors } from '@/config/color';
</script>

<style scoped lang="scss">
.top-header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background: $gray-color-11;
    padding: 0 64px;
    box-sizing: border-box;

    .logo-wrapper {
        width: 120px;
        height: 120px;
    }

    .logo-text {
        flex: 1;
        margin-left: 40px;

        .cn-text {
            color: $gray-color-1;
            font-weight: bold;
            font-size: 60px;
            letter-spacing: 2px;
        }

        .en-text {
            color: $gray-color-1;
            font-size: 35px;
            letter-spacing: 1px;
        }
    }

    .right-text {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
}
</style>
