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
import { fetchSeries } from "store/slice/seriesSlice";

const Series = () => {
  const dispatch = useAppDispatch();
  const { entities, entity } = useAppSelector((state) => state.user.series);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchSeries());
  }, []);
  console.log(entities);
  const handleAddButton = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = (id: number) => {
    setEditId(id);
    //   dispatch(getProductById(id));
  };

  //   useEffect(() => {
  //     if (entity !== null && entity?.id) {
  //       setValues(entity);
  //       setIsEdit(true);
  //     } else setValues(initialValues);
  //   }, [entity]);
  //   console.log(values);
  return (
    <div>
      <Header title="Series" handleAddButton={handleAddButton} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={SeriesTableHead}
          TableData={entities}
          handleEdit={handleEdit}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddSeries
          handleAddButton={handleAddButton}
          isAddModalOpen={isAddModalOpen || isEdit}
          formFields={formFields}
          validationSchema={validationSchema}
          initialValues={values}
        />
      )}
    </div>
  );
};
export default Series;
