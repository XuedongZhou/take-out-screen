<template>
    <div class="home">
        <ScreenLoading
            v-if="loading"
            :outStrokeColor="colors['primary-color-5']"
            :inSideColor="colors['primary-color-7']"
            :width="60"
            :height="60"
        >
            <div class="loading-text">数据大屏加载中...</div>
        </ScreenLoading>
        <ScreenContainer v-else :options="{ width: 3840, height: 2160 }">
            <div class="header">
                <TopHeader />
            </div>
            <div class="separator">分割线</div>
            <div class="center">
                <div class="left">
                    <div class="left1">
                        <TotalUser :data="totalUser" />
                    </div>
                    <div class="left2">
                        <AverageAge :data="ageData" :avgAge="baseData?.averageAge" />
                    </div>
                    <div class="left3">
                        <TotalDevice :data="deviceData" />
                    </div>
                    <div class="left4">
                        <TotalGender :data="baseData?.gender" />
                    </div>
                    <div class="left5">
                        <TotalRider :data="baseData?.rider" />
                    </div>
                    <div class="left6">
                        <HotCategory :data="baseData?.category" :update-time="updateTime" />
                    </div>
                </div>
                <div class="right">
                    <div class="right-top1">
                        <CenterHeader :data="baseData" />
                    </div>
                    <div class="right-top2">
                        <TransformCategory :data="['全部', '北京', '上海', '广州', '深圳', '杭州', '成都']" />
                    </div>
                    <div class="right-bottom">
                        <div class="bottom-left">
                            <div class="bottom-left1">
                                <OrderMap :ready="ready" :data="mapData" />
                            </div>
                            <div class="bottom-left2">
                                <TransformCategory
                                    :data="['订单量', '销售额', '用户数', '退单量']"
                                    :color="[colors['primary-color-6'], colors['primary-color-4']]"
                                />
                            </div>
                            <div class="bottom-left3">
                                <FlyBox>
                                    <RealTimeOrder :data="realTimeOrder" />
                                </FlyBox>
                            </div>
                            <div class="bottom-left4">
                                <ScheduleView />
                            </div>
                        </div>
                        <div class="bottom-right">
                            <div class="bottom-right1">
                                <SalesList :data="baseData?.areaSales" />
                            </div>
                            <div class="bottom-right2">
                                <SalesRanking :data="baseData?.areaTop" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenContainer>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ScreenContainer from '@/components/screen-container/ScreenContainer.vue';
import ScreenLoading from '@/components/screen-loading/ScreenLoading.vue';
import TopHeader from '@/components/top-header/TopHeader.vue';
import TotalUser from '@/components/total-user/TotalUser.vue';
import AverageAge from '@/components/average-age/AverageAge.vue';
import TotalDevice from '@/components/total-device/TotalDevice.vue';
import TotalGender from '@/components/total-gender/TotalGender.vue';
import TotalRider from '@/components/total-rider/TotalRider.vue';
import HotCategory from '@/components/hot-category/HotCategory.vue';
import CenterHeader from '@/components/center-header/CenterHeader.vue';
import TransformCategory from '@/components/transform-category/TransformCategory.vue';
import SalesList from '@/components/sales-list/SalesList.vue';
import OrderMap from '@/components/order-map/OrderMap.vue';
import FlyBox from '@/components/flybox/FlyBox.vue';
import RealTimeOrder from '@/components/real-time-order/RealTimeOrder.vue';
import ScheduleView from '@/components/schedule-view/ScheduleView.vue';
import SalesRanking from '@/components/sales-ranking/SalesRanking.vue';
import { useDataStore } from '@/stores/data';
import { useMapStore } from '@/stores/map';
import { colors } from '@/config/color';

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
});

const data = useDataStore();
const map = useMapStore();

const baseData = computed(() => data.baseData);
const totalUser = computed(() => data.totalUser);
const ageData = computed(() => data.ageData);
const deviceData = computed(() => data.deviceData);
const realTimeOrder = computed(() => data.realTimeOrder);
const updateTime = computed(() => data.updateTime);

const ready = computed(() => map.ready);
const mapData = computed(() => map.mapData);
</script>

<style scoped lang="scss">
.home {
    height: 100%;
    background-color: $gray-color-12;
    color: $gray-color-1;
    font-size: 48px;
    display: flex;
    flex-direction: column;

    #screen-container {
        display: flex;
        flex-direction: column;

        .header {
            height: 167px;
        }

        .separator {
            height: 10px;
            background-color: $gray-color-7;
        }

        .center {
            height: 100%;
            flex: 1;
            display: flex;

            .left {
                width: 860px;
                flex: 0 0 860px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-bottom: 20px;
                box-sizing: border-box;

                .left1 {
                    height: 300px;
                }

                .left2 {
                    height: 320px;
                }

                .left3 {
                    height: 280px;
                }

                .left4 {
                    height: 230px;
                }

                .left5 {
                    height: 400px;
                }

                .left6 {
                    height: 360px;
                }
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 10px;

                .right-top1 {
                    height: 206px;
                }

                .right-top2 {
                    height: 48px;
                    margin: 10px 0;
                }

                .right-bottom {
                    flex: 1;
                    display: flex;
                    padding-bottom: 20px;

                    .bottom-left {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        flex: 0 0 1917px;
                        width: 1917px;

                        .bottom-left1 {
                            height: 999px;
                        }

                        .bottom-left2 {
                            height: 60px;
                        }

                        .bottom-left3 {
                            height: 360px;
                        }

                        .bottom-left4 {
                            height: 240px;
                        }
                    }

                    .bottom-right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 10px;

                        .bottom-right1 {
                            height: 999px;
                        }

                        .bottom-right2 {
                            margin-top: 10px;
                            flex: 1;
                        }
                    }
                }
            }
        }
    }
}

.loading-text {
    font-size: 20px;
    color: $primary-color-8;
}
</style>
