import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";
import { getNewArrivalPhones } from "utils/getNewArrival";
import { getTrendingPhones } from "utils/getTrendingPhones";
import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";

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
