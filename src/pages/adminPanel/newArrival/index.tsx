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
import { fetchNewArrivals } from "store/slice/newArrivalSlice";
// import NewArrival from "@components/Home/newArrival";

const NewArrival = () => {
  const dispatch = useAppDispatch();
  const { entities, entity } = useAppSelector((state) => state.user.newArrival);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, []);

  const handleAddButton = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = (id: number) => {
    setEditId(id);
    // dispatch(getProductById(id));
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
      <Header title="NewArrival" handleAddButton={handleAddButton} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={NewArrivalTableHead}
          TableData={entities}
          handleEdit={handleEdit}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddNewArrival
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
export default NewArrival;
