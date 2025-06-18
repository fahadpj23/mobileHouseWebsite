import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchProducts } from "store/slice/products/productSlice";
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
    console.log("Form submitted:", values);
    // Handle form submission here
  };

  console.log(Array.isArray(entities) && entities[3]);
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
