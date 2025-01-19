import React, { useState, useEffect } from "react";
import ListView from "../../components/listview/listivew";
import { Button, Container, Form } from "react-bootstrap";
import { RootArray } from "../../models/general/root";
import { Order } from "../../models/general/order/order";
import { ListViewDataItem } from "./listview-data-item";

interface Props {
    data: RootArray<Order>
    title?: string,
    onSearch?: (filter: string) => void,
    onLoadMore?: (page: number, filter: string) => void,
    onItemPress?: (item: Order) => void,
}

const ListViewData = ({
    data,
    title,
    onSearch,
    onLoadMore,
    onItemPress
}: Props) => {

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(data);
        // console.log(loading)
    }, []);

    return (
        <Container>
            {title ? <div style={{ padding: 10, textAlign: 'center' }}>
                {title}
            </div> : <></>}

            {onSearch ? <div style={{ marginTop: 5, marginBottom: 5 }}>
                <Form onSubmit={(e) =>  {
                    e.preventDefault();
                    // reset page
                    setPage(1);
                    onSearch(filter);
                }}>
                    <Form.Control type="text" placeholder="Search here." value={filter} onChange={(value) => setFilter(value.target.value) } />
                </Form>
            </div> : <></>}

            {data ? <ListView 
                data={data} 
                renderItem={(item) => {
                    return <ListViewDataItem key={item.id} item={item} onPress={onItemPress} />
                }}
            /> : <div></div>}
            
            {data && onLoadMore ? <div style={{ marginBottom: 5, textAlign: 'center' }}>
                <Button style={{ }} variant="primary" onClick={() => {
                    if(data.results.length < data.count){
                        const p = page + 1;
                        setPage(p);
                        onLoadMore(p, filter);
                        // console.log('load more: ' + p);
                    } else {
                        // console.log('reach end')
                    }
                }}>{data.results.length < data.count ? 'load more' : 'no more result'}</Button>
            </div> : <></>}
        </Container>
    );
}

export default ListViewData;