<template>
    <div class="sales-list">
        <BaseScrollList :config="config" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { AreaSale } from '@/api/interface';
import BaseScrollList, { type BaseScrollListProps } from '@/components/base-scroll-list/BaseScrollList.vue';
import { colors } from '@/config/color';

type Props = {
    data?: AreaSale[];
};

const props = defineProps<Props>();

const config = ref<BaseScrollListProps['config']>({});

function update(AreaSaleData: AreaSale[]) {
    const headerData = ['城市订单量', '店铺数量', '接单骑手人数', '新店铺数量', '人均订单量'];
    const headerIndexData: string[] = [];
    const data: BaseScrollListProps['config']['data'] = AreaSaleData.map((item, i) => {
        if (i % 2 === 0) {
            headerIndexData[
                i
            ] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background-color:${colors['gray-color-11']}"><div style="width:15px;height:15px;background-color:${colors['primary-color-5']};border-radius:50%;border:1px solid #fff;"></div></div>`;
        } else {
            headerIndexData[
                i
            ] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background-color:${colors['gray-color-11']}"><div style="width:15px;height:15px;background-color:${colors['primary-color-7']};border-radius:50%;border:1px solid #fff;"></div></div>`;
        }

        const list = [];
        for (let j = 0; j < headerData.length; j++) {
            let text = '';
            switch (j) {
                case 0:
                    text = item.order;
                    break;
                case 1:
                    text = item.shop;
                    break;
                case 2:
                    text = item.rider;
                    break;
                case 3:
                    text = item.newShop;
                    break;
                case 4:
                    text = item.avgOrder;
                    break;
                default:
                    break;
            }
            if (j % 2 === 0) {
                list.push(text);
            } else {
                list.push(`<span style="color:${colors['primary-color-6']}">${text}</span>`);
            }
        }

        return list;
    });

    const value: BaseScrollListProps['config'] = {
        rowNum: 12,
        headerData,
        headerBackgroundColor: colors['gray-color-9'],
        headerIndex: true,
        data: data,
        rowBackground: [colors['gray-color-10'], colors['gray-color-11']],
        headerHeight: 50,
        headerFontSize: '24px',
        headerIndexContent: '',
        headerIndexData,
        rowFontSize: '24px',
        headerColor: colors['gray-color-1'],
        rowColor: colors['gray-color-1']
    };

    return value;
}

watch(
    () => props.data,
    (newData) => {
        if (!newData) {
            return;
        }
        const newConfig = update(newData);
        config.value = newConfig;
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.sales-list {
    background-color: $gray-color-10;
    width: 100%;
    height: 100%;
}
</style>
