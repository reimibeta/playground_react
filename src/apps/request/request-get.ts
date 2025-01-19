import axios from "axios";
import { RequestInterface, RequestListInterface } from "./interfaces/request.interface";
import { RootArray, RootObject } from "../../models/general/root";

export const get = <T>(url: string, props: RequestInterface<T>) => {
    // start
    if (props.onStart) props.onStart();
    
    // axios
    axios.get<T>(url).then(response => {
        // finish
        if(props.onFinish) props.onFinish();
        // data
        if(props.onResponse) props.onResponse(response.data);
    
    }).catch(error => {
        // error
        if(props.onError) props.onError(error);
    });
}
// dispatch
export const getDispatchRequestListValue = <T>(data: RootArray<T> | undefined, props: RequestListInterface<RootArray<T>>) => {

    const payload = {
        results: data ? data.results : [],
        page: props.page,
        refresh: props.refresh,
        loading: props.loading,
        loadmore: props.loadmore,
        filter: props.filter,
        count: data ? data.count : 0
    }
    return payload;
}

export const getDispatchRequestValue = <T>(data: RootObject<T> | undefined) => {

    return {
        result: data
    }
}

export const getDispatchRequestList = <T extends unknown>(url: string, type: string, props: RequestListInterface<RootArray<T>>) => (dispatch: any) => {
    // clear state
    if(props.refresh) dispatch({ type: type, payload: getDispatchRequestListValue(undefined, props) });

    get<RootArray<T>>(url, {
        ...props,
        onResponse(data) {
            if(props.onResponse) props.onResponse(data);
            dispatch({ type: type, payload: getDispatchRequestListValue(data, props) });
        },
    });
}

export const getDispatchRequest = <T extends unknown>(url: string, type: string, props: RequestInterface<RootObject<T>>) => (dispatch: any) => {
    // clear state
    if(props.refresh) dispatch({ type: type, payload: getDispatchRequestValue(undefined) });

    get<RootObject<T>>(url, {
        ...props,
        onResponse(data) {
            if(props.onResponse) props.onResponse(data);
            dispatch({ type: type, payload: getDispatchRequestValue(data) });
        },
    });
}
