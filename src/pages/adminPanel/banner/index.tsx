import { useAppDispatch, useAppSelector } from "hooks/useRedux";
// import {
//   fetchBanner,
//   getProductById,
// } from "store/slice/Banner/Bannerlice";
// import { useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addBanner/formFields";
import { validationSchema } from "components/adminComponents/addBanner/validationSchema";
import { initialValues } from "components/adminComponents/addBanner/initialValue";
import { BannerTableHead } from "constants/admin/tableHead/banner";
import Header from "components/adminComponents/header";
import AddBanner from "components/adminComponents/addBanner";
import { useEffect, useState } from "react";
import { deleteBanner, fetchBanners } from "store/slice/bannerSlice";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";

const Banner = () => {
  const dispatch = useAppDispatch();
  const { entities, deleteMessage, successMessage } = useAppSelector(
    (state) => state.user.banner
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);

  useEffect(() => {
    dispatch(fetchBanners());
  }, []);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  const handleDelete = (id: number) => {
    dispatch(deleteBanner(id));
  };

  useEffect(() => {
    if (successMessage) {
      showToast(successMessage);
      handleForm();
      dispatch(fetchBanners());
    }
  }, [successMessage]);

  useEffect(() => {
    if (deleteMessage) {
      showToast(deleteMessage);
      dispatch(fetchBanners());
    }
  }, [deleteMessage]);

  return (
    <div>
      <ToastContainer />
      <Header title="Banner" handleForm={handleForm} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={BannerTableHead}
          TableData={entities}
          handleDelete={handleDelete}
        />
      )}
      {isAddModalOpen && (
        <AddBanner
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
export default Banner;
