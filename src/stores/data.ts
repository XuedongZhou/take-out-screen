import { ref, onMounted, onUnmounted } from 'vue';
import { defineStore } from 'pinia';
import { format } from 'date-fns';
import { random } from 'lodash-es';
import { colors } from '@/config/color';
import { getUserData } from '@/api';
import type { ScreenData, TotalUserDaTa, AgeBar, DeviceData } from '@/api/interface';

const color = [
    colors['primary-color-6'],
    colors['primary-color-7'],
    colors['primary-color-8'],
    colors['primary-color-9']
];

function getNowTime() {
    return format(new Date(), 'HH:mm:ss');
}

export const useDataStore = defineStore('data', () => {
    const ready = ref(false);
    const baseData = ref<ScreenData>();
    const totalUser = ref<TotalUserDaTa>();
    const ageData = ref<AgeBar[]>([]);
    const deviceData = ref<DeviceData>();
    const realTimeOrder = ref<{ date: string[]; data: number[] }>({ date: [], data: [] });
    const scheduleViewData = ref();

    const updateTime = ref(new Date());

    let task: number;

    async function getData() {
        baseData.value = await getUserData();

        totalUser.value = {
            userToday: baseData.value.userToday,
            userGrowthLastDay: baseData.value.userGrowthLastDay,
            userGrowthLastMonth: baseData.value.userGrowthLastMonth
        };

        baseData.value.age?.forEach((item, index) => {
            if (ageData.value[index]) {
                ageData.value[index] = {
                    startValue: ageData.value[index].value,
                    value: item.value,
                    axis: item.key,
                    color: color[index]
                };
                ageData.value = [...ageData.value];
            } else {
                ageData.value.push({
                    startValue: 0,
                    value: item.value,
                    axis: item.key,
                    color: color[index]
                });
            }
        });
        deviceData.value = {
            totalDevices: baseData.value.totalDevices || 0,
            devices: baseData.value.devices || []
        };

        const date = realTimeOrder.value.date;
        const data = realTimeOrder.value.data;
        if (date.length > 100) {
            date.shift();
            data.shift();
        }
        realTimeOrder.value = {
            date: [...date, getNowTime()],
            data: [...data, random(1, 10000)]
        };
        if (ready.value === false) {
            ready.value = true;
        }

        updateTime.value = new Date();
    }

    onMounted(() => {
        getData();
        task = setInterval(() => {
            getData();
        }, 3000);
    });

    onUnmounted(() => {
        clearInterval(task);
    });

    return {
        ready,
        baseData,
        totalUser,
        ageData,
        deviceData,
        realTimeOrder,
        scheduleViewData,
        updateTime
    };
});
