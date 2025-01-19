import { 
    PRODUCT_LIST,
    PRODUCT_DETAIL,
    PRODUCT_STORE_LIST,
    PRODUCT_SEARCH_LIST,
    PRODUCT_QUANTITY_STATISTIC
} from "../../actions/product/productActionType";
import { Product, ProductStatistic } from "../../../models/general/product/product";
import { RootArray, RootObject } from "../../../models/general/root";

export const products = (state={
    list: {
        results: [] as Product[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    productSearchList: {
        results: [] as Product[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    productStoreList: {
        results: [] as Product[],
        page: 1,
        refresh: true,
        loading: true,
        loadmore: false,
        filter: '',
        count: 0
    },
    detail: {
        data: {} as Product,
        loading: true
    }
}, action: any) => {
    
    if(action.type === PRODUCT_LIST){

        if (action.payload.results){
            // console.log(`product refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.list.results.length = 0;
            }
            state.list.results.push(...action.payload.results)
        }
 
        return {
            ...state,
            productList: {
                results: state.list.results,
                count: action.payload.count,
                refresh: action.payload.refresh ?? state.list.refresh,
                loading: action.payload.loading ?? state.list.loading
            } as RootArray<Product>
        };
    }
    if(action.type === PRODUCT_STORE_LIST){

        if (action.payload.results){
            // console.log(`order pending refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.productStoreList.results.length = 0;
            }
            state.productStoreList.results.push(...action.payload.results)
        }

        return {
            ...state,
            productStoreList: {
                results: state.productStoreList.results,
                count: action.payload.count,
                page: action.payload.page ?? state.productStoreList.page,
                refresh: action.payload.refresh ?? state.productStoreList.refresh,
                loading: action.payload.loading ?? state.productStoreList.loading,
                loadmore: action.payload.loadmore ?? state.productStoreList.loadmore,
            } as RootArray<Product>
        };
    }
    if(action.type === PRODUCT_SEARCH_LIST){

        if (action.payload.results){
            // console.log(`order pending refresh: ${action.payload.refresh}`);
            if(action.payload.refresh){
                state.productSearchList.results.length = 0;
            }
            if(action.payload.count == 0){
                state.productSearchList.results.length = 0;
            }
            state.productSearchList.results.push(...action.payload.results)
        }

        return {
            ...state,
            productSearchList: {
                results: state.productSearchList.results,
                count: action.payload.count,
                page: action.payload.page ?? state.productSearchList.page,
                refresh: action.payload.refresh ?? state.productSearchList.refresh,
                loading: action.payload.loading ?? state.productSearchList.loading,
                loadmore: action.payload.loadmore ?? state.productSearchList.loadmore,
            } as RootArray<Product>
        };
    }
    // detail
    if(action.type === PRODUCT_DETAIL){
        // console.log('aaa', action.payload.result)
        return {
            ...state,
            productDetail: {
                result: action.payload.result
            } as RootObject<Product>
        }
    }
    if(action.type === PRODUCT_QUANTITY_STATISTIC){
        // console.log('ss', action.payload.result)
        return {
            ...state,
            productQuantityStatistic: {
                result: action.payload.result
            } as RootObject<ProductStatistic>
        }
    }
    return state;
}
