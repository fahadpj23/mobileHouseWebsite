import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  getNewArrivalProduct,
  getSpecialOffer,
  getTrendingPhone,
} from "store/slice/productSlice";

const Phones = () => {
  const [products, setProducts] = useState<any>([]);
  const { phoneType } = useParams();
  const dispatch = useAppDispatch();
  const { newArrival, specialOffer, trendingPhone } = useAppSelector(
    (state) => state.user.products
  );

  useEffect(() => {
    switch (phoneType) {
      case "newArrivalProduct":
        setProducts(newArrival ?? []);
        break;
      case "trendingPhone":
        setProducts(trendingPhone ?? []);
        break;
      case "specialOffer":
        setProducts(specialOffer ?? []);
        break;
      default:
        setProducts([]);
    }
  }, [newArrival, specialOffer, trendingPhone]);

  useEffect(() => {
    switch (phoneType) {
      case "newArrivalProduct":
        dispatch(getNewArrivalProduct());
        break;
      case "trendingPhone":
        dispatch(getTrendingPhone());
        break;
      case "specialOffer":
        dispatch(getSpecialOffer());
        break;
      default:
        setProducts([]);
    }
  }, [phoneType]);
  return (
    <div>
      {products && Array.isArray(products) ? (
        <ProductList products={products} />
      ) : null}
    </div>
  );
};
export default Phones;
