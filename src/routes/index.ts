import accountPage from "../pages/account/AccountPage";
import customerDetailPage from "../pages/customer/CustomerDetailPage";
import customerPage from "../pages/customer/CustomerPage";
import dashboardPage from "../pages/dashboard/DashboardPage";
import { orderListPage, orderCompletedListPage, orderDetailPage, orderPendingListPage, orderUnpaidListPage } from "../pages/order";

interface RouteProps {
    path: string,
    element: any
}

export const dashboardRoute = {
    dashboard: {
        path: '/',
        element: dashboardPage
    } as RouteProps
}

export const orderRoute = {
    orderList: {
        path: '/order-list',
        element: orderListPage
    } as RouteProps,
    orderPendingList: {
        path: '/order-pending-list',
        element: orderPendingListPage
    } as RouteProps,
    orderCompletedList: {
        path: '/order-completed-list',
        element: orderCompletedListPage
    } as RouteProps,
    orderUnpaidList: {
        path: '/order-unpaid-list',
        element: orderUnpaidListPage
    } as RouteProps,
    orderDetail: {
        path: '/order-detail',
        element: orderDetailPage
    } as RouteProps,
}

// customer
export const customerRoute = {
    customerList: {
        path: '/customer-list',
        element: customerPage
    } as RouteProps,
    customerDetail: {
        path: '/customer-detail',
        element: customerDetailPage,
    } as RouteProps
}

export const accountRoute = {
    account: {
        path: '/account',
        element: accountPage
    } as RouteProps
}