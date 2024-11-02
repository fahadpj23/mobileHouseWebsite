import { getNewArrivalPhones } from "utils/getNewArrival";
import SingleProductCard from "components/commonComponents/SingleProductCard";

const NewArrival = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5">
      {getNewArrivalPhones()?.map((product: any) => {
        return <SingleProductCard product={product} key={product?.name} />;
      })}
    </div>
  );
};
export default NewArrival;
