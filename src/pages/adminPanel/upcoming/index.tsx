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
  const { entities, entity, successMessage } = useAppSelector(
    (state) => state.user.upcoming
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchUpcoming());
  }, []);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = (id: number) => {
    setEditId(id);
    // dispatch(getProductById(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUpcoming(id));
  };

  //   useEffect(() => {
  //     if (entity !== null && entity?.id) {
  //       setValues(entity);
  //       setIsEdit(true);
  //     } else setValues(initialValues);
  //   }, [entity]);
  //   console.log(values);
  useEffect(() => {
    if (successMessage) {
      handleForm();
      showToast();
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
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddUpcoming
          handleForm={handleForm}
          isAddModalOpen={isAddModalOpen || isEdit}
          formFields={formFields}
          validationSchema={validationSchema}
          initialValues={values}
        />
      )}
    </div>
  );
};
export default Upcoming;
