import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import app from "constants/firebaseCofig";

export const useFetchAllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchAll = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      setProducts(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    products,
  };
};
