import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addWhatsappAds/formFields";
import { validationSchema } from "components/adminComponents/addWhatsappAds/validationSchema";
import { initialValues } from "components/adminComponents/addWhatsappAds/initialValue";
import Header from "components/adminComponents/header";
import { useEffect, useState } from "react";
import AddWhatsappAds from "components/adminComponents/addWhatsappAds";
import { whatsappAdsTableHead } from "constants/admin/tableHead/whatsappAds";
import { fetchwhatsappAds } from "store/slice/whatsappAdsSlice";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";

const WhatsappAds = () => {
  const dispatch = useAppDispatch();
  const { entities, entity, successMessage } = useAppSelector(
    (state) => state.user.whatsappAds
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchwhatsappAds());
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

  useEffect(() => {
    if (successMessage) {
      handleAddButton();
      showToast();
      dispatch(fetchwhatsappAds());
    }
  }, [successMessage]);

  return (
    <div>
      <ToastContainer />
      <Header title="WhatsappAds" handleAddButton={handleAddButton} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={whatsappAdsTableHead}
          TableData={entities}
          handleEdit={handleEdit}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddWhatsappAds
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
export default WhatsappAds;
