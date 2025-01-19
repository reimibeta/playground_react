import { HOST_API } from "./hostApi";

const expand = '?expand=order_note,order_store.store.manager,order_seller.seller,order_customer.customer.customer_phone,order_product.product.product_image,order_product.product.product_type,order_product.product.product_brand,order_product.product.product_category,order_product.product.product_store,order_product.product.product_price,order_product.product.product_attribute,order_product.currency,order_product.supplier,order_payment.payment_type,order_delivery.deliver,order_delivery.currency';

export const orderApi = (props: { page: any, status?: string, order_by?: string, filter?: string, extra?: string }) => {
    var url = HOST_API + '/view/api/orders/order/' + expand + '&page=' + props.page;
    if(props.status){
        url = url + '&status=' + props.status;
    }
    if(props.order_by){
        url = url + '&order_by=' + props.order_by;
    }
    if(props.filter){
        url = url + '&search=' + props.filter;
    }
    if(props.extra){
        url = url + props.extra;
    }
    return url;
}

export const orderDetailApi = (props: {orderId: number}) => {
    var url = HOST_API + '/view/api/orders/order/' + props.orderId + '/';
    return url + expand;
}

// statistics
export const orderRevenueStatisticApi = (props: { year: any, storeId?: number, productId?: number }) => {
    var url = HOST_API + '/view/chart/orders/order_chart/?year=' + props.year
    if(props.storeId) url = url + '&store=' + props.storeId;
    if(props.productId) url = url + '&product=' + props.productId;
    return url;
}

export const orderRateStatisticApi = (props: { year: any, storeId?: number, productId?: number }) => {
    var url = HOST_API + '/view/chart/orders/order_payment_chart/?year=' + props.year
    if(props.storeId) url = url + '&store=' + props.storeId;
    if(props.productId) url = url + '&product=' + props.productId;
    return url;
}
