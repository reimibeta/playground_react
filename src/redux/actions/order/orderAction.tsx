import { RootArray, RootObject } from "../../../models/general/root";
import { 
    ORDER_LIST,
    ORDER_DETAIL,
    ORDER_PENDING_LIST,
    ORDER_COMPLETE_LIST,
    ORDER_UNPAID_LIST,
    ORDER_SEARCH_LIST,
    ORDER_STORE_LIST
} from "./orderActionType";
import { Order } from "../../../models/general/order/order";
import { orderApi, orderDetailApi } from "../../../urls/orderApi";
import { RequestInterface, RequestListInterface } from "../../../apps/request/interfaces/request.interface";
import { request } from "../../../apps/request/request";


export interface OrderRequestListInterface<T> extends RequestListInterface<T> {
    status?: string,
    orderBy?: string,
    storeId?: number
}

export const dispatchOrderList = (props: OrderRequestListInterface<RootArray<Order>>) => (dispatch: any) => {
    const url = orderApi({ 
        page: props.page, 
        status: props.status, 
        filter: props.filter, 
        order_by: props.orderBy,
    });
    request.getDispatchRequestList(url, ORDER_LIST, props)(dispatch);
}

// export const dispatchOrderCustomerList = (props: OrderRequestListInterface<RootArray<Order>>) => (dispatch: any) => {
//     const url = orderApi({ 
//         page: props.page, 
//         status: props.status, 
//         filter: props.filter, 
//         order_by: props.orderBy,
//     });
//     // console.log(url)
//     request.getDispatchRequestList(url, CUSTOMER_ORDER_CUSTOMER_LIST, props)(dispatch);
// }

export const dispatchOrderPendingList = (props: OrderRequestListInterface<RootArray<Order>>) => (dispatch: any) => {
    const url = orderApi({ 
        page: props.page, 
        status: 'PENDING', 
        order_by: 'required_date', 
        filter: props.filter,
    });
    request.getDispatchRequestList(url, ORDER_PENDING_LIST, props)(dispatch);
}

export const dispatchOrderCompleteList = (props: OrderRequestListInterface<RootArray<Order>>) => (dispatch: any) => {
    const url = orderApi({ 
        page: props.page, 
        status: 'COMPLETED', 
        filter: props.filter,
    });
    request.getDispatchRequestList(url, ORDER_COMPLETE_LIST, props)(dispatch);
}

export const dispatchOrderUnpaidList = (props: OrderRequestListInterface<RootArray<Order>>) => (dispatch: any) => {
    const url = orderApi({ 
        page: props.page, 
        filter: props.filter, 
        extra: '&payment=UNPAID',
    });
    request.getDispatchRequestList(url, ORDER_UNPAID_LIST, props)(dispatch);
}

// search
export const dispatchClearOrderSearchList = (props: RequestListInterface<RootArray<Order>>) => (dispatch: any) => {
    dispatch({ type: ORDER_SEARCH_LIST, payload: request.getDispatchRequestListValue({
        results: [],
        count: 0
    }, props) });
}
export const dispatchSearchOrderList = (props: RequestListInterface<RootArray<Order>>) => (dispatch: any) => {
    const url = orderApi({ page: props.page, filter: 'search=' + props.filter });
    request.getDispatchRequestList(url, ORDER_SEARCH_LIST, props)(dispatch);
}

export const dispatchOrderStoreList = (props: OrderRequestListInterface<RootArray<Order>>) => (dispatch: any) => {
    const url = orderApi({ 
        page: props.page, 
        filter: 'store_id=' + props.storeId + '&' + props.filter 
    });
    request.getDispatchRequestList(url, ORDER_STORE_LIST, props)(dispatch);
}

// detail
export interface OrderRequestInterface<T> extends RequestInterface<T> {
    orderId: number
}
export const dispatchOrder = (props: OrderRequestInterface<RootObject<Order>>) => (dispatch: any) => {
    request.getDispatchRequest(orderDetailApi({ orderId: props.orderId }), ORDER_DETAIL, props)(dispatch);
}
