import { useAppDispatch, useAppSelector } from "hooks/useRedux";
// import {
//   fetchSeries,formFields
//   getProductById,
// } from "store/slice/Series/Serieslice";
// import { useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addSeries/formFields";
import { validationSchema } from "components/adminComponents/addSeries/validationSchema";
import { initialValues } from "components/adminComponents/addSeries/initialValue";
import { SeriesTableHead } from "constants/admin/tableHead/series";
import Header from "components/adminComponents/header";
import AddSeries from "components/adminComponents/addSeries";
import { useEffect, useState } from "react";
import { deleteSeries, fetchSeries } from "store/slice/seriesSlice";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";

const Series = () => {
  const dispatch = useAppDispatch();
  const { entities, deleteMessage, successMessage } = useAppSelector(
    (state) => state.user.series
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);

  useEffect(() => {
    dispatch(fetchSeries());
  }, []);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  useEffect(() => {
    if (successMessage) {
      handleForm();
      showToast(successMessage);
      dispatch(fetchSeries());
    }
  }, [successMessage]);

  const handleDelete = (id: number) => {
    dispatch(deleteSeries(id));
  };

  useEffect(() => {
    if (deleteMessage) {
      showToast(deleteMessage);
      dispatch(fetchSeries());
    }
  }, [deleteMessage]);

  return (
    <div>
      <ToastContainer />
      <Header title="Series" handleForm={handleForm} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={SeriesTableHead}
          TableData={entities}
          handleDelete={handleDelete}
        />
      )}
      {isAddModalOpen && (
        <AddSeries
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
export default Series;
