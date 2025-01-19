import React from "react";
import OrderLayout from "../OrderLayout";
import { orderRoute } from "../../../routes";
import OrderTable from "./tables/OrderTable";

//
interface Props {}

const OrderPendingListPage: React.FC<Props> = ({}) => {

    return (
      <OrderLayout breadcrumb={"កំពុងធ្វើ"}>
          <OrderTable 
            route={orderRoute.orderPendingList.path}
            type="pendng"
            enableSearch
            enablePagination
          />
      </OrderLayout>
    );
}

export default OrderPendingListPage;