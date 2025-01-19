import React, { useEffect } from "react";
import { connect } from "react-redux";
import { dispatchOrderRateStatistic } from "../../../redux/actions/order/statistics/orderStatisticAction";
import { RequestInterface } from "../../../apps/request/interfaces/request.interface";
import { RootObject } from "../../../models/general/root";
import { OrderStatistic } from "../../../models/general/order/order-statistic";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    dispatchOrderRateStatistic: (year: any, props: RequestInterface<RootObject<OrderStatistic>>) => void,
    orderRateStatistic: RootObject<OrderStatistic>
}

const OrderRateChart: React.FC<Props> = ({
    dispatchOrderRateStatistic,
    orderRateStatistic
}) => {

    useEffect(() => {
        dispatchOrderRateStatistic(new Date().getFullYear(), {
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
            {orderRateStatistic && orderRateStatistic.result ?<Pie data={orderRateStatistic.result.data} />: <></> }
        </>
    );
}

const mapStateToProps = (
    state: {
        orders: {
            orderRateStatistic: RootObject<OrderStatistic>
        }
    }
) => {
    return {
        orderRateStatistic: state.orders.orderRateStatistic
    }
}

export default connect(mapStateToProps, { dispatchOrderRateStatistic })(OrderRateChart);