import axios from "axios";
import { RequestInterface } from "./interfaces/request.interface";


export const put = <T>(
    url: string,
    params: any,
    headers: any,
    props: RequestInterface<T>,
) => {

    if (props.onStart) props.onStart();

    axios.put<T>(
        url, 
        params,
        {headers}
    ).then(response => {
        // console.log(response.data);
        if(props.onResponse) props.onResponse(response.data)
        // finish
        if(props.onFinish) props.onFinish();

    }).catch(error => {
        // error
        if(props.onError) props.onError(error);
    });
}