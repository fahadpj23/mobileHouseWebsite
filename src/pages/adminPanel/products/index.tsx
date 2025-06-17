import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchProducts } from "store/slice/products/productSlice";
import { useEffect } from "react";
import AddProduct from "./addProduct";

const Products = () => {
  const dispatch = useAppDispatch();
  const { entities, loading } = useAppSelector((state) => state.user.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(Array.isArray(entities) && entities[3]);
  return (
    <div>
      <h1>products</h1>
      <AddProduct />
      {Array.isArray(entities) && entities[2] && (
        <img
          src={`http://localhost:9000${entities[3]?.imageUrl}`}
          alt="product "
        />
      )}
    </div>
  );
};
export default Products;
