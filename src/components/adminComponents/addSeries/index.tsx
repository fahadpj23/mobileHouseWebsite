import { FC } from "react";

// import { AddSeriess } from "store/slice/products/productSlice";
import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addSeries } from "store/slice/seriesSlice";

interface props {
  handleForm: any;
  isAddModalOpen: boolean;

  formFields?: any;
  validationSchema?: any;
  initialValues?: any;
}
const AddSeries: FC<props> = ({
  handleForm,
  isAddModalOpen,
  formFields,
  validationSchema,
  initialValues,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("seriesName", values.seriesName);
    dispatch(addSeries(formData));
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

export default AddSeries;
