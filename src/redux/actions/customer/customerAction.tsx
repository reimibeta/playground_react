import { RequestInterface, RequestListInterface } from "../../../apps/request/interfaces/request.interface";
import { request } from "../../../apps/request/request";
import { Customer } from "../../../models/general/customer/customer";
import { CustomerStatistic } from "../../../models/general/customer/customer-statistic";
import { RootArray, RootObject } from "../../../models/general/root";
import { customerApi, customerPurchaseStatisticApi, customerQuantityPurchaseStatisticApi } from "../../../urls/customerApi";
import { CUSTOMER_LIST, CUSTOMER_DETAIL, CUSTOMER_PURCHASE_STATISTIC, CUSTOMER_PURCHASE_QUANTITY_STATISTIC } from "./customerActionType";

export interface CustomerRequestListInterface<T> extends RequestListInterface<T> {
    status?: string,
    orderBy?: string,
    storeId?: number
}

export const dispatchCustomerList = (props: CustomerRequestListInterface<RootArray<Customer>>) => (dispatch: any) => {
    const url = customerApi({ 
        page: props.page, 
        status: props.status, 
        filter: props.filter, 
        order_by: props.orderBy,
    });
    request.getDispatchRequestList(url, CUSTOMER_LIST, props)(dispatch);
}

export const dispatchCustomerDetail = (id: number, props: RequestInterface<RootObject<Customer>>) => (dispatch: any) => {
    // console.log(customerApi({ id: id }))
    request.getDispatchRequest(customerApi({ id: id }), CUSTOMER_DETAIL, props)(dispatch);
}

// statistic
export const dispatchCustomerPurchaseStatistic = (year: any, customerId: any, props: RequestInterface<RootObject<CustomerStatistic>>) => (dispatch: any) => {
    request.getDispatchRequest(customerPurchaseStatisticApi(year, customerId), CUSTOMER_PURCHASE_STATISTIC, props)(dispatch);
}

export const dispatchCustomerPurchaseQuantityStatistic = (year: any, customerId: any, props: RequestInterface<RootObject<CustomerStatistic>>) => (dispatch: any) => {
    request.getDispatchRequest(customerQuantityPurchaseStatisticApi(year, customerId), CUSTOMER_PURCHASE_QUANTITY_STATISTIC, props)(dispatch);
}