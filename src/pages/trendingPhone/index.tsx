import { useFetchTrendingProducts } from "hooks/useFetchTrendingPhone";
import ProductList from "components/commonComponents/productList";
import { getTrendingPhones } from "utils/getTrendingPhones";

const TrendingPhones = () => {
  const { trendingProducts } = useFetchTrendingProducts();
  return (
    <div>
      {Array.isArray(trendingProducts) ? (
        <ProductList products={trendingProducts} />
      ) : null}
    </div>
  );
};
export default TrendingPhones;
