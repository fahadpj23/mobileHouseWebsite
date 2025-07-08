import { FC, useEffect } from "react";

import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addwhatsappAds } from "store/slice/whatsappAdsSlice";

interface props {
  handleForm: any;
  isAddModalOpen: boolean;

  formFields?: any;
  validationSchema?: any;
  initialValues?: any;
}
const AddBanner: FC<props> = ({
  handleForm,
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
    dispatch(addwhatsappAds(formData));
  };

  return (
    <div>
      <DynamicForm
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        handleForm={handleForm}
        isAddModalOpen={isAddModalOpen}
      />
    </div>
  );
};

export default AddBanner;
