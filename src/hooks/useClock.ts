import { onMounted, onUnmounted, ref } from 'vue';
import { format } from 'date-fns';

export default function useClock() {
    const date = ref();
    const time = ref();

    const interval = 1000;
    let count = 0;
    const startTime = Date.now();
    let timer = 0;

    function clock() {
        const now = Date.now();
        const dateNow = format(now, 'yyyy-MM-dd');
        const timeNow = format(now, 'HH:mm:ss');
        date.value = dateNow;
        time.value = timeNow;

        count++;
        const offset = now - (startTime + count * interval);
        let nextTime = interval - offset;
        if (nextTime < 0) {
            nextTime = 0;
        }

        timer = setTimeout(clock, nextTime);
    }

    onMounted(() => {
        timer = setTimeout(clock, interval);
    });

    onUnmounted(() => {
        if (timer) {
            clearTimeout(timer);
        }
    });

    return { date, time };
}
