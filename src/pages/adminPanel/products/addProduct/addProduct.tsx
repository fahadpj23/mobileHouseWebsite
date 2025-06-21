import { FC } from "react";

import { addproducts } from "store/slice/products/productSlice";

import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../../adminComponents/dynamicForm";
import { Modal } from "@mui/material";

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
    formData.append("frontCamera", values.frontCamera);
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
    <div className="flex space-x-3">
      <Modal
        open={isAddModalOpen}
        onClose={handleAddButton}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-white p-2 h-screen w-screen overflow-y-auto">
          <DynamicForm
            formFields={formFields}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddProduct;
