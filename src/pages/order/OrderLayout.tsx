import React from "react";
import Layout from "../../layouts/layout";

interface Props {
    breadcrumb: string,
    children: JSX.Element
}

const OrderLayout: React.FC<Props> = ({ 
    breadcrumb,
    children
}) => {

    return (
        <>
            <Layout
                main={{ 
                    title: 'គ្រប់គ្រងការបញ្ជារទិញ',
                    breadcrumb: [
                        {
                            name: 'បញ្ជារទិញ'
                        },
                        {
                            name: breadcrumb,
                            active: true
                        }
                    ]
                }}
                >
                <>
                    {children}
                </>
            </Layout>
        </>
    );
}

export default OrderLayout;