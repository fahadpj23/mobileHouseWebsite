import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import ProductList from "components/commonComponents/productList";

const SpecialOffer = () => {
  const specialOfferPhones = getSpecialOfferPhones();
  return (
    <div>
      {specialOfferPhones?.length ? (
        <ProductList products={specialOfferPhones} />
      ) : null}
    </div>
  );
};
export default SpecialOffer;
