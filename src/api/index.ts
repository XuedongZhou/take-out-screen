import { http } from '../utils/http';
import type { MapData, ScreenData } from './interface';

export function getUserData() {
    return http<ScreenData>({
        url: '/screen/data.json',
        method: 'get'
    });
}

export function getMapData() {
    return http<MapData>({
        url: '/screen/map.json',
        method: 'get'
    });
}
