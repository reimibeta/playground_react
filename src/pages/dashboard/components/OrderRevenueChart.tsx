import React, { useEffect } from "react";
import { connect } from "react-redux";
import { dispatchOrderRevenueStatistic } from "../../../redux/actions/order/statistics/orderStatisticAction";
import { RequestInterface } from "../../../apps/request/interfaces/request.interface";
import { RootObject } from "../../../models/general/root";
import { OrderStatistic } from "../../../models/general/order/order-statistic";

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    dispatchOrderRevenueStatistic: (year: any, props: RequestInterface<RootObject<OrderStatistic>>) => void,
    orderRevenueStatistic: RootObject<OrderStatistic>
}

const OrderRevenueChart: React.FC<Props> = ({
    dispatchOrderRevenueStatistic,
    orderRevenueStatistic
}) => {

    useEffect(() => {
        dispatchOrderRevenueStatistic(new Date().getFullYear(), {
            onStart() {
                
            },
            onResponse(data) {
                // console.log(data)
            },
            onError(error) {
                console.log(`error: ` + error)
            },
        });
    }, []);

    return (
        <>
            {orderRevenueStatistic && orderRevenueStatistic.result ?<Bar data={orderRevenueStatistic.result.data} />: <></> }
        </>
    );
}

const mapStateToProps = (
    state: {
        orders: {
            orderRevenueStatistic: RootObject<OrderStatistic>
        }
    }
) => {
    return {
        orderRevenueStatistic: state.orders.orderRevenueStatistic
    }
}

export default connect(mapStateToProps, { dispatchOrderRevenueStatistic })(OrderRevenueChart);