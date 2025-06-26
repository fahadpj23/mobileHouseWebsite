import { FC } from "react";

import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addwhatsappAds } from "store/slice/whatsappAdsSlice";

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

    values.images.forEach((image: any) => {
      formData.append("images", image);
    });
    dispatch(addwhatsappAds(formData));
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
