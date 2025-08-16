import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import {
  fetchSearchProducts,
  getNewArrivalProduct,
  getSpecialOffer,
  getTrendingPhone,
} from "store/slice/productSlice";

const Phones = () => {
  const [products, setProducts] = useState<any>([]);
  const { phoneType } = useParams();
  const dispatch = useAppDispatch();
  const { newArrival, specialOffer, trendingPhone, searchProduct } =
    useAppSelector((state) => state.user.products);

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
        setProducts(searchProduct ?? []);
    }
  }, [newArrival, specialOffer, trendingPhone, searchProduct]);

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
        phoneType && dispatch(fetchSearchProducts(phoneType));
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
