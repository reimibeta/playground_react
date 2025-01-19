import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import { Auth } from "../models/auth/auth";
import { connect } from "react-redux";
import PageRouteProtected from "./PageRouteProtected";
import { dispatchAuthGuard } from "../redux/actions/auth/authAction";
import { OnGuardProps } from "../apps/auth/guard-auth";
import { checkAuth } from "../apps/auth/checkAuth";
import PageNotFound from "./pageNotFound/PageNotFound";
import { accountRoute, orderRoute, dashboardRoute, customerRoute } from "../routes";
// import HomeRedirectRoute from "./home-redirect-route";

const PageRoute: React.FC<{
    auth: Auth,
    dispatchAuthGuard: (token: string, props: OnGuardProps) => void
}> = ({ auth, dispatchAuthGuard }) => {

    useEffect(() => {
        // console.log(auth)
        if(checkAuth(auth)){
            dispatchAuthGuard(auth.saveToken, {
                onAuthorized(token) {
                    // console.log(token)
                    // console.log(auth)
                },
                onUnauthorized() {
                    
                },
            });
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/* home */}
                <Route path="/" element={
                    // <HomeRedirectRoute redirect={orderRoute.orderAll.path} />
                    <PageRouteProtected>
                        <dashboardRoute.dashboard.element />
                    </PageRouteProtected>
                } />
                {/* order */}
                <Route path={orderRoute.orderList.path} element={
                    <PageRouteProtected>
                        <orderRoute.orderList.element />
                    </PageRouteProtected>
                } />
                <Route path={orderRoute.orderPendingList.path} element={
                    <PageRouteProtected>
                        <orderRoute.orderPendingList.element />
                    </PageRouteProtected>
                } />
                <Route path={orderRoute.orderCompletedList.path} element={
                    <PageRouteProtected>
                        <orderRoute.orderCompletedList.element />
                    </PageRouteProtected>
                } />
                <Route path={orderRoute.orderUnpaidList.path} element={
                    <PageRouteProtected>
                        <orderRoute.orderUnpaidList.element />
                    </PageRouteProtected>
                } />
                <Route path={orderRoute.orderDetail.path} element={
                    <PageRouteProtected>
                        <orderRoute.orderDetail.element />
                    </PageRouteProtected>
                }/>
                {/* customer */}
                <Route path={customerRoute.customerList.path} element={
                    <PageRouteProtected>
                        <customerRoute.customerList.element />
                    </PageRouteProtected>
                } />
                <Route path={customerRoute.customerDetail.path} element={
                    <PageRouteProtected>
                        <customerRoute.customerDetail.element />
                    </PageRouteProtected>
                } />
                {/* account */}
                <Route path={accountRoute.account.path} element={
                    <PageRouteProtected>
                        <accountRoute.account.element />
                    </PageRouteProtected>
                }/>
                
                { checkAuth(auth) ? <>

                </> : <>
                    <Route path="/login" element={<LoginPage />} />
                </>}
                
                {/* page not found */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

const mapStateToProps = (
    state: {
        auths: {
            auth: Auth
        }
    }
) => {
    return {
        auth: state.auths.auth
    }
}

export default connect(mapStateToProps, { dispatchAuthGuard })(PageRoute);
