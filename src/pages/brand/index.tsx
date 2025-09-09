import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchBrandProducts } from "store/slice/productSlice";
import SingleProductSkeleton from "components/skeleton/singleProductSkeleton";

const Brand = () => {
  const { brandName } = useParams();
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector((state) => state.user.products);
  useEffect(() => {
    brandName && dispatch(fetchBrandProducts(brandName));
  }, [brandName, dispatch]);

  return (
    <div>
      <div>
        {Array.isArray(entities) && entities?.length ? (
          <ProductList products={entities} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 md:gap-5 animate-pulse">
            {[...Array(5)].map((item, key) => {
              return <SingleProductSkeleton />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Brand;
