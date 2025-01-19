import React, { CSSProperties } from "react";

interface CardComponentProps {
    header: string,
    children: JSX.Element,
    style?: CSSProperties,
}

const CardComponent = (props: CardComponentProps) => {

    return (
        <>
            <div className="card" style={props.style}>
                {/* ps-2 */}
                <div className="card-header">{props.header}</div>
                {/* p-0 */}
                <div className="card-body">{props.children}</div>
            </div>
        </>
    );
}

export default CardComponent;