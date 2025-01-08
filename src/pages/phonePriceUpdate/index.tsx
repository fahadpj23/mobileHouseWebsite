import { get, getDatabase, query, ref, update } from "firebase/database";
import app from "constants/firebaseCofig";
const PhonePriceUpdate = () => {
  const updateProductPrice = async () => {
    try {
      const db = getDatabase(app);
      const productRef = ref(db, `products/VIVO19`); // Assuming "products" is your main node
      const productSnap = await get(productRef);

      if (productSnap.exists()) {
        console.log("Product Data:", productSnap.val());
        return productSnap.val();
      } else {
        console.log("No such product found!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div>
      <input placeholder="new price" />
      <button onClick={() => updateProductPrice()}>update Price</button>
    </div>
  );
};
export default PhonePriceUpdate;
