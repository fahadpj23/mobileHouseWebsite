import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  fetchProducts,
  getProductById,
} from "store/slice/products/productSlice";
import { useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addProduct/formFields";
import { validationSchema } from "components/adminComponents/addProduct/validationSchema";
import { initialValues } from "components/adminComponents/addProduct/intitialValue";
import { ProductTableHead } from "constants/admin/tableHead/products";
import Header from "components/adminComponents/header";
import AddProduct from "components/adminComponents/addProduct";

const Products = () => {
  const dispatch = useAppDispatch();
  const { entities, entity } = useAppSelector((state) => state.user.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddButton = () => setIsAddModalOpen(!isAddModalOpen);

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
