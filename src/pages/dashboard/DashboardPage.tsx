import React, { useEffect } from "react";
import Layout from "../../layouts/layout";
import { Col, Row } from "react-bootstrap";
import CardComponent from "../../components/card/card-component";
import OrderRevenueChart from "./components/OrderRevenueChart";
import OrderRateChart from "./components/OrderRateChart";
import OrderTable from "../order/list/tables/OrderTable";
import { orderRoute } from "../../routes";
import Margin from "../../components/utils/margin";

interface Props {}

const DashboardPage: React.FC<Props> = ({

}) => {

    return (
        <Layout>
            <>
                <Row>
                    <Col sm={8}>
                        <CardComponent header="តារាងលក់">
                            <OrderRevenueChart />
                        </CardComponent>
                    </Col>
                    <Col sm={4}>
                        <CardComponent header="តារាងលក់">
                            <OrderRateChart />
                        </CardComponent>
                    </Col>
                </Row>
                <Margin top={20} />
                <Row>
                    <Col sm={12}>
                        {/* remake with 12 rows of records */}
                        <OrderTable 
                            route={orderRoute.orderList.path}
                            type="all"
                        />
                    </Col>
                </Row>
            </>
        </Layout>
    );
}



export default DashboardPage;