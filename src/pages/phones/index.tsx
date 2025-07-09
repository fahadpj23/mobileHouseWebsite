import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "components/commonComponents/productList";

const Phones = () => {
  const [products, setProducts] = useState<any>([]);
  const { phoneType } = useParams();

  useEffect(() => {
    switch (phoneType) {
      case "newArrival":
        setProducts([]);
        break;
      case "trendingPhones":
        setProducts([]);
        break;
      case "specialOffer":
        setProducts([]);
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
