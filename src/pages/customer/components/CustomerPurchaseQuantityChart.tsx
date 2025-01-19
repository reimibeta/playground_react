import React, { useEffect } from "react";
import { dispatchCustomerPurchaseQuantityStatistic } from "../../../redux/actions/customer/customerAction";

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
    dispatchCustomerPurchaseQuantityStatistic: (year: any, customerId: any, props: RequestInterface<RootObject<CustomerStatistic>>) => void,
    customerPurchaseQuantityStatistic: RootObject<CustomerStatistic>,
    customerId: any
}

const CustomerPurchaseQuantityChart: React.FC<Props> = ({
    dispatchCustomerPurchaseQuantityStatistic,
    customerPurchaseQuantityStatistic,
    customerId
}) => {

    useEffect(() => {
        dispatchCustomerPurchaseQuantityStatistic(new Date().getFullYear(), customerId, {});
    }, []);

    return (
        <>
            {customerPurchaseQuantityStatistic && customerPurchaseQuantityStatistic.result ?<Bar data={customerPurchaseQuantityStatistic.result.data} />: <></> }
        </>
    );
}

const mapStateToProps = (
    state: {
        customers: {
            customerPurchaseQuantityStatistic: RootObject<CustomerStatistic>
        }
    }
) => {
    return {
        customerPurchaseQuantityStatistic: state.customers.customerPurchaseQuantityStatistic
    }
}

export default connect(mapStateToProps, { dispatchCustomerPurchaseQuantityStatistic })(CustomerPurchaseQuantityChart);