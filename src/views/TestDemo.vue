<template>
  <div :style="{ width: '100%', height: '100%' }">
    <OrderMap :data="mapData"/>
  </div>
</template>

<script lang="ts" setup>
import OrderMap from '@/components/order-map/OrderMap.vue';
import useScreenData from '@/hooks/useScreenData';

const { mapData } = useScreenData()

</script>

<style scoped lang="scss"></style>
