import { FC, useEffect } from "react";

// import { AddBanners } from "store/slice/products/productSlice";
import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addBanners } from "store/slice/bannerSlice";

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
    console.log(values)
    dispatch(addBanners(values));
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
