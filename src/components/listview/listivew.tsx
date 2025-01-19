import React from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { RootArray } from "../../models/general/root";


//
interface ListViewProps<T> {
    data: RootArray<T>,
    renderItem: (item: T) => JSX.Element
}

const ListView = <T extends unknown>({ 
    data,
    renderItem,
}: ListViewProps<T>) => {

    return (
        <div>
            {data?.results.map((item: T, index: number) => {
                return renderItem(item);
            })}
        </div>
    );
}

export default ListView;