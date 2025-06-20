import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { addproducts, fetchProducts } from "store/slice/products/productSlice";
import { useEffect } from "react";
import { initialValues } from "./addProduct/intitialValue";
import TableData from "../AdminComponents/table";
import { formFields } from "./addProduct/formFields";
import { validationSchema } from "./addProduct/validationSchema";
import { ProductTableHead } from "../tableHead/products";
import DynamicForm from "../AdminComponents/dynamicForm";

const Products = () => {
  const dispatch = useAppDispatch();
  const { entities, loading } = useAppSelector((state) => state.user.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
    values.images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(addproducts(formData));
  };

  return (
    <div>
      <h1>products</h1>
      {/* <AddProduct /> */}
      <DynamicForm
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />

      {Array.isArray(entities) && (
        <TableData TableHead={ProductTableHead} TableData={entities} />
      )}
    </div>
  );
};
export default Products;
