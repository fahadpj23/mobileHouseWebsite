import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchProducts } from "store/slice/products/productSlice";
import { useEffect, useState } from "react";

import TableData from "../AdminComponents/table";

import { ProductTableHead } from "../tableHead/products";
import Header from "../AdminComponents/header";
import AddProduct from "./addProduct/addProduct";

const Products = () => {
  const dispatch = useAppDispatch();
  const { entities, loading } = useAppSelector((state) => state.user.products);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddButton = () => setIsAddModalOpen(true);

  return (
    <div>
      <Header title="Product" handleAddButton={handleAddButton} />

      {Array.isArray(entities) && (
        <TableData TableHead={ProductTableHead} TableData={entities} />
      )}
      {isAddModalOpen && (
        <AddProduct
          handleAddButton={handleAddButton}
          isAddModalOpen={isAddModalOpen}
        />
      )}
    </div>
  );
};
export default Products;
