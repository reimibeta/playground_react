import React, { useEffect, useState } from "react";
import TableComponent from "../../../../components/table/table-component";
import { Nav } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { RootArray } from "../../../../models/general/root";
import { Order } from "../../../../models/general/order/order";
import { capitalizeFirstLetter } from "../../../../apps/string/capitalize";
import { Auth } from "../../../../models/auth/auth";
import { connect } from "react-redux";
import { 
    OrderRequestListInterface, 
    dispatchOrderList,
    dispatchOrderCompleteList,
    dispatchOrderPendingList,
    dispatchOrderUnpaidList
} from "../../../../redux/actions/order/orderAction";
import { checkAuth } from "../../../../apps/auth/checkAuth";

interface Props {
    dispatchOrderList: (props: OrderRequestListInterface<RootArray<Order>>) => void,
    orderList: RootArray<Order>,
    dispatchOrderCompleteList: (props: OrderRequestListInterface<RootArray<Order>>) => void,
    orderCompletedList: RootArray<Order>,
    dispatchOrderPendingList: (props: OrderRequestListInterface<RootArray<Order>>) => void,
    orderPendingList: RootArray<Order>,
    dispatchOrderUnpaidList: (props: OrderRequestListInterface<RootArray<Order>>) => void,
    orderUnpaidList: RootArray<Order>,
    auth: Auth,
    route: string,
    type: 'all' | 'completed' | 'pendng' | 'paid' | 'unpaid',
    enableSearch?: boolean,
    enablePagination?: boolean
  }

