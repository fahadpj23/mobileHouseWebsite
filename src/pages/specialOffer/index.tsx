import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import { SpecialOfferPhones } from "constants/specialOfferPhones";
import SingleProductCard from "components/commonComponents/SingleProductCard";

const SpecialOffer = () => {
  const specialOfferPhones = getSpecialOfferPhones();
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5">
      {specialOfferPhones?.map((product: any) => {
        return <SingleProductCard product={product} key={product?.name} />;
      })}
    </div>
  );
};
export default SpecialOffer;
