import { FC } from "react";

import { addproduct, editProduct } from "store/slice/productSlice";
import { useAppDispatch } from "hooks/useRedux";
import DynamicForm from "../dynamicForm";

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
  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("brand", values.brand);
    formData.append("variants", JSON.stringify(values.variants));
    formData.append("seriesId", values.seriesId);
    formData.append("networkType", values.networkType);
    formData.append("category", values.category);
    formData.append("display", values.display);
    formData.append("rating", values.rating);
    formData.append("frontCamera", values.frontCamera);
    formData.append("launchDate", values.launchDate);
    // formData.append("colors", JSON.stringify(values.colors));
    formData.append("rearCamera", values.rearCamera);
    formData.append("battery", values?.battery);
    formData.append("os", values.os);
    formData.append("processor", values.processor);
    formData.append("description", values.description);
    // values?.colors?.map((color: any) => {
    //   color?.images?.map((image: any) => {
    //     formData.append("images", image);
    //   });
    // });
    // Process colors and images
    const colorsWithFileRefs = values.colors.map(
      (color: any, colorIndex: number) => {
        const imageRefs = color.images.map((image: any, imageIndex: number) => {
          // Create unique field name for each image
          const fieldName = `color_${colorIndex}_image_${imageIndex}`;
          // Append the file to FormData
          formData.append(fieldName, image);
          return fieldName; // Return reference to be used in colors JSON
        });

        return {
          ...color,
          images: imageRefs, // Replace files with field references
        };
      }
    );

    // Append the colors JSON with references to the image fields
    formData.append("colors", JSON.stringify(colorsWithFileRefs));
    // values.color.images.forEach(imageFile => {
    //   formData.append('images', imageFile);
    // });

    // editId
    //   ? dispatch(editProduct({ data: formData, editId }))
    // :
    dispatch(addproduct(formData));
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
