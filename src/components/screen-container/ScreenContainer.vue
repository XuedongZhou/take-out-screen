<template>
    <div id="screen-container" :ref="refName">
        <template v-if="ready">
            <slot></slot>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, getCurrentInstance, nextTick, onUnmounted, type ComponentInternalInstance } from 'vue';
import { debounce } from 'lodash-es';

type Props = {
    options?: {
        width: number,
        height: number
    }
}

const props = defineProps<Props>()

const originalWidth = ref(0);
const originalHeight = ref(0);
const width = ref(0);
const height = ref(0);
const ready = ref(false);

const refName = 'screenContainer';
let context: ComponentInternalInstance | null = null;
let dom: HTMLDivElement;
let observer: MutationObserver | null = null;

async function initSize() {
    await nextTick();
    if (!originalWidth.value || !originalHeight.value) {
        originalWidth.value = window.screen.width;
        originalHeight.value = window.screen.height;
    }

    if (props.options?.width && props.options?.height) {
        width.value = props.options.width;
        height.value = props.options.height;
    } else {
        width.value = dom.clientWidth;
        height.value = dom.clientHeight;
    }
}

function updateSize() {
    if (width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
    }
}

function updateScale() {
    const currentWidth = document.body.clientWidth;
    const currentHeight = document.body.clientHeight;

    const realWidth = width.value || originalWidth.value;
    const realHeight = height.value || originalHeight.value;

    const widthScale = currentWidth / realWidth;
    const heightScale = currentHeight / realHeight;

    dom.style.transform = `scale(${widthScale}, ${heightScale})`;
}

async function onResize() {
    await initSize()
    updateScale()
}

function initMutationObserver() {
    const MutationObserver = window.MutationObserver;
    observer = new MutationObserver(onResize);
    observer.observe(dom, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
    });
}

function removeMutationObserver() {
    if (observer) {
        observer.disconnect();
        observer.takeRecords();
        observer = null;
    }
}

onMounted(async () => {
    ready.value = false;
    context = getCurrentInstance();
    if (!context) {
        return
    }
    dom = context.refs[refName] as HTMLDivElement;
    await initSize();
    updateSize();
    updateScale();

    window.addEventListener('resize', debounce(onResize, 100));
    initMutationObserver();
    ready.value = true;
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
    removeMutationObserver();
});
</script>

<style scoped lang="scss">
#screen-container {
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    transform-origin: left top;
}
</style>
