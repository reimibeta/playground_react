import React from "react";

interface Props {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
    children?: React.ReactNode
}

const Padding: React.FC<Props> = ({
    left, 
    right, 
    top, 
    bottom, 
    children
}) => {

    return (
        <div style={{
            paddingLeft: left,
            paddingRight: right,
            paddingTop: top,
            paddingBottom: bottom
        }}>
            {children}
        </div>
    );
}

export default Padding;