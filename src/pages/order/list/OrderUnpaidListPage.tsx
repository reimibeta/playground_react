import React from "react";
import OrderLayout from "../OrderLayout";
import { orderRoute } from "../../../routes";
import OrderTable from "./tables/OrderTable";

//
interface Props {}

const OrderUnpaidListPage: React.FC<Props> = ({}) => {

    return (
      <OrderLayout breadcrumb="អត់ទាន់គិតលុយ">
        <OrderTable 
          route={orderRoute.orderUnpaidList.path}
          type="unpaid"
          enableSearch
          enablePagination
        />
      </OrderLayout>
    );
}

export default OrderUnpaidListPage;