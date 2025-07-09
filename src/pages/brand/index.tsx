import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { getProductByBrand } from "store/slice/productSlice";

const Brand = () => {
  const { brandName } = useParams();
  const dispatch = useAppDispatch();
  const { entities } = useAppSelector((state) => state.user.products);
  const [phoneList, setPhoneList] = useState<any>([]);
  useEffect(() => {
    brandName && dispatch(getProductByBrand(brandName));
    // brandName && setPhoneList(getBrandPhones(brandName));
  }, [brandName]);

  return (
    <div>
      <div>{entities?.length ? <ProductList products={entities} /> : null}</div>
    </div>
  );
};
export default Brand;
