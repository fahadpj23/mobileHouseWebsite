import SingleProductCard from "components/commonComponents/SingleProductCard";
import { NEWARRIVALITEMS } from "constants/newArrivalItems";

const NewArrival = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5">
      {NEWARRIVALITEMS?.map((product: any) => {
        return <SingleProductCard product={product} key={product?.name} />;
      })}
    </div>
  );
};
export default NewArrival;
