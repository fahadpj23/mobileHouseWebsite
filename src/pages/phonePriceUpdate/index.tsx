import { get, getDatabase, query, ref, update } from "firebase/database";
import app from "constants/firebaseCofig";
const PhonePriceUpdate = () => {
  const updateProductPrice = async () => {
    try {
      const db = getDatabase(app);
      const productRef = ref(db, `products/VIVO1`); // Assuming 'products' is the node
      update(productRef, { salesPrice: 30000 })
        .then(() => {
          alert("Product price updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          alert("Failed to update product price.");
        });
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
