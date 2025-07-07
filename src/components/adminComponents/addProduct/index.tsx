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
    console.log(values);
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("brand", values.brand);
    formData.append("variants", JSON.stringify(values.variants));
    formData.append("series", values.series);
    formData.append("networkType", values.networkType);
    formData.append("category", values.category);
    formData.append("display", values.display);
    formData.append("rating", values.rating);
    formData.append("frontCamera", values.frontCamera);
    formData.append("launchDate", values.launchDate);
    formData.append("colors", JSON.stringify(values.color));
    formData.append("rearCamera", values.rearCamera);
    formData.append("battery", values?.battery);
    formData.append("os", values.os);
    formData.append("processor", values.processor);
    values?.color?.map((color: any) => {
      color?.images?.map((colorDetails: any) => {
        formData.append("images", colorDetails);
      });
    });
    // values.color.images.forEach(imageFile => {
    //   formData.append('images', imageFile);
    // });

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
