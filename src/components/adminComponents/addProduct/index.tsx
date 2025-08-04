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

  const handleImageUpload = async (files: any) => {
    try {
      const file = files[0].images[0];

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64Image: any = reader.result;
        const response = await axios.post(
          "/.netlify/functions/upload",
          `image=${encodeURIComponent(base64Image)}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // newImages.push(response.data.imageUrl);
        // newPreviews.push(response.data.imageUrl);

        // setFormData({ ...formData, images: newImages });
        // setPreviewImages(newPreviews);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
    }
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const productData = values;

      const url = "/.netlify/functions/products";
      const method = "POST";
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
    // console.log(values);
    // const formData = new FormData();
    // formData.append("productName", values.productName);
    // formData.append("brand", values.brand);
    // formData.append("variants", JSON.stringify(values.variants));
    // formData.append("seriesId", values.seriesId);
    // formData.append("networkType", values.networkType);
    // formData.append("category", values.category);
    // formData.append("display", values.display);
    // formData.append("rating", values.rating);
    // formData.append("frontCamera", values.frontCamera);
    // formData.append("launchDate", values.launchDate);
    // formData.append("colors", JSON.stringify(values.colors));
    // formData.append("rearCamera", values.rearCamera);
    // formData.append("battery", values?.battery);
    // formData.append("os", values.os);
    // formData.append("processor", values.processor);
    // formData.append("description", values.description);
    // values?.colors?.map((color: any) => {
    //   color?.images?.map((colorDetails: any) => {
    //     formData.append("images", colorDetails);
    //   });
    // });
    // // values.color.images.forEach(imageFile => {
    // //   formData.append('images', imageFile);
    // // });

    // editId
    //   ? dispatch(editProduct({ data: formData, editId }))
    //   : dispatch(addproducts(formData));
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
