import { HOST_API } from "./hostApi";

const expand: string = "&expand=customer_phone,seller.staff.user";
// use as function ex: orderUrl()
// export const customerURL = (id?: number) => UrlUtil(hostURL,{
//     url: "/api/customers/customer",
//     id: id,
//     expand
// });
export const customerApi = (props: { page?: any, status?: string, order_by?: string, filter?: string, extra?: string, id?: any}) => {
    const customerId = props.id ? props.id + '/' : '';
    var url = HOST_API + "/view/api/customers/customer/" + customerId + '?' + expand;
    if(props.page){
        url = url + '&page=' + props.page;
    }
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
    return url + "&priority=REGULAR";
}

// statistics
export const customerPurchaseStatisticApi = (year: any, customerId: any) => {
    return HOST_API + "/view/chart/customers/customer_chart/?year=" + year + "&customer=" + customerId;
}

export const customerQuantityPurchaseStatisticApi = (year: any, customerId: any) => {
    return HOST_API + "/view/chart/customers/customer_quantity_chart/?year=" + year + "&customer=" + customerId;
}
