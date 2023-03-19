import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { getMapData } from '@/api';
import type { MapData } from '@/api/interface';

export const useMapStore = defineStore('map', () => {
    const ready = ref(false);
    const mapData = ref<MapData>();

    onMounted(() => {
        ready.value = false;
        getMapData()
            .then((res) => {
                mapData.value = res;
                ready.value = true;
            })
            .catch(() => {
                ready.value = true;
            });
    });

    return {
        ready,
        mapData
    };
});
