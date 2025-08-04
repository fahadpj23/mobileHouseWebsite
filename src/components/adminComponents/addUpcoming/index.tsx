import { FC } from "react";

// import { AddBanners } from "store/slice/products/productSlice";
import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addUpcoming } from "store/slice/upcomingSlice";

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
    // const formData = new FormData();
    // formData.append("seriesId", values.seriesId);
    // formData.append("image", values.image);
    // values.images.forEach((image: any) => {
    //   formData.append("images", image);
    // });
    dispatch(addUpcoming(values));
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
