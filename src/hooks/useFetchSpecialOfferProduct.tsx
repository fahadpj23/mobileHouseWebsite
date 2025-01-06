import { useEffect, useState } from "react";
import app from "constants/firebaseCofig";

import {
  endAt,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
export const useFetchSpecialProducts = () => {
  const [specialOfferProducts, setSpecialOfferProducts] = useState([]);

  const fetchSpecialOfferProduct = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const dbquery = query(dbRef, orderByChild("specialOffer"), equalTo(true));
    const snapshot = await get(dbquery);

    if (snapshot.exists()) {
      setSpecialOfferProducts(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchSpecialOfferProduct();
  }, []);

  return {
    specialOfferProducts,
  };
};
