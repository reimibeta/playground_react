import React from "react";
import Layout from "../../layouts/layout";
import { connect } from "react-redux";

interface Props {
    // breadcrumb: string,
    children: JSX.Element
}

const AccountLayout: React.FC<Props> = ({ 
    // breadcrumb,
    children
}) => {

    return (
        <>
            <Layout
                main={{ 
                    title: 'គ្រប់គ្រងគណនីយ',
                    breadcrumb: [
                        {
                            name: 'គណនីយ',
                            active: true
                        },
                        // {
                        //     name: breadcrumb,
                        //     active: true
                        // }
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

export default AccountLayout;