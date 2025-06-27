import { FC, useEffect } from "react";

// import { AddBanners } from "store/slice/products/productSlice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addBanners, fetchBanners } from "store/slice/bannerSlice";
import { ToastContainer } from "react-toastify";
import { showToast } from "utils/toast";

interface props {
  handleAddButton: any;
  isAddModalOpen: boolean;

  formFields?: any;
  validationSchema?: any;
  initialValues?: any;
}
const AddBanner: FC<props> = ({
  handleAddButton,
  isAddModalOpen,
  formFields,
  validationSchema,
  initialValues,
}) => {
  const dispatch = useAppDispatch();
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("series", values.series);
    values.images.forEach((image: any) => {
      formData.append("images", image);
    });

    dispatch(addBanners(formData));
  };

  return (
    <div>
      <DynamicForm
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        handleAddButton={handleAddButton}
        isAddModalOpen={isAddModalOpen}
      />
    </div>
  );
};

export default AddBanner;
