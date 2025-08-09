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
import { Link } from "react-router-dom";

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

  useEffect(() => {
    if (successMessage) {
      setIsAddModalOpen(false);
      setIsEdit(false);
      showToast(successMessage);
      dispatch(fetchProducts());
    }
  }, [successMessage]);

  const handleForm = () => setIsAddModalOpen(!isAddModalOpen);

  const handleEdit = (id: number) => {
    setEditId(id);

    dispatch(getProductByIdEdit(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (entity !== null && entity?.id) {
      setValues(entity);
      setIsEdit(true);
    } else setValues(initialValues);
  }, [entity]);

  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/.netlify/functions/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.log("message");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-100 overflow-hidden">
                {product.colors?.[0]?.images?.[0] && (
                  <img
                    src={product.colors[0].images[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.productName}</h2>
                <p className="text-gray-600">${product.price}</p>
                <div className="flex mt-2">
                  {product.colors?.map((color: any, i: any) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full mr-2 border"
                      style={{ backgroundColor: color.hexCode }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
