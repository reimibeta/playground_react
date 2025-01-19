import { 
    ORDER_STATISTIC_REVENUE, ORDER_STATISTIC_SUCCESS_RATE
} from "./orderStatisticActionType"
import { RootArray, RootObject } from "../../../../models/general/root";
import { request } from "../../../../apps/request/request";
import { orderRevenueStatisticApi, orderRateStatisticApi } from "../../../../urls/orderApi";
import { OrderStatistic } from "../../../../models/general/order/order-statistic";
import { RequestInterface } from "../../../../apps/request/interfaces/request.interface";

export const dispatchOrderRevenueStatistic = (year: any, props: RequestInterface<RootObject<OrderStatistic>>) => (dispatch: any) => {
    request.getDispatchRequest(orderRevenueStatisticApi({ year }), ORDER_STATISTIC_REVENUE, props)(dispatch);
}

export const dispatchOrderRateStatistic = (year: any, props: RequestInterface<RootObject<OrderStatistic>>) => (dispatch: any) => {
    request.getDispatchRequest(orderRateStatisticApi({ year }), ORDER_STATISTIC_SUCCESS_RATE, props)(dispatch);
}