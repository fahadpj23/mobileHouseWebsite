import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchBrandProducts } from "store/slice/productSlice";

const Brand = () => {
  const { brandName } = useParams();
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector((state) => state.user.products);
  useEffect(() => {
    brandName && dispatch(fetchBrandProducts(brandName));
  }, [brandName]);

  return (
    <div>
      <div>
        {entities?.length ? (
          <ProductList products={entities} />
        ) : (
          <div className="flex items-center justify-center min-h-screen fixed top-0 left-0 w-screen z-50 bg-white">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Brand;
