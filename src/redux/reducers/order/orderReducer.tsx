import { 
    ORDER_DETAIL,
    ORDER_LIST,
    ORDER_PENDING_LIST,
    ORDER_COMPLETE_LIST,
    ORDER_UNPAID_LIST,
    ORDER_SEARCH_LIST,
    ORDER_STORE_LIST
} from "../../actions/order/orderActionType";
import { RootArray, RootObject } from "../../../models/general/root";
import { Order } from "../../../models/general/order/order";
import { OrderStatistic } from "../../../models/general/order/order-statistic";
import { ORDER_STATISTIC_REVENUE, ORDER_STATISTIC_SUCCESS_RATE } from "../../actions/order/statistics/orderStatisticActionType";

// to prevent bugs must not set default value to initState
const initStateOrder = { 
    list: {
        results: [] as Order[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    pendingList: {
        results: [] as Order[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    completeList: {
        results: [] as Order[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    unpaidList: {
        results: [] as Order[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    searchList: {
        results: [] as Order[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    // customerList: {
    //     results: [] as Order[],
    //     page: 1,
    //     refresh: true,
    //     loading: true,
    //     loadmore: false,
    //     filter: '',
    //     count: 0
    // },
    orderStoreList: {
        results: [] as Order[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    detail: {
        data: {} as Order,
        loading: true
    },
    // statistic
    revenue: {
        data: {} as OrderStatistic,
        loading: true
    },
    rate: {
        data: {} as OrderStatistic,
        loading: true
    }
}

export const orders = (state = initStateOrder, action: any) => {
    // list
    if(action.type === ORDER_LIST){

        if (action.payload.results){
            // console.log(`order refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.list.results.length = 0;
            }
            state.list.results.push(...action.payload.results)
            // console.log('reducer list', action.payload.count)
        }

        return {
            ...state,
            orderList: {
                results: state.list.results,
                count: action.payload.count ?? state.list.count,
                page: action.payload.page ?? state.list.page,
                refresh: action.payload.refresh ?? state.list.refresh,
                loading: action.payload.loading ?? state.list.loading,
                loadmore: action.payload.loadmore ?? state.list.loadmore,
                filter: action.payload.filter ?? state.list.filter
            } as RootArray<Order>
        };
    }
    if(action.type === ORDER_PENDING_LIST){

        if (action.payload.results){
            // console.log(`order pending refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.pendingList.results.length = 0;
            }
            state.pendingList.results.push(...action.payload.results);
            // console.log('search reducer pending')
        }

        return {
            ...state,
            orderPendingList: {
                results: state.pendingList.results,
                count: action.payload.count,
                page: action.payload.page ?? state.pendingList.page,
                refresh: action.payload.refresh ?? state.pendingList.refresh,
                loading: action.payload.loading ?? state.pendingList.loading,
                loadmore: action.payload.loadmore ?? state.pendingList.loadmore,
            } as RootArray<Order>
        };
    }
    if(action.type === ORDER_COMPLETE_LIST){

        if (action.payload.results){
            // console.log(`order completed refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.completeList.results.length = 0;
            }
            state.completeList.results.push(...action.payload.results)
        }

        return {
            ...state,
            orderCompleteList: {
                results: state.completeList.results,
                count: action.payload.count,
                page: action.payload.page ?? state.completeList.page,
                refresh: action.payload.refresh ?? state.completeList.refresh,
                loading: action.payload.loading ?? state.completeList.loading,
                loadmore: action.payload.loadmore ?? state.completeList.loadmore,
            } as RootArray<Order>
        };
    }
    if(action.type === ORDER_UNPAID_LIST){

        if (action.payload.results){
            // console.log(`order unpaid refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.unpaidList.results.length = 0;
            }
            state.unpaidList.results.push(...action.payload.results)
        }

        return {
            ...state,
            orderUnpaidList: {
                results: state.unpaidList.results,
                count: action.payload.count,
                page: action.payload.page ?? state.unpaidList.page,
                refresh: action.payload.refresh ?? state.unpaidList.refresh,
                loading: action.payload.loading ?? state.unpaidList.loading,
                loadmore: action.payload.loadmore ?? state.unpaidList.loadmore,
            } as RootArray<Order>
        };
    }
    if(action.type === ORDER_SEARCH_LIST){

        if (action.payload.results){
            console.log(`order search: ${action.payload.count}`);
            if(action.payload.refresh){
                state.searchList.results.length = 0;
            }
            // if(action.payload.results.length = 0){
            //     state.searchList.results.length = 0;
            // }
            if(action.payload.count === 0){
                state.searchList.results.length = 0;
            }
            state.searchList.results.push(...action.payload.results)
        }
        // console.log('search', action.payload.results.length)
        return {
            ...state,
            orderSearchList: {
                results: state.searchList.results,
                count: action.payload.count,
                page: action.payload.page ?? state.searchList.page,
                refresh: action.payload.refresh ?? state.searchList.refresh,
                loading: action.payload.loading ?? state.searchList.loading,
                loadmore: action.payload.loadmore ?? state.searchList.loadmore,
                filter: action.payload.filter ?? state.searchList.filter
            } as RootArray<Order>
        };
    }
    // if(action.type === ORDER_CUSTOMER_LIST){

    //     if (action.payload.results){
    //         // console.log(`order pending refresh: ${action.payload.refresh}`);
    //         if(action.payload.refresh){
    //             state.customerList.results.length = 0;
    //         }
    //         state.customerList.results.push(...action.payload.results)
    //     }

    //     return {
    //         ...state,
    //         orderCustomerList: {
    //             results: state.customerList.results,
    //             count: action.payload.count,
    //             page: action.payload.page ?? state.customerList.page,
    //             refresh: action.payload.refresh ?? state.customerList.refresh,
    //             loading: action.payload.loading ?? state.customerList.loading,
    //             loadmore: action.payload.loadmore ?? state.customerList.loadmore,
    //         } as RootArray<Order>
    //     };
    // }
    if(action.type === ORDER_STORE_LIST){

        if (action.payload.results){
            // console.log(`order pending refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.orderStoreList.results.length = 0;
            }
            state.orderStoreList.results.push(...action.payload.results)
        }

        return {
            ...state,
            orderStoreList: {
                results: state.orderStoreList.results,
                count: action.payload.count,
                page: action.payload.page ?? state.orderStoreList.page,
                refresh: action.payload.refresh ?? state.orderStoreList.refresh,
                loading: action.payload.loading ?? state.orderStoreList.loading,
                loadmore: action.payload.loadmore ?? state.orderStoreList.loadmore,
            } as RootArray<Order>
        };
    }
    // detail
    if(action.type === ORDER_DETAIL){
        // console.log('aaa', action.payload.result)
        return {
            ...state,
            orderDetail: {
                result: action.payload.result
            } as RootObject<Order>
        }
    }
    // // statatistic
    // if(action.type === ORDER_REVENUE_STATISTIC){
    //     // console.log('ss', action.payload.result)
    //     return {
    //         ...state,
    //         orderRevenueStatistic: {
    //             result: action.payload.result
    //         } as RootObject<OrderStatistic>
    //     }
    // }
    // if(action.type === ORDER_QUANTITY_ORDERING_STATISTIC){
    //     // console.log('ss', action.payload.result)
    //     return {
    //         ...state,
    //         orderQuantityOrderingStatistic: {
    //             result: action.payload.result
    //         } as RootObject<OrderStatistic>
    //     }
    // }
    // order statistics
    if(action.type === ORDER_STATISTIC_REVENUE){
        // console.log('ss', action.payload.result)
        return {
            ...state,
            orderRevenueStatistic: {
                result: action.payload.result
            } as RootObject<OrderStatistic>
        }
    }
    if(action.type === ORDER_STATISTIC_SUCCESS_RATE){
        // console.log('ss', action.payload.result)
        return {
            ...state,
            orderRateStatistic: {
                result: action.payload.result
            } as RootObject<OrderStatistic>
        }
    }
    return state;
}
