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

export const FetchAllPhone = async () => {
  const db = getDatabase(app);
  const dbquery = ref(db, "products");
  const snapshot = await get(dbquery);

  if (snapshot.exists()) {
    const products = Object.values(snapshot.val());

    return Array.isArray(products) ? products : [];
  } else {
    alert("error");
  }
};
