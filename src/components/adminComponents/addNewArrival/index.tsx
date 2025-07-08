import { FC } from "react";

// import { AddBanners } from "store/slice/products/productSlice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addNewArrivals } from "store/slice/newArrivalSlice";

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
  const { successMessage } = useAppSelector((state) => state.user.newArrival);
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("seriesId", values.seriesId);
    values.images.forEach((image: any) => {
      formData.append("images", image);
    });
    dispatch(addNewArrivals(formData));
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
