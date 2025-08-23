import { useAppDispatch, useAppSelector } from "hooks/useRedux";
// import {
//   fetchNewArrival,
//   getProductById,
// } from "store/slice/NewArrival/NewArrivallice";
// import { useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addNewArrival/formFields";
import { validationSchema } from "components/adminComponents/addNewArrival/validationSchema";
import { initialValues } from "components/adminComponents/addNewArrival/initialValue";
import Header from "components/adminComponents/header";
import { useEffect, useState } from "react";
import AddNewArrival from "components/adminComponents/addNewArrival";
import { NewArrivalTableHead } from "constants/admin/tableHead/newArrival";
import {
  deleteNewArrival,
  fetchNewArrivals,
} from "store/slice/newArrivalSlice";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";
// import NewArrival from "@components/Home/newArrival";

const NewArrival = () => {
  const dispatch = useAppDispatch();
  const { entities, deleteMessage, successMessage } = useAppSelector(
    (state) => state.user.newArrival
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, []);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  const handleDelete = (id: number) => {
    dispatch(deleteNewArrival(id));
  };

  useEffect(() => {
    if (deleteMessage) {
      showToast(deleteMessage);
      dispatch(fetchNewArrivals());
    }
  }, [deleteMessage]);

  useEffect(() => {
    if (successMessage) {
      handleForm();
      showToast(successMessage);
      dispatch(fetchNewArrivals());
    }
  }, [successMessage]);
  return (
    <div>
      <ToastContainer />
      <Header title="NewArrival" handleForm={handleForm} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={NewArrivalTableHead}
          TableData={entities}
          handleDelete={handleDelete}
        />
      )}
      {isAddModalOpen && (
        <AddNewArrival
          handleForm={handleForm}
          isAddModalOpen={isAddModalOpen}
          formFields={formFields}
          validationSchema={validationSchema}
          initialValues={values}
        />
      )}
    </div>
  );
};
export default NewArrival;
