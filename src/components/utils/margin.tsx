import React from "react";

interface Props {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number,
    children?: React.ReactNode
}

const Margin: React.FC<Props> = ({
    left, 
    right, 
    top, 
    bottom, 
    children
}) => {

    return (
        <div style={{
            marginLeft: left,
            marginRight: right,
            marginTop: top,
            marginBottom: bottom
        }}>
            {children}
        </div>
    );
}

export default Margin;