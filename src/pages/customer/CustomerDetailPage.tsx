import React, { useEffect } from "react";
import CustomerLayout from "./CustomerLayout";
import { useSearchParams } from "react-router-dom";
import { dispatchCustomerDetail } from "../../redux/actions/customer/customerAction";
import { RequestInterface } from "../../apps/request/interfaces/request.interface";
import { RootObject } from "../../models/general/root";
import { Customer } from "../../models/general/customer/customer";
import { connect } from "react-redux";
import Margin from "../../components/utils/margin";
import CardComponent from "../../components/card/card-component";
import { capitalizeFirstLetter } from "../../apps/string/capitalize";
import { Col, Row, Table } from "react-bootstrap";
import CustomerPurchaseChart from "./components/CustomerPurchaseChart";
import CustomerPurchaseQuantityChart from "./components/CustomerPurchaseQuantityChart";

interface Props {
    dispatchCustomerDetail: (id: number, props: RequestInterface<RootObject<Customer>>) => void,
    customerDetail: RootObject<Customer>
}

const CustomerDetailPage: React.FC<Props> = ({
    dispatchCustomerDetail,
    customerDetail
}) => {

    const [params, setParams] = useSearchParams();

    useEffect(() => {
        dispatchCustomerDetail(Number(params.get('id')), {
            onResponse(data) {
                // console.log(data)
            },
            onError(error) {
                // console.log(error)
            },
        });
    }, []);

    return (
        <CustomerLayout 
            breadcrumb="ព័តមាន"
        >
            {customerDetail && customerDetail.result ? <Margin bottom={15}>
                <CardComponent header="ព័តមាន">
                    <>
                        <Table bordered responsive className="m-0">
                            <tbody>
                                <tr>
                                    <td width={'25%'}>ឈ្មោះ</td>
                                    <td>{capitalizeFirstLetter(customerDetail.result.name)}</td>
                                </tr>

                                <tr>
                                    <td width={'25%'}>ប្រភេទ</td>
                                    <td>{capitalizeFirstLetter(customerDetail.result.priority)}</td>
                                </tr>

                                <tr>
                                    <td width={'25%'}>ស្ថានភាព</td>
                                    <td>{capitalizeFirstLetter(customerDetail.result.status == true ? 'active' : 'unactive')}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                </CardComponent>
                <Margin top={15} />
                <CardComponent header="ទំនាក់ទំនង">
                    <>
                        <Table bordered responsive className="m-0">
                            <tbody>
                                <tr>
                                    <td rowSpan={customerDetail.result.customer_phone.length > 0 ? customerDetail.result.customer_phone.length + 1 : 0} width={'25%'}>ទូរស័ព្ទ</td>
                                </tr>
                                {customerDetail.result.customer_phone.length > 0 ? customerDetail.result.customer_phone.map((phone) => {
                                    return (
                                        <tr key={phone.id}>
                                            <td>{phone.phone}</td>
                                        </tr>
                                    );
                                }) : <tr><td>-</td></tr>}
                            </tbody>
                        </Table>
                    </>
                </CardComponent>
                {/* customer purchase */}
                <Row>
                    <Col sm={6}>
                        <Margin top={15}>
                            <CardComponent header="ផ្ទាំងវិភាគទិញ">
                                <CustomerPurchaseChart customerId={customerDetail.result.id} />
                            </CardComponent>
                        </Margin>
                    </Col>
                    <Col sm={6}>
                        <Margin top={15}>
                            <CardComponent header="ផ្ទាំងវិភាគចំនួនទិញ">
                                <CustomerPurchaseQuantityChart customerId={customerDetail.result.id} />
                            </CardComponent>
                        </Margin>
                    </Col>
                </Row>
            </Margin> : <></>}
        </CustomerLayout>
    );
}

const mapStateToProps = (
    state: {
        customers: {
            customerDetail: RootObject<Customer>
        }
    }
) => {
    return {
        customerDetail: state.customers.customerDetail
    }
}

export default connect(mapStateToProps, { dispatchCustomerDetail })(CustomerDetailPage);