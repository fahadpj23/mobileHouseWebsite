import SingleProductCard from "components/commonComponents/SingleProductCard";
import { getTrendingPhones } from "utils/getTrendingPhones";

const TrendingPhones = () => {
  const trendingPhones = getTrendingPhones();
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-5">
      {trendingPhones?.map((product: any) => {
        return <SingleProductCard product={product} key={product?.name} />;
      })}
    </div>
  );
};
export default TrendingPhones;
