import React from "react";
import Layout from "../../layouts/layout";

interface Props {
    breadcrumb: string,
    children: React.ReactElement
}

const CustomerLayout: React.FC<Props> = ({ breadcrumb, children }) => {

    return (
        <Layout
            main={{ 
                title: 'គ្រប់គ្រងអតិថិជន',
                breadcrumb: [
                    {
                        name: 'អតិថិជន'
                    },
                    {
                        name: breadcrumb,
                        active: true
                    }
                ]
            }}
        >
            {children}
        </Layout>
    );
}

export default CustomerLayout;