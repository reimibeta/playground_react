import React from "react";
import Header from "./header/header";
import Sidenav from "./sidenav/sidenav";
import Footer from "./footer/footer";
import Main, { MainInterface } from "./main/main";

interface Props {
    main?: MainInterface,
    children: JSX.Element
}

const Layout: React.FC<Props> = ({ main, children }) => {

    return (
        <>
        {/* header */}
            <Header />
            {/*  */}
            <div id="layoutSidenav">
                {/* sidenav */}
                <Sidenav />
                <div id="layoutSidenav_content">
                    {/* main */}
                    <Main 
                        title={main?.title}
                        breadcrumb={main?.breadcrumb}   
                        content={children}
                    />
                    {/* footer */}
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Layout;