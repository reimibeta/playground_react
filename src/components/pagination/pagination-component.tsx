import React, { useEffect, useState } from "react";
import { PaginationControl } from "./src/pagination-control";

const PaginationComponent = (props: {
    page: number,
    total: number,
    ellipsis?: number,
    limit?: number,
    changePage: (page: number) => void
}) => {

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

export default PaginationComponent;