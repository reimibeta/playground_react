import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Order } from "../../models/general/order/order";
import { capitalizeFirstLetter } from "../string/capitalize";

interface Props {
    item: Order,
    onPress?: (item: Order) => void
}

export const ListViewDataItem = ({ item, onPress }: Props) => {

    return (
        <Card 
            onClick={() => onPress ? onPress(item) : null}
        style={{ 
            padding: 5, marginBottom: 5
        }}>
            <Row>
                {/* <Col xs={2}>
                    {item.order_product[0].product.product_image.length > 0 ? <Image fluid
                        src={item.order_product[0].product.product_image[0].thumbnail} 
                    /> : <div></div>}
                </Col> */}
                <Col xs={8} style={{ alignSelf: 'center' }}>
                    <h5>{item.order_product.length > 1 ? 'has ' + item.order_product.length + ' items' : item.order_product[0].product.name} {item.order_product.length == 1 ? '(' + item.order_product[0].quantity + ')' : ''}</h5>
                    <div style={{ fontSize: 15 }}>លេខបុង: #{item.receipt}</div>
                    <div style={{ fontSize: 15 }}>ថ្ងៃកាម៉ង់: {item.ordered_date}</div>
                    <div style={{ fontSize: 15 }}>ថ្ងៃយក: {item.required_date}</div>
                    <div style={{ fontSize: 15 }}>ថ្ងៃទទួល: {item.received_date}</div>
                    {/* <div style={{ 
                        color: item.order_status == 'COMPLETED' ? 'green': 'orange'
                    }}>
                        <div>{capitalizeFirstLetter(item.order_status)}</div>
                    </div>
                    <div style={{ 
                        color: item.order_payment && item.order_payment.payment_status == 'PAID' ? 'green': 'red'
                    }}>
                        <div>{item.order_payment && item.order_payment.payment_status == 'PAID' ? 'Paid': 'Unpaid'}</div>
                    </div> */}
                </Col>
                <Col xs={4}>
                    <div style={{ 
                        textAlign: 'end',
                        color: item.order_status == 'COMPLETED' ? 'green': 'orange'
                    }}>
                        <div>{capitalizeFirstLetter(item.order_status)}</div>
                    </div>
                    <div style={{ 
                        textAlign: 'end',
                        color: item.order_payment && item.order_payment.payment_status == 'PAID' ? 'green': 'red'
                    }}>
                        <div>{item.order_payment && item.order_payment.payment_status == 'PAID' ? 'Paid': 'Unpaid'}</div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
}
