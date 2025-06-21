import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  fetchProducts,
  getProductById,
} from "store/slice/products/productSlice";
import { useEffect, useState } from "react";

import TableData from "../adminComponents/table";
import { formFields } from "./addProduct/formFields";
import { validationSchema } from "./addProduct/validationSchema";
import { initialValues } from "./addProduct/intitialValue";
import { ProductTableHead } from "../tableHead/products";
import Header from "../adminComponents/header";
import AddProduct from "./addProduct/addProduct";

const Products = () => {
  const dispatch = useAppDispatch();
  const { entities, loading, entity } = useAppSelector(
    (state) => state.user.products
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddButton = () => setIsAddModalOpen(true);

  const handleEdit = (id: number) => {
    setEditId(id);
    dispatch(getProductById(id));
  };

  useEffect(() => {
    if (entity !== null && entity?.id) {
      setValues(entity);
      setIsEdit(true);
    } else setValues(initialValues);
  }, [entity]);
  console.log(values);
  return (
    <div>
      <Header title="Product" handleAddButton={handleAddButton} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={ProductTableHead}
          TableData={entities}
          handleEdit={handleEdit}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddProduct
          handleAddButton={handleAddButton}
          isAddModalOpen={isAddModalOpen || isEdit}
          formFields={formFields}
          validationSchema={validationSchema}
          initialValues={values}
        />
      )}
    </div>
  );
};
export default Products;
