import { FC } from "react";

import { addproducts } from "store/slice/productSlice";
import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";

interface props {
  handleAddButton: any;
  isAddModalOpen: boolean;

  formFields?: any;
  validationSchema?: any;
  initialValues?: any;
}
const AddProduct: FC<props> = ({
  handleAddButton,
  isAddModalOpen,
  formFields,
  validationSchema,
  initialValues,
}) => {
  const dispatch = useAppDispatch();
  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("brand", values.brand);
    formData.append("ram", values.ram);
    formData.append("storage", values.storage);
    formData.append("price", values.price);
    formData.append("mrp", values.mrp);
    formData.append("series", values.series);
    formData.append("networkType", values.networkType);
    formData.append("category", values.category);
    formData.append("display", values.display);
    formData.append("rating", values.rating);
    formData.append("frontCamera", values.frontCamera);
    formData.append("launchDate", values.launchDate);
    formData.append("color", values.color);
    formData.append("rearCamera", values.rearCamera);
    formData.append("battery", values?.battery);
    formData.append("os", values.os);
    formData.append("processor", values.processor);
    values.images.forEach((image: any) => {
      formData.append("images", image);
    });
    dispatch(addproducts(formData));
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

export default AddProduct;
