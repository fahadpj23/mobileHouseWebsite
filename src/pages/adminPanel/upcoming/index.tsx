import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addUpcoming/formFields";
import { validationSchema } from "components/adminComponents/addUpcoming/validationSchema";
import { initialValues } from "components/adminComponents/addUpcoming/initialValue";
import Header from "components/adminComponents/header";
import { useEffect, useState } from "react";
import AddUpcoming from "components/adminComponents/addUpcoming";
import { deleteUpcoming, fetchUpcoming } from "store/slice/upcomingSlice";
import { UpcomingTableHead } from "constants/admin/tableHead/upcoming";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";

const Upcoming = () => {
  const dispatch = useAppDispatch();
  const { entities, deleteMessage, successMessage } = useAppSelector(
    (state) => state.user.upcoming
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);

  useEffect(() => {
    dispatch(fetchUpcoming());
  }, []);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  const handleDelete = (id: number) => {
    dispatch(deleteUpcoming(id));
  };

  useEffect(() => {
    if (deleteMessage) {
      showToast(deleteMessage);
      dispatch(fetchUpcoming());
    }
  }, [deleteMessage]);

  useEffect(() => {
    if (successMessage) {
      handleForm();
      showToast(successMessage);
      dispatch(fetchUpcoming());
    }
  }, [successMessage]);
  return (
    <div>
      <ToastContainer />
      <Header title="Upcoming" handleForm={handleForm} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={UpcomingTableHead}
          TableData={entities}
          handleDelete={handleDelete}
        />
      )}
      {isAddModalOpen && (
        <AddUpcoming
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
export default Upcoming;
