import { HOST_API } from "./hostApi";

const expand = '?expand=product_image,product_type.type,product_brand.brand,product_category.category,product_category.subcategory,product_store.store,product_price.currency,product_quantity';

export const productApi = (props: { page: any, filter?: string, orderBy?: string }) => {
    var url = HOST_API + '/view/api/products/product/' + expand;
    if(props.orderBy){
        url = url + '&order_by=' + props.orderBy
    }
    if(props.filter){
        url = url + '&' + props.filter
    }
    return url + '&page=' + props.page;
}

export const productDetailApi = (id: number) => {
    return HOST_API + '/view/api/products/product/' + id + '/' + expand;
}

export const productQuantityStatistic = (props: { year: number, productId?: number }) => {
    var url = HOST_API + '/view/chart/products/product_chart/quantity/?year=' + props.year;
    if(props.productId){
        url = url + "&product=" + props.productId
    }
    return url;
}
