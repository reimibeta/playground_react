import React from "react";
import { useLocation } from "react-router-dom";
import NavLink from "../../components/nav/navlink";
import { customerRoute, dashboardRoute, orderRoute } from "../../routes";
import { Auth } from "../../models/auth/auth";
import { connect } from "react-redux";
import { checkAuth } from "../../apps/auth/checkAuth";

const checkCollaped = (locationPath: string, routes: Array<string>) => {
    if(routes.includes(locationPath)) return true;
    return false;
}

interface Props {
    auth: Auth;
}

const Sidenav: React.FC<Props> = ({
    auth
}) => {

    const location = useLocation();

    const checkCollapedOrder = checkCollaped(location.pathname, [orderRoute.orderList.path, orderRoute.orderPendingList.path, orderRoute.orderCompletedList.path, orderRoute.orderUnpaidList.path]);

    return (
        <>
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            {/* dashboard */}
                            <div className="sb-sidenav-menu-heading">ផ្ទាំងគ្រប់គ្រង</div>
                            <NavLink route={dashboardRoute.dashboard.path} locationPath={location.pathname} title="ផ្ទាំងគ្រប់គ្រង" />
                            {/* order */}
                            <div className="sb-sidenav-menu-heading">គ្រប់គ្រងទូទៅ</div>
                            <a className={checkCollapedOrder ? "nav-link" : "nav-link collapsed"} href="#" data-bs-toggle="collapse" data-bs-target="#collapseOrders" aria-expanded={checkCollapedOrder ? "true" : "false"} aria-controls="collapseOrders">
                                បញ្ជារទិញ
                                <div className="sb-sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </a>
                            <div className={checkCollapedOrder ? "collapse show" : "collapse"} id="collapseOrders" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <NavLink route={orderRoute.orderList.path} locationPath={location.pathname} title="ការទិញទាំងអស់" />
                                    <NavLink route={orderRoute.orderPendingList.path} locationPath={location.pathname} title="ការទិញកំពុងធ្វើ" />
                                    <NavLink route={orderRoute.orderCompletedList.path} locationPath={location.pathname} title="ការទិញរួចរាល់" />
                                    <NavLink route={orderRoute.orderUnpaidList.path} locationPath={location.pathname} title="ការទិញអត់ទាន់គិតលុយ" />
                                </nav>
                            </div>
                            {/* customer */}
                            <div className="sb-sidenav-menu-heading">អតិថិជន</div>
                            <NavLink route={customerRoute.customerList.path} locationPath={location.pathname} title="អតិថិជន" />
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {checkAuth(auth) && auth.user ? auth.user.name : '-'}
                    </div>
                </nav>
            </div>
        </>
    );
}

const mapStateToProps = (state: {
    auths: { auth: Auth }
}) => {
    return {
        auth: state.auths.auth
    }
}

export default connect(mapStateToProps, {})(Sidenav);