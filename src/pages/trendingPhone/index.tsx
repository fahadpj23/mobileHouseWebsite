import ProductList from "components/commonComponents/productList";
import { getTrendingPhones } from "utils/getTrendingPhones";

const TrendingPhones = () => {
  const trendingPhones = getTrendingPhones();
  return (
    <div>
      {trendingPhones?.length ? (
        <ProductList products={trendingPhones} />
      ) : null}
    </div>
  );
};
export default TrendingPhones;
