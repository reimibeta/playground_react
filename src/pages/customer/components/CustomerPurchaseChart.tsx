import React, { useEffect } from "react";
import { dispatchCustomerPurchaseStatistic } from "../../../redux/actions/customer/customerAction";

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
import { CustomerStatistic } from "../../../models/general/customer/customer-statistic";
import { RootObject } from "../../../models/general/root";
import { RequestInterface } from "../../../apps/request/interfaces/request.interface";
import { connect } from "react-redux";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


interface Props {
    dispatchCustomerPurchaseStatistic: (year: any, customerId: any, props: RequestInterface<RootObject<CustomerStatistic>>) => void,
    customerPurchaseStatistic: RootObject<CustomerStatistic>,
    customerId: any
}

const CustomerPurchaseChart: React.FC<Props> = ({
    dispatchCustomerPurchaseStatistic,
    customerPurchaseStatistic,
    customerId
}) => {

    useEffect(() => {
        dispatchCustomerPurchaseStatistic(new Date().getFullYear(), customerId, {});
    }, []);

    return (
        <>
            {customerPurchaseStatistic && customerPurchaseStatistic.result ?<Bar data={customerPurchaseStatistic.result.data} />: <></> }
        </>
    );
}

const mapStateToProps = (
    state: {
        customers: {
            customerPurchaseStatistic: RootObject<CustomerStatistic>
        }
    }
) => {
    return {
        customerPurchaseStatistic: state.customers.customerPurchaseStatistic
    }
}

export default connect(mapStateToProps, { dispatchCustomerPurchaseStatistic })(CustomerPurchaseChart);