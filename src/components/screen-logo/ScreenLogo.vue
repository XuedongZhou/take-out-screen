<template>
    <svg class="logo" viewBox="0 0 1024 1024">
        <path
            class="logo-path"
            d="M208 720m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
            :stroke="stroke"
            :stroke-width="strokeWidth"
        ></path>
        <path
            class="logo-path"
            d="M816 720m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
            :stroke="stroke"
            :stroke-width="strokeWidth"
        ></path>
        <path
            class="logo-path"
            d="M992 704c-0.8-28.3-13.1-101.6-29.6-124.7-0.5-0.8-1.1-1.5-1.7-2.3-0.3-0.3-0.5-0.7-0.8-1l-64-96h4.5c15.2 0 27.5-12.3 27.5-27.5 0-20.2-16.3-36.5-36.5-36.5H597c-8.3 0-16.3 3.3-22.2 9.2l-0.2 0.2c-11 11-13.4 28-5.8 41.6l7.2 13 25.8 51.6c3.7 7.4 2.3 16.4-3.6 22.3l-9.6 9.6c-8 8-18.9 12.5-30.2 12.5H480c-68.8-24.6-118.1-85.5-127.7-157.9l-0.3-2.1-25.8-149.1c-1.3-4.7-2.1-9.7-2.2-14.9v-1c0-32.2 25.9-58.4 58-59h34c17.7 0 32-14.3 32-32s-14.3-32-32-32H272c-44.2 0-80 35.8-80 80 0 25.3 11.8 47.8 30.1 62.5L256 480l-64 64 1.1 0.6C102.9 552.2 32 627.8 32 720c0 97.2 78.8 176 176 176 80.6 0 148.5-54.1 169.4-128h269.3c20.9 73.9 88.8 128 169.4 128 97.2 0 176-78.8 176-176 0-5.4-0.3-10.7-0.7-16h0.6zM208 832c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z m608 0c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
            :stroke="stroke"
            :stroke-width="strokeWidth"
        ></path>
        <path
            class="logo-path"
            d="M896 260c0-55.2-44.8-100-100-100H676c-55.2 0-100 44.8-100 100v90h320v-90z"
            :stroke="stroke"
            :stroke-width="strokeWidth"
        ></path>
    </svg>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

defineProps({
    strokeWidth: {
        type: Number,
        default: 50
    },
    stroke: {
        type: String,
        default: '#fff'
    }
});

onMounted(() => {
    // const logo = document.getElementsByClassName('logo-path')[0];
    // const logo1 = document.getElementsByClassName('logo-path')[1];
    // const logo2 = document.getElementsByClassName('logo-path')[2];
    // const logo3 = document.getElementsByClassName('logo-path')[3];
    // console.log(logo.getTotalLength());
    // console.log(logo1.getTotalLength());
    // console.log(logo2.getTotalLength());
    // console.log(logo3.getTotalLength());
});
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: 100%;
}

.logo-path {
    fill: transparent;
    animation: logo-animation 5s linear infinite forwards;
}

@keyframes logo-animation {
    0% {
        stroke-dasharray: 5159;
        stroke-dashoffset: 5159;
    }

    50% {
        stroke-dasharray: 5159;
        stroke-dashoffset: 0;
    }

    100% {
        stroke-dasharray: 5159;
        stroke-dashoffset: 0;
    }
}
</style>
