export interface ScreenData {
    userToday: number;
    userLastDay: number;
    userLastMonth: number;
    userGrowthLastDay: string;
    userGrowthLastMonth: string;
    age: Age[];
    averageAge: string;
    totalDevices: number;
    devices: Device[];
    gender: [Gender, Gender];
    rider: Rider;
    category: Category;
    orderGrowthLastDay: string;
    orderGrowthLastMonth: string;
    orderLastMonth: number;
    orderLastDay: number;
    orderToday: number;
    orderTrend: number[];
    orderUserTrend: number[];
    orderUserTrendAxis: string[];
    orderFullYearAxis: string[];
    orderFullYear: number[];
    userFullYearAxis: string[];
    userFullYear: number[];
    orderRank: OrderRank[];
    userRank: UserRank[];
    salesGrowthLastDay: string;
    salesGrowthLastMonth: string;
    salesLastMonth: number;
    salesLastDay: number;
    salesToday: number;
    orderPrice: number;
    orderUser: number;
    covertRate: string;
    returnRate: string;
    areaSales: AreaSale[];
    areaTop: AreaTop[];
    realTimeOrder: number;
    growthLastDay: string;
    growthLastMonth: string;
}

export interface Age {
    key: string;
    value: number;
}

export interface Device {
    key: string;
    value: number;
}

export interface Gender {
    key: string;
    value: number;
}

export interface Rider {
    axisX: string[];
    orderData: OrderData;
    rateData: RateData;
}

export interface OrderData {
    legend1: string;
    legend2: string;
    data1: string[];
    data2: string[];
}

export interface RateData {
    legend1: string;
    legend2: string;
    data1: string[];
    data2: string[];
}

export interface Category {
    data1: Data1;
    data2: Data2;
}

export interface Data1 {
    axisX: string[];
    data1: number[];
    data2: number[];
}

export interface Data2 {
    axisX: string[];
    data1: number[];
    data2: number[];
}

export interface OrderRank {
    no: number;
    name: string;
    money: string;
}

export interface UserRank {
    no: number;
    name: string;
    money: string;
}

export interface AreaSale {
    order: string;
    shop: string;
    rider: string;
    newShop: string;
    avgOrder: string;
}

export interface AreaTop {
    city: string;
    rate: string;
    shop: Shop[];
}

export interface Shop {
    shop: string;
    order: number;
    sales: number;
}

export interface MapData {
    type: string;
    features: Feature[];
}

export interface Feature {
    type: string;
    id: string;
    properties: Properties;
    geometry: Geometry;
}

export interface Properties {
    name: string;
    cp: number[];
    childNum: number;
}

export interface Geometry {
    type: string;
    coordinates: Array<Array<[number, number]>>;
}

// custom
export interface AgeBar {
    startValue: number;
    value: number;
    axis: string;
    color: string;
}

export type TotalUserDaTa = Pick<ScreenData, 'userToday' | 'userGrowthLastDay' | 'userGrowthLastMonth'>;
export type DeviceData = Pick<ScreenData, 'totalDevices' | 'devices'>;
export type SummaryData = Pick<
    ScreenData,
    'covertRate' | 'returnRate' | 'salesToday' | 'orderToday' | 'orderUser' | 'userToday'
>;
