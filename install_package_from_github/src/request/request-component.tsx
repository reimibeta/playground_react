import React, { useEffect, useState } from "react";
import { request } from "request-dispatch";
import { HelloWorld } from "simple-request";

const RequestComponent = () => {

    const [count, setCount] = useState(0);
    const [c, setC] = useState<Array<number>>([]);

    useEffect(() => {
        HelloWorld();
        // console.log('count', count)
        request.get<any>('http://server.pcrpallet.com/view/api/orders/order/', {
            onResponse(data) {
                setCount(data.count);
                console.log('data', data);
                setC(i => [...i, 1])
            },
            onError(error) {
                console.log('error', error)
            },
        })
    }, []);

    return (
        <div>
            <div>{count}</div>
            <div>Count: {c.length}</div>
        </div>
    );
}

export default RequestComponent;