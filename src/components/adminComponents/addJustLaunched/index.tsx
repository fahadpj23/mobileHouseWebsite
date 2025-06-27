import { FC, useEffect } from "react";

// import { AddBanners } from "store/slice/products/productSlice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import {
  addJustLaunched,
  fetchJustLaunched,
} from "store/slice/justLaunchedSlice";

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
  const { successMessage } = useAppSelector((state) => state.user.justLaunched);
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("series", values.series);
    values.images.forEach((image: any) => {
      formData.append("images", image);
    });
    dispatch(addJustLaunched(formData));
  };

  useEffect(() => {
    if (successMessage) {
      dispatch(fetchJustLaunched());
      handleAddButton();
    }
  }, [successMessage]);

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
