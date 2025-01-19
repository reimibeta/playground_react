import { 
    PRODUCT_LIST,
    PRODUCT_DETAIL,
    PRODUCT_STORE_LIST,
    PRODUCT_SEARCH_LIST,
    PRODUCT_QUANTITY_STATISTIC
} from "./productActionType";

import {
    productApi,
    productDetailApi,
    productQuantityStatistic
} from "../../../urls/productApi";
import { Product, ProductStatistic } from "../../../models/general/product/product";
import { RequestInterface, RequestListInterface } from "../../../apps/request/interfaces/request.interface";
import { RootArray, RootObject } from "../../../models/general/root";
import { request } from "../../../apps/request/request";

export interface ProductRequestListInterface<T> extends RequestListInterface<T> {
    storeId?: number,
    productId?: number
}

// product list
export const dispatchProductList = (props: RequestListInterface<RootArray<Product>>) => (dispatch: any) => {
    const url = productApi({ page: props.page });
    request.getDispatchRequestList(url, PRODUCT_LIST, props)(dispatch);
}

// product detail
export const dispatchProduct = (
    id: number,
    props: RequestInterface<RootObject<Product>>
) => (dispatch: any) => {
    request.getDispatchRequest(productDetailApi(id), PRODUCT_DETAIL, props)(dispatch);
}

//
export const dispatchProductStoreList = (props: ProductRequestListInterface<RootArray<Product>>) => (dispatch: any) => {
    const url = productApi({ 
        page: props.page,
        filter: 'store_id=' + props.storeId + '&' + props.filter
    });
    request.getDispatchRequestList(url, PRODUCT_STORE_LIST, props)(dispatch);
}
// search
export const dispatchProductSearchList = (props: ProductRequestListInterface<RootArray<Product>>) => (dispatch: any) => {
    const url = productApi({ 
        page: props.page,
        filter: '&search=' + props.filter
    });
    request.getDispatchRequestList(url, PRODUCT_SEARCH_LIST, props)(dispatch);
}
export const dispatchClearProductSearchList = (props: RequestListInterface<RootArray<Product>>) => (dispatch: any) => {
    dispatch({ type: PRODUCT_SEARCH_LIST, payload: request.getDispatchRequestListValue({
        results: [],
        count: 0
    }, props) });
}

// statistic
export const dispatchProductQuantityStatistic = (props: ProductRequestListInterface<RootObject<ProductStatistic>>) => (dispatch: any) => {
    const url = productQuantityStatistic({ year: new Date().getFullYear(), productId: props.productId})
    request.getDispatchRequest(url, PRODUCT_QUANTITY_STATISTIC, props)(dispatch);
}