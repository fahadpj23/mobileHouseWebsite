import { getBrandPhones } from "utils/getBrandPhone";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "components/commonComponents/productList";

const Brand = () => {
  const { brandName } = useParams();
  const [phoneList, setPhoneList] = useState<any>([]);
  useEffect(() => {
    brandName && setPhoneList(getBrandPhones(brandName));
  }, [brandName]);

  return (
    <div>
      <div>
        {phoneList?.length ? <ProductList products={phoneList} /> : null}
      </div>
    </div>
  );
};
export default Brand;
