import { onMounted, ref, nextTick, unref } from "vue";

export default function useScreen(id: string) {
    const width = ref(0)
    const height = ref(0)

    async function initSize(dom: HTMLElement) {
        await nextTick();
        width.value = dom.clientWidth;
        height.value = dom.clientHeight;
    }

    onMounted(async () => {
        const dom = document.getElementById(id)
        if (dom) {
          initSize(dom)
        }
    })

    return { width, height }
}