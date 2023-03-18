import { getMapData, getUserData } from '@/api';
import type { AgeBar, DeviceData, MapData, ScreenData, TotalUserDaTa } from '@/api/interface';
import { onMounted, onUnmounted, ref } from 'vue';

const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)'];

function getNowTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

export default function useScreenData() {
    const ready = ref(false);
    const baseData = ref<ScreenData>();

    const totalUser = ref<TotalUserDaTa>();
    const ageData = ref<AgeBar[]>([]);
    const deviceData = ref<DeviceData>();
    const mapData = ref<MapData>();
    const realTimeOrder = ref<{ date: any[]; data: any[] }>({ date: [], data: [] });
    const scheduleViewData = ref();

    let task: number;

    async function getData() {
        mapData.value = await getMapData();
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
        realTimeOrder.value = {
            date: [...realTimeOrder.value.date, getNowTime()],
            data: [...realTimeOrder.value.data, baseData.value.realTimeOrder]
        };
        if (ready.value === false) {
            ready.value = true;
        }
    }

    onMounted(() => {
        task = setInterval(() => {
            getData();
        }, 10000);
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
        mapData,
        realTimeOrder,
        scheduleViewData
    };
}
