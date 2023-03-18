import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Echarts from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart, LineChart } from 'echarts/charts';
import {
    TitleComponent,
    GridComponent,
    TooltipComponent,
    DatasetComponent,
    LegendComponent,
    TimelineComponent
} from 'echarts/components';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);

use([
    CanvasRenderer,
    BarChart,
    PieChart,
    LineChart,
    TitleComponent,
    GridComponent,
    TooltipComponent,
    DatasetComponent,
    LegendComponent,
    TimelineComponent
]);

app.use(createPinia());
app.use(router);
app.component('vue-echarts', Echarts);

app.mount('#app');
