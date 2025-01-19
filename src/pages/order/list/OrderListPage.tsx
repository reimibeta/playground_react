import React from "react";
import OrderLayout from "../OrderLayout";
import { orderRoute } from "../../../routes";
import OrderTable from "./tables/OrderTable";

interface Props {}

const OrderAllListPage: React.FC<Props> = ({}) => {

    return (
      <OrderLayout breadcrumb="ទាំងអស់">
        <OrderTable 
          route={orderRoute.orderList.path}
          type="all"
          enableSearch
          enablePagination
        />
      </OrderLayout>
    );
}
export default OrderAllListPage;