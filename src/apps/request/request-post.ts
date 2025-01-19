import axios from "axios";
import { RequestInterface } from "./interfaces/request.interface";

export const post = <T>(
    url: string,
    params: any,
    props: RequestInterface<T>,
    headers?: any
) => {

    // console.log(token)
    if (props.onStart){
        props.onStart();
    }

    axios.post<T>(
        url, 
        params,
        {headers}
        // {
        //     // headers must below params
        //     headers: { Authorization: `Bearer ${token}` }
        // }
    ).then(response => {
        if(props.onResponse) props.onResponse(response.data)
        // finish
        if(props.onFinish) props.onFinish();
    }).catch(error => {
        // error
        if(props.onError) props.onError(error);
    });
}
