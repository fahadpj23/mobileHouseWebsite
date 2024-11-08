import { getNewArrivalPhones } from "utils/getNewArrival";
import SingleProductCard from "components/commonComponents/SingleProductCard";

const NewArrival = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5">
      {getNewArrivalPhones()?.length
        ? getNewArrivalPhones()?.map((product: any) => {
            return <SingleProductCard product={product} key={product?.name} />;
          })
        : null}
    </div>
  );
};
export default NewArrival;
