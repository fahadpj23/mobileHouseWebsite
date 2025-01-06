import { getNewArrivalPhones } from "utils/getNewArrival";
import ProductList from "components/commonComponents/productList";
import { useFetchNewArrival } from "hooks/useFetchNewArrival";

const NewArrival = () => {
  const { newArrivalProducts }: any = useFetchNewArrival();
  return (
    <div>
      {Array.isArray(newArrivalProducts) ? (
        <ProductList products={newArrivalProducts} />
      ) : null}{" "}
    </div>
  );
};
export default NewArrival;
