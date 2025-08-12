import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  deleteProduct,
  fetchProducts,
  getProductByIdEdit,
} from "store/slice/productSlice";
import { useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addProduct/formFields";
import { validationSchema } from "components/adminComponents/addProduct/validationSchema";
import { initialValues } from "components/adminComponents/addProduct/intitialValue";
import { ProductTableHead } from "constants/admin/tableHead/products";
import Header from "components/adminComponents/header";
import AddProduct from "components/adminComponents/addProduct";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const Products = () => {
  const dispatch = useAppDispatch();
  const { entities, entity, successMessage } = useAppSelector(
    (state) => state.user.products
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // useEffect(() => {
  //   if (successMessage) {
  //     setIsAddModalOpen(false);
  //     setIsEdit(false);
  //     showToast(successMessage);
  //     dispatch(fetchProducts());
  //   }
  // }, [successMessage]);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = (id: number) => {
    setEditId(id);

    dispatch(getProductByIdEdit(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/.netlify/functions/get-products");
        console.log(response.data);
      } catch (err) {
        console.log("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        console.log(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (entity !== null && entity?.id) {
      setValues(entity);
      setIsEdit(true);
    } else setValues(initialValues);
  }, [entity]);

  return (
    <div>
      <ToastContainer />
      <Header title="Product" handleForm={handleForm} />

      {Array.isArray(entities) && (
        <TableData
          TableHead={ProductTableHead}
          TableData={entities}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
      {(isAddModalOpen || isEdit) && (
        <AddProduct
          handleForm={handleForm}
          isAddModalOpen={isAddModalOpen || isEdit}
          formFields={formFields}
          validationSchema={validationSchema}
          initialValues={values}
          editId={editId}
        />
      )}
    </div>
  );
};
export default Products;
