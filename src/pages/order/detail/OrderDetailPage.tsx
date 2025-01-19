import React, { useEffect } from "react";
import { Image, Nav, Table } from "react-bootstrap";
import { OrderRequestInterface, dispatchOrder } from "../../../redux/actions/order/orderAction";
import { RootObject } from "../../../models/general/root";
import { Order } from "../../../models/general/order/order";
import { connect } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../apps/string/capitalize";
import CardComponent from "../../../components/card/card-component";
import OrderLayout from "../OrderLayout";
import { Auth } from "../../../models/auth/auth";
import Margin from "../../../components/utils/margin";
import { customerRoute } from "../../../routes";

interface Props {
    dispatchOrder: (props: OrderRequestInterface<RootObject<Order>>) => void,
    orderDetail: RootObject<Order>,
    auth: Auth
}

const OrderDetailPage: React.FC<Props> = ({
    dispatchOrder,
    orderDetail,
    auth
}) => {

    const [params, setParams] = useSearchParams();

    useEffect(() => {
        // console.log(auth)
        if(auth.user){
          dispatchOrder({ orderId: Number(params.get("id")), refresh: true });
        }
    }, [auth]);

    return (
        <OrderLayout breadcrumb={orderDetail && orderDetail.result && orderDetail.result.receipt ? '#' + orderDetail.result?.receipt : '-'}>
          {orderDetail && orderDetail.result ? <>
              <Margin bottom={15}>
                <CardComponent header="កំណត់ចំនាំ">
                  <>
                    <Table bordered responsive className="m-0">
                      <tbody>
                        <tr>
                          <td>{orderDetail.result.order_note ? orderDetail.result.order_note.note : '-'}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                </CardComponent>
              </Margin>
              {/*  */}
              <Margin bottom={15}>
                <CardComponent header="កាលបរិច្ឆេតការម៉ង់">
                <>
                  <Table striped bordered hover responsive className="m-0">
                      <tbody>
                        <tr>
                          <td width={'25%'}>ថ្ងៃការម៉ង់</td>
                          <td>{orderDetail.result.ordered_date}</td>
                        </tr>
                        <tr>
                          <td width={'25%'}>ថ្ងៃការយក់</td>
                          <td>{orderDetail.result.required_date}</td>
                        </tr>
                        <tr>
                          <td width={'25%'}>ថ្ងៃការទទួល</td>
                          <td>{orderDetail.result.received_date}</td>
                        </tr>
                        <tr>
                          <td width={'25%'}>ប្រភេទទិញ</td>
                          <td>{capitalizeFirstLetter(orderDetail.result.order_type)}</td>
                        </tr>
                        <tr>
                          <td width={'25%'}>ស្ថានភាពការកាម៉ង់</td>
                          <td>
                            <div style={{
                                  color: orderDetail.result.order_status === 'COMPLETED' ? 'green' : orderDetail.result.order_status === 'PENDING' ? 'orange' : 'red'
                              }}
                              >{capitalizeFirstLetter(orderDetail.result.order_status)}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                </>
                </CardComponent>
              </Margin>
              {/* store */}
              <Margin bottom={15}>
                <CardComponent header="ទីតាំងលក់">
                    <>
                      <Table bordered responsive className="m-0">
                        <tbody>
                          <tr>
                            <td width={'25%'}>ហាង</td>
                            <td>{capitalizeFirstLetter(orderDetail.result.order_store.store.name)}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  </CardComponent>
              </Margin>
              {/* customer */}
              <Margin bottom={15}>
                  <CardComponent header="អតិថិជន">
                    <>
                      <Table bordered responsive className="m-0">
                        <tbody>
                          <tr>
                            <td width={'25%'}>អតិថិជន</td>
                            {/* <td>{capitalizeFirstLetter(orderDetail.result.order_customer.customer.name)}</td> */}
                            <td><Nav.Link as={Link} to={customerRoute.customerDetail.path + "?id=" + orderDetail.result.order_customer.customer.id} style={{ color: '#0d6efd'}}>{capitalizeFirstLetter(orderDetail.result.order_customer.customer.name)}</Nav.Link></td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  </CardComponent>
              </Margin>
              {/*  */}
              <CardComponent header="ផលិតផលដែលបានកាម៉ង់">
                <Table striped bordered hover responsive className="m-0">
                  <thead>
                    <tr>
                      <th>រូបភាព</th>
                      <th>ទំនិញ</th>
                      <th>ចំនួន</th>
                      <th>តំលៃ</th>
                      <th>បញ្ចុះតំលៃ</th>
                      <th>សរុប</th>
                      <th>ស្ថានភាព</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.result.order_product ? orderDetail.result.order_product.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {item.product.product_image ? <>
                              <Image src={item.product.product_image[0].thumbnail} style={{ height: 80 }} />
                            </> : <></>}
                          </td>
                          <td>{item.product.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.unit_price} {item.currency.currency}</td>
                          <td>{item.discount} {item.currency.currency}</td>
                          <td>{(Number(item.unit_price) * item.quantity).toFixed(2)} {item.currency.currency}</td>
                          <td>
                            <div
                                style={{
                                    color: item.status === 'COMPLETED' ? 'green' : item.status === 'PENDING' ? 'orange' : 'red'
                                }}
                            >{capitalizeFirstLetter(item.status)}</div>
                          </td>
                        </tr>
                      );
                    }) : <></>}
                  </tbody>
                </Table>
              </CardComponent>
              <div style={{ marginBottom: 15 }}></div>
              {/*  */}
              {orderDetail.result.order_payment ? <>
              <CardComponent header="កាលបរិច្ឆេតបង់លុយ">
                <>
                  <Table striped bordered hover responsive className="m-0">
                    <tbody>
                      <tr>
                        <td width={'25%'}>កាលបរិច្ឆេតបង់លុយ</td>
                        <td>{orderDetail.result.order_payment.payment_date}</td>
                      </tr>
                      <tr>
                        <td width={'25%'}>ប្រភេទបង់លុយ</td>
                        <td>{orderDetail.result.order_payment.payment_type.label}</td>
                      </tr>
                      <tr>
                        <td width={'25%'}>ស្ថានភាពបង់លុយ</td>
                        <td>
                          <div
                                style={{
                                    color: orderDetail.result.order_payment.payment_status === 'PAID' ? 'green' : 'red'
                                }}
                            >{capitalizeFirstLetter(orderDetail.result.order_payment.payment_status)}</div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              </CardComponent>
              <div style={{ marginBottom: 15 }}></div>
              {/*  */}
              </> : <></>}
              {orderDetail.result.order_delivery && orderDetail.result.order_delivery.length > 0 ? <>
              <CardComponent header="ការដឹកជញ្ចូន">
                <>
                  <Table striped bordered hover responsive className="m-0">
                    <thead>
                      <tr>
                        <th>អ្នកដឹក</th>
                        <th>ចំនួន</th>
                        <th>តំលៃ</th>
                        <th>ពេលដឹក</th>
                        <th>ពេលទទួល</th>
                        <th>បង់លុយ</th>
                        <th>ដឹកជញ្ជូន</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetail.result.order_delivery.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.deliver.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.cost} {item.currency.currency}</td>
                            <td>
                              {new Date(item.delivery_date).toLocaleDateString("en-US", { year: 'numeric' })}-
                              {new Date(item.delivery_date).toLocaleDateString("en-US", { month: 'numeric' })}-
                              {new Date(item.delivery_date).toLocaleDateString("en-US", { day: 'numeric' })}{' '}
                              ({new Date(item.delivery_date).toLocaleTimeString()})
                            </td>
                            {/* <td>{new Date(item.delivery_date).toDateString() + ' ' + new Date(item.delivery_date).toLocaleTimeString()}</td> */}
                            {/* <td>{new Date(item.arrived_date).toDateString() + ' ' + new Date(item.arrived_date).toLocaleTimeString()}</td> */}
                            <td>
                              {new Date(item.arrived_date).toLocaleDateString("en-US", { year: 'numeric' })}-
                              {new Date(item.arrived_date).toLocaleDateString("en-US", { month: 'numeric' })}-
                              {new Date(item.arrived_date).toLocaleDateString("en-US", { day: 'numeric' })}{' '}
                              ({new Date(item.delivery_date).toLocaleTimeString()})
                            </td>
                            <td>{capitalizeFirstLetter(item.payment_status)}</td>
                            <td>{capitalizeFirstLetter(item.delivery_status)}</td>
                          </tr>
                        );
                      })}
                      {/* <tr>
                        <td>ស្ថានភាពបង់លុយ</td>
                        <td>
                          <div
                                style={{
                                    color: orderDetail.result.order_payment.payment_status === 'PAID' ? 'green' : 'red'
                                }}
                            >{capitalizeFirstLetter(orderDetail.result.order_payment.payment_status)}</div>
                        </td>
                      </tr> */}
                    </tbody>
                  </Table>
                </>
              </CardComponent>
              <div style={{ marginBottom: 20 }}></div>
              </> : <></>}
          </> : <></>}
      </OrderLayout>
    );
}

const mapStateToProps = (
    state: {
        auths: { auth: Auth },
        orders: {
            orderDetail: RootObject<Order>
        }
    }
) => {
    return {
        auth: state.auths.auth,
        orderDetail: state.orders.orderDetail
    }
}

export default connect(mapStateToProps, { dispatchOrder })(OrderDetailPage);