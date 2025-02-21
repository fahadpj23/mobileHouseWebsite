import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";
import { getNewArrivalPhones } from "utils/getNewArrival";
import { getTrendingPhones } from "utils/getTrendingPhones";
import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import { getSearchPhones } from "utils/getSearchPhones";

const Phones = () => {
  const [products, setProducts] = useState<any>([]);
  const { phoneType } = useParams();

  useEffect(() => {
    switch (phoneType) {
      case "newArrival":
        setProducts(getNewArrivalPhones());
        break;
      case "trendingPhones":
        setProducts(getTrendingPhones());
        break;
      case "specialOffer":
        setProducts(getSpecialOfferPhones());
        break;
      default:
        setProducts(getSearchPhones(phoneType ?? ""));
    }
  }, [phoneType]);
  console.log(getSearchPhones("oppo"));
  return (
    <div>
      {products && Array.isArray(products) ? (
        <ProductList products={products} />
      ) : null}
    </div>
  );
};
export default Phones;
