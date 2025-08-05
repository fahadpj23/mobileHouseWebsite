import { FC, useEffect } from "react";

import { addproducts, editProduct } from "store/slice/productSlice";
import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";
import axios from "axios";

interface props {
  handleForm: any;
  isAddModalOpen: boolean;
  editId?: number;
  formFields?: any;
  validationSchema?: any;
  initialValues?: any;
}
const AddProduct: FC<props> = ({
  handleForm,
  isAddModalOpen,
  formFields,
  validationSchema,
  initialValues,
  editId,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const productData = values;

      const url = "/.netlify/functions/products";
      const method = editId ? "PUT" : "POST";
      const response = await axios({
        method,
        url,
        data: productData,
      });
      // handleImageUpload(values?.colors);
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      console.log(false);
    }
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

export default AddProduct;
