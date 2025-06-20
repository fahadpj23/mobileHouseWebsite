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
    formData.append("name", values.productName);
    formData.append("mrp", values.mrp);
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
