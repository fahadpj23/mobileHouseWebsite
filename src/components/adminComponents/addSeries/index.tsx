import { FC, useEffect } from "react";

// import { AddSeriess } from "store/slice/products/productSlice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import { addSeries, fetchSeries } from "store/slice/seriesSlice";

interface props {
  handleAddButton: any;
  isAddModalOpen: boolean;

  formFields?: any;
  validationSchema?: any;
  initialValues?: any;
}
const AddSeries: FC<props> = ({
  handleAddButton,
  isAddModalOpen,
  formFields,
  validationSchema,
  initialValues,
}) => {
  const dispatch = useAppDispatch();
  const { successMessage } = useAppSelector((state) => state.user.series);

  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("seriesName", values.seriesName);
    dispatch(addSeries(formData));
  };

  useEffect(() => {
    if (successMessage) {
      dispatch(fetchSeries());
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

export default AddSeries;
