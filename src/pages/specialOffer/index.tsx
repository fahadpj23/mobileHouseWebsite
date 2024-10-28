import { SpecialOfferPhones } from "constants/specialOfferPhones";
import SingleProductCard from "components/commonComponents/SingleProductCard";

const SpecialOffer = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5">
      {SpecialOfferPhones?.map((product: any) => {
        return <SingleProductCard product={product} key={product?.name} />;
      })}
    </div>
  );
};
export default SpecialOffer;
