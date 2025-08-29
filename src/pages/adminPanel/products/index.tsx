import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  deleteProduct,
  fetchProducts,
  fetchSearchProducts,
  getProductByIdEdit,
} from "store/slice/productSlice";
import { useCallback, useEffect, useState } from "react";

import TableData from "components/adminComponents/table";
import { formFields } from "components/adminComponents/addProduct/formFields";
import { validationSchema } from "components/adminComponents/addProduct/validationSchema";
import { initialValues } from "components/adminComponents/addProduct/intitialValue";
import { ProductTableHead } from "constants/admin/tableHead/products";
import Header from "components/adminComponents/header";
import AddProduct from "components/adminComponents/addProduct";
import { showToast } from "utils/toast";
import { ToastContainer } from "react-toastify";
import Loading from "components/commonComponents/loading";
import { debounce } from "lodash";

const Products = () => {
  const dispatch = useAppDispatch();
  const { entities, entity, successMessage, loading,searchProduct } = useAppSelector(
    (state) => state.user.products
  );
      const [searchValue, setSearchValue] = useState<string>("");
    
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(initialValues);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (successMessage) {
      setIsAddModalOpen(false);
      setIsEdit(false);
      setEditId(0);
      showToast(successMessage);
      dispatch(fetchProducts());
    }
  }, [successMessage]);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = (id: number) => {
    setEditId(id);

    dispatch(getProductByIdEdit(id));
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    if (entity !== null && entity?.id) {
      setValues(entity);
      setIsEdit(true);
    } else setValues(initialValues);
  }, [entity]);


    const debouncedSearch = useCallback(
      debounce((searchTerm: string) => {
        if (searchTerm.trim()) {
          dispatch(fetchSearchProducts(searchTerm));
        }
        else
        dispatch(fetchProducts())
      }, 500),
      [dispatch]
    );
  
    const handleSearch = useCallback(
      (search: string) => {
        setSearchValue(search);
        debouncedSearch(search);
      },
      [debouncedSearch]
    );
  
    // Cleanup debounce on unmount
    useEffect(() => {
      return () => {
        debouncedSearch.cancel();
      };
    }, [debouncedSearch]);


  return (
    <div>
      <ToastContainer />
      {loading && <Loading />}
      <Header title="Product" handleForm={handleForm} searchValue={searchValue} handleSearch={handleSearch}/>

      {Array.isArray(entities) && (
        <TableData
          TableHead={ProductTableHead}
          TableData={searchValue ? searchProduct :entities}
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
