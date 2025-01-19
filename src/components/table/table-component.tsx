import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { PaginationControl } from "../pagination/src/pagination-control";

interface SearchProps {
    filter: string,
    placeHolder?: string,
    onSubmit: (value: string) => void
}

const Search = (props: SearchProps) => {

    const [filter, setFilter] = useState('');

    useEffect(() => {
        setFilter(props.filter);
    }, []);

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit(filter);
          }}>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder={props.placeHolder ? props.placeHolder : "search here."} value={filter} onChange={(e) => setFilter(e.target.value) } />
            </Form.Group>
          </Form>
    );
}
// pagination
interface PaginationProps {
    page: number,
    total: number,
    ellipsis?: number,
    limit?: number,
    changePage: (page: number) => void
}

const Pagination = (props: PaginationProps) => {

    return (
        <>
            <PaginationControl
                page={props.page}
                between={3}
                total={props.total}
                limit={props.limit ?? 10}
                changePage={props.changePage}
                ellipsis={props.ellipsis ?? 1}
            />
        </>
    );
}
//
interface TableComponentProps<T> extends SearchProps, PaginationProps {
    data: Array<T>,
    headers: Array<string>,
    loading: boolean,
    onColumns: (item: T) => Array<any>,
    enableSearch?: boolean,
    enablePagination?: boolean
}

const TableComponent = <T extends unknown>(props: TableComponentProps<T>) => {

    return (
        <>
            {/* filter */}
            {props.enableSearch && props.enableSearch == true ? <Row>
                <Col xs={{ span: 6, offset: 6 }} md={{ span: 4, offset: 8 }}>
                    <Search placeHolder={props.placeHolder ?? 'search'} filter={props.filter} onSubmit={props.onSubmit} />
                </Col>
            </Row> : <></>}
            {/* table */}
            <Row>
                <Col xs={12}>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                {props.headers.map((item, index) => {
                                    return <th key={index}>{item}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {props.data && props.data.length > 0 ? <>
                            {props.loading ? <>
                                <tr>
                                    <td colSpan={props.headers.length} style={{ textAlign: 'center' }}>loading...</td>
                                </tr>
                            </> : <></>}
                            {props.data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {props.onColumns(item).map((i, j) => {
                                            return <td key={j}>{i}</td>
                                        })}
                                    </tr>
                                );
                            })}
                            </> : <>
                                {props.loading ? <>
                                    <tr>
                                        <td colSpan={props.headers.length} style={{ textAlign: 'center' }}>loading...</td>
                                    </tr>
                                </> : <>
                                    <tr>
                                        <td colSpan={props.headers.length} style={{ textAlign: 'center' }}>no results</td> 
                                    </tr>
                                </>}
                            </>}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {/* pagination */}
            {props.enablePagination && props.enablePagination == true ? <Row>
                <Col xs={12}>
                    <Pagination 
                        page={props.page}
                        limit={props.limit}
                        total={props.total}
                        ellipsis={props.ellipsis}
                        changePage={props.changePage}
                    />
                </Col>
            </Row> : <></>}
        </>
    );
}

export default TableComponent;