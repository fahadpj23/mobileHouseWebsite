import { getNewArrivalPhones } from "utils/getNewArrival";
import ProductList from "components/commonComponents/productList";

const NewArrival = () => {
  const newArrivals = getNewArrivalPhones();
  return (
    <div>
      {newArrivals?.length ? <ProductList products={newArrivals} /> : null}
    </div>
  );
};
export default NewArrival;
