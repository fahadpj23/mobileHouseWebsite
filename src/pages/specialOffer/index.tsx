import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import ProductList from "components/commonComponents/productList";
import { useFetchSpecialProducts } from "hooks/useFetchSpecialOfferProduct";

const SpecialOffer = () => {
  const { specialOfferProducts } = useFetchSpecialProducts();
  return (
    <div>
      {Array.isArray(specialOfferProducts) ? (
        <ProductList products={specialOfferProducts} />
      ) : null}
    </div>
  );
};
export default SpecialOffer;
