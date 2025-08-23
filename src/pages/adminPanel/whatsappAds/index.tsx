import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addWhatsappAds/formFields";
import { validationSchema } from "components/adminComponents/addWhatsappAds/validationSchema";
import { initialValues } from "components/adminComponents/addWhatsappAds/initialValue";
import Header from "components/adminComponents/header";
import { useEffect, useState } from "react";
import AddWhatsappAds from "components/adminComponents/addWhatsappAds";
import { whatsappAdsTableHead } from "constants/admin/tableHead/whatsappAds";
import {
  deleteWhatsappAds,
  fetchwhatsappAds,
} from "store/slice/whatsappAdsSlice";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";

const WhatsappAds = () => {
  const dispatch = useAppDispatch();
  const { entities, deleteMessage, successMessage } = useAppSelector(
    (state) => state.user.whatsappAds
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);

  useEffect(() => {
    dispatch(fetchwhatsappAds());
  }, []);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  useEffect(() => {
    if (successMessage) {
      handleForm();
      showToast(successMessage);
      dispatch(fetchwhatsappAds());
    }
  }, [successMessage]);

  const handleDelete = (id: number) => {
    dispatch(deleteWhatsappAds(id));
  };

  useEffect(() => {
    if (deleteMessage) {
      showToast(deleteMessage);
      dispatch(fetchwhatsappAds());
    }
  }, [deleteMessage]);

  return (
    <div>
      <ToastContainer />
      <Header title="WhatsappAds" handleForm={handleForm} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={whatsappAdsTableHead}
          TableData={entities}
          handleDelete={handleDelete}
        />
      )}
      {isAddModalOpen && (
        <AddWhatsappAds
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
export default WhatsappAds;
