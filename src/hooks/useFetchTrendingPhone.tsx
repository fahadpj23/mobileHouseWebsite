import { useEffect, useState } from "react";
import app from "constants/firebaseCofig";

import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
export const useFetchTrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  const fetchTrendingOfferProduct = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const dbquery = query(dbRef, orderByChild("trendingPhone"), equalTo(true));
    const snapshot = await get(dbquery);

    if (snapshot.exists()) {
      setTrendingProducts(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchTrendingOfferProduct();
  }, []);

  return {
    trendingProducts,
  };
};
