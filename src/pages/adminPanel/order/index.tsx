import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import TableData from "components/adminComponents/table";

import { useEffect, useState } from "react";

import { CustomerOrderTableHead } from "constants/admin/tableHead/customerOrder";

import { ToastContainer } from "react-toastify";
import { fetchCustomerOrder } from "store/slice/customerOrderSlice";
import { useScreenSize } from "hooks/useScreenSize";
import OrderCard from "./orderMobileView";

const Order = () => {
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector((state) => state.user.customerOrder);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    dispatch(fetchCustomerOrder());
  }, []);
  console.log(entities);
  return (
    <div>
      <ToastContainer />
      {/* <Header title="Upcoming" handleForm={handleForm} /> */}
      {isMobile
        ? Array.isArray(entities) && <OrderCard entities={entities} />
        : Array.isArray(entities) && (
            <TableData
              TableHead={CustomerOrderTableHead}
              TableData={entities}
              handleDelete={() => {}}
            />
          )}
    </div>
  );
};
export default Order;
