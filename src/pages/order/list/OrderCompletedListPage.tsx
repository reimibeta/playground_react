import React from "react";
import OrderLayout from "../OrderLayout";
import { orderRoute } from "../../../routes";
import OrderTable from "./tables/OrderTable";

//
interface Props {}

const OrderCompletedListPage: React.FC<Props> = ({}) => {

    return (
      <OrderLayout breadcrumb={"រួចរាល់"}>
        <OrderTable 
          route={orderRoute.orderCompletedList.path}
          type="completed"
          enableSearch
          enablePagination
        />
      </OrderLayout>
    );
}

export default OrderCompletedListPage;