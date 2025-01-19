import React, { useEffect, useState } from "react";
import CustomerLayout from "./CustomerLayout";
import { dispatchCustomerList, CustomerRequestListInterface } from "../../redux/actions/customer/customerAction";
import { RootArray } from "../../models/general/root";
import { Customer } from "../../models/general/customer/customer";
import { connect } from "react-redux";
import TableComponent from "../../components/table/table-component";
import { Nav } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { capitalizeFirstLetter } from "../../apps/string/capitalize";
import { customerRoute } from "../../routes";

interface Props {
    dispatchCustomerList: (props: CustomerRequestListInterface<RootArray<Customer>>) => void,
    customerList: RootArray<Customer>
}

const CustomerPage: React.FC<Props> = ({
    dispatchCustomerList,
    customerList
}) => {

    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    const [loading, setLoading] = useState(false);
    // const [total, setTotal] = useState(0);
    // const [data, setData] = useState<RootArray<Customer>>();
    const filter = params.get("filter") === null ? '' : params.get('filter');

    const fetch = (props: {
        page: number,
        refresh: boolean,
        loadmore: boolean,
        filter: string
    }) => {
        dispatchCustomerList({
            onStart() {
                setLoading(true);
            },
            onResponse(data) {
                // console.log(data)
                // setTotal(data.count);
                // setData(data);
                setLoading(false);
            },
            onError(error) {
                console.log('error', error)
                setLoading(false);
            },
            page: props.page,
            refresh: props.refresh,
            loadmore: props.refresh,
            filter: props.filter,
        });
    }

    useEffect(() => {
        if(customerList && customerList.results){

        } else {
            fetch({
                page: 1,
                refresh: true,
                loadmore: false,
                filter: ''
            });
        }
    }, []);

    return (
        <CustomerLayout breadcrumb="តារាងអតិថិជន">
            <TableComponent 
                limit={25}
                enableSearch={true}
                enablePagination={true}
                filter={filter ?? ''}
                placeHolder="ស្វែងរក"
                // data={data?.results ?? []}
                data={customerList?.results}
                headers={[
                    'name', 
                    'type',
                    'status',
                    'date'
                ]}
                onColumns={(item) => {
                    if(item){
                        return [
                            <Nav.Link as={Link} to={customerRoute.customerDetail.path + "/?id=" + item.id} style={{ color: '#0d6efd'}}>{item.name}</Nav.Link>,
                            capitalizeFirstLetter(item.priority),
                            item.status == true ? 'active' : 'unactive',
                            item.created_date
                        ]
                    } else {
                        return []
                    }
                }}
                loading={loading}
                page={Number(params.get('page'))}
                changePage={(page) => {
                    navigate(customerRoute.customerList.path + '?page=' + page + '&filter=' + filter);
                    fetch({
                        page: page,
                        refresh: true,
                        loadmore: false,
                        filter: filter ?? ''
                    });
                }}
                // total={total}
                total={customerList?.count}
                onSubmit={(value) => {
                    navigate(customerRoute.customerList.path + '?page=' + 1 + '&filter=' + value);
                    fetch({
                        page: 1,
                        refresh: true,
                        loadmore: false,
                        filter: value
                    });
                }}
            />
        </CustomerLayout>
    );
}

const mapStateToProps = (
    state: {
        customers: {
            customerList: RootArray<Customer>
        }
    }
) => {
    return {
        customerList: state.customers.customerList
    }
}

export default connect(mapStateToProps, { dispatchCustomerList })(CustomerPage);