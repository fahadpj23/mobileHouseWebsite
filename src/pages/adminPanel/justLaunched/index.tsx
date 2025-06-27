import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addJustLaunched/formFields";
import { validationSchema } from "components/adminComponents/addJustLaunched/validationSchema";
import { initialValues } from "components/adminComponents/addJustLaunched/initialValue";
import Header from "components/adminComponents/header";
import { useEffect, useState } from "react";
import AddJustLaunched from "components/adminComponents/addJustLaunched";
import { fetchJustLaunched } from "store/slice/justLaunchedSlice";
import { JustLaunchedTableHead } from "constants/admin/tableHead/justLaunched";

const JustLaunched = () => {
  const dispatch = useAppDispatch();
  const { entities, entity } = useAppSelector(
    (state) => state.user.justLaunched
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchJustLaunched());
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
      <Header title="JustLaunched" handleAddButton={handleAddButton} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={JustLaunchedTableHead}
          TableData={entities}
          handleEdit={handleEdit}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddJustLaunched
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
export default JustLaunched;
