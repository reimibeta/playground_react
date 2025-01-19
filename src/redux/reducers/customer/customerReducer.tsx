import { 
    CUSTOMER_DETAIL,
    CUSTOMER_LIST,
    CUSTOMER_PURCHASE_QUANTITY_STATISTIC,
    CUSTOMER_PURCHASE_STATISTIC
} from "../../actions/customer/customerActionType";
import { Customer} from "../../../models/general/customer/customer";
import { RootArray, RootObject } from "../../../models/general/root";
import { CustomerStatistic } from "../../../models/general/customer/customer-statistic";

export const customers = (state={
    list: {
        results: [] as Customer[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    detail: {
        result: {} as Customer,
        loading: true
    }
}, action: any) => {
    
    if(action.type === CUSTOMER_LIST){

        // if (action.payload.results){
        //     // console.log(`product refresh: ${action.payload.refresh}`);
        //     if(action.payload.refresh){
        //         state.list.results.length = 0;
        //     }
        //     state.list.results.push(...action.payload.results)
        // }
 
        return {
            ...state,
            customerList: {
                // results: state.list.results,
                results: action.payload.results,
                count: action.payload.count,
                refresh: action.payload.refresh ?? state.list.refresh,
                loading: action.payload.loading ?? state.list.loading
            } as RootArray<Customer>
        };
    }
    // detail
    if(action.type === CUSTOMER_DETAIL){
        // if (action.payload.result){
        //     state.detail.result = {} as Customer
        // }
        // state.detail.result = action.payload.result
        // console.log('aaa', action.payload.result)
        return {
            ...state,
            customerDetail: {
                result: action.payload.result
                // result: state.detail.result
            } as RootObject<Customer>
        }
    }
    // statistics
    if(action.type === CUSTOMER_PURCHASE_STATISTIC){
        // console.log('ss', action.payload.result)
        return {
            ...state,
            customerPurchaseStatistic: {
                result: action.payload.result
            } as RootObject<CustomerStatistic>
        }
    }
    if(action.type === CUSTOMER_PURCHASE_QUANTITY_STATISTIC){
        // console.log('ss', action.payload.result)
        return {
            ...state,
            customerPurchaseQuantityStatistic: {
                result: action.payload.result
            } as RootObject<CustomerStatistic>
        }
    }
    return state;
}