const OrderTable: React.FC<Props> = ({
    dispatchOrderList, 
    orderList,
    dispatchOrderCompleteList,
    orderCompletedList,
    dispatchOrderPendingList,
    orderPendingList,
    dispatchOrderUnpaidList,
    orderUnpaidList,
    auth,
    route,
    type,
    enableSearch,
    enablePagination
}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loadmore, setLoadmore] = useState(false);
    const [refresh, setRefresh] = useState(false);
  
    const [params, setParams] = useSearchParams();
    const [total, setTotal] = useState(0);
    const [data, setData] = useState<RootArray<Order>>();
    const filter = params.get("filter") === null ? '' : params.get('filter');

    const fetch = (props: {
        page: number,
        refresh: boolean,
        loadmore: boolean,
        filter: string
      }) => {
          // console.log('filter', props.filter)
          setRefresh(props.refresh);
          setLoadmore(props.loadmore);
          setLoading(true);
          // setFilter(props.filter);
    
          if(auth.user){
            if(type == 'all'){
                dispatchOrderList({
                    onStart() {},
                    onError(error) {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    onResponse(data) {
                        // console.log(data);
                        setTotal(data.count);
                        // setPage(data.page ?? 1);
                        setData(data);
                    },
                    onFinish() {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    refresh: props.refresh,
                    loadmore: props.refresh,
                    page: props.page,
                    filter: props.filter,
                });
            } else if(type == 'completed'){
                dispatchOrderCompleteList({
                    onStart() {},
                    onError(error) {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    onResponse(data) {
                        // console.log(data);
                        setTotal(data.count);
                        // setPage(data.page ?? 1);
                        setData(data);
                    },
                    onFinish() {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    refresh: props.refresh,
                    loadmore: props.refresh,
                    page: props.page,
                    filter: props.filter,
                });
            } else if(type == 'pendng'){
                dispatchOrderPendingList({
                    onStart() {},
                    onError(error) {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    onResponse(data) {
                        // console.log(data);
                        setTotal(data.count);
                        // setPage(data.page ?? 1);
                        setData(data);
                    },
                    onFinish() {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    refresh: props.refresh,
                    loadmore: props.refresh,
                    page: props.page,
                    filter: props.filter,
                });
            } else if(type == 'paid'){

            } else if(type == 'unpaid'){
                dispatchOrderUnpaidList({
                    onStart() {},
                    onError(error) {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    onResponse(data) {
                        // console.log(data);
                        setTotal(data.count);
                        // setPage(data.page ?? 1);
                        setData(data);
                    },
                    onFinish() {
                        setRefresh(false);
                        setLoadmore(false);
                        setLoading(false);
                    },
                    refresh: props.refresh,
                    loadmore: props.refresh,
                    page: props.page,
                    filter: props.filter,
                });
            }
        }
    }

    useEffect(() => {
        // if(orderCustomerList && orderCustomerList.results && orderCustomerList.results.length > 0){
  
        // } else {
        //   if(checkAuth(auth) && auth.user){
        //     fetch({
        //         page: Number(params.get('page')) && Number(params.get('page')) !== 0 ? Number(params.get('page')) : 1,
        //         refresh: true,
        //         loadmore: false,
        //         filter: filter ?? ''
        //     });
        //   }
        // }
        // if(data && data.results){

        // } else {
        fetch({
            page: Number(params.get('page')) && Number(params.get('page')) !== 0 ? Number(params.get('page')) : 1,
            refresh: true,
            loadmore: false,
            filter: filter ?? ''
        });
        // }
    }, [auth]);

    return (
        <TableComponent 
            enableSearch={enableSearch}
            enablePagination={enablePagination}
            filter={filter ?? ''}
            placeHolder="ស្វែងរក"
            data={data?.results ?? []}
            headers={[
                'លេខបុង', 
                'ថ្ងៃការម៉ង់',
                'ថ្ងៃយក',
                'ថ្ងៃទទួល',
                'ទំនិញ',
                'អតិថិជន',
                'ស្ថានភាព',
                'បង់លុយ',
            ]}
            onColumns={(item) => {
            if(item){
                return [
                <Nav.Link as={Link} to={"/order-detail?id=" + item.id} style={{ color: '#0d6efd'}}>#{item.receipt}</Nav.Link>,
                item.ordered_date,
                item.required_date,
                item.received_date,
                item.order_product.length > 1 ? 'ទំនិញមាន ' + item.order_product.length : item.order_product[0].product.name,
                item.order_customer.customer.name,
                <div
                    style={{
                    color: item.order_status === 'COMPLETED' ? 'green' : item.order_status === 'PENDING' ? 'orange' : 'red'
                    }}
                >{capitalizeFirstLetter(item.order_status)}</div>,
                item.order_payment ? <div
                    style={{
                    color: item.order_payment ? item.order_payment.payment_status === 'PAID' ? 'green' : 'red' : 'gray'
                    }}
                >{capitalizeFirstLetter(item.order_payment.payment_status)}</div> : '-'
                ]
            } else {
                return []
            }
            }}
            loading={loading}
            // page={orderCustomerList && orderCustomerList.page ? orderCustomerList.page : 1}
            page={Number(params.get('page'))}
            changePage={(page) => {
                navigate(route + '?page=' + page + '&filter=' + filter);
                fetch({
                    page: page,
                    refresh: true,
                    loadmore: false,
                    filter: filter ?? ''
                });
            }}
            total={total}
            onSubmit={(value) => {
                navigate(route + '?page=' + 1 + '&filter=' + value);
                fetch({
                    page: 1,
                    refresh: true,
                    loadmore: false,
                    filter: value
                });
            }}
        />
    );
}


const mapStateToProps = (
    state: { 
        auths: {
          auth: Auth
        },
        orders: { 
            orderList: RootArray<Order>,
            orderCompletedList: RootArray<Order>,
            orderPendingList: RootArray<Order>,
            orderUnpaidList: RootArray<Order>,
        }
    }
  ) => {
    // console.log(state.orders.orderSearchList)
    return {
        auth: state.auths.auth,
        orderList: state.orders.orderList,
        orderCompletedList: state.orders.orderCompletedList,
        orderPendingList: state.orders.orderPendingList,
        orderUnpaidList: state.orders.orderUnpaidList
    }
}

export default connect(mapStateToProps, {
    dispatchOrderList,
    dispatchOrderCompleteList,
    dispatchOrderPendingList,
    dispatchOrderUnpaidList
})(OrderTable);