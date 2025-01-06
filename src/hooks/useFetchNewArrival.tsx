import { useEffect, useState } from "react";
import { get, getDatabase, ref } from "firebase/database";
import app from "constants/firebaseCofig";

export const useFetchNewArrival = () => {
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  const parseDate = (dateString: any) => {
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // Month is zero-based
  };

  const filterLastSixMonths = (items: any) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);

    return items.filter((item: any) => {
      const itemDate = item.launchDate && parseDate(item.launchDate);
      return itemDate >= sixMonthsAgo;
    });
  };

  const fetchAll = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = Object.values(snapshot.val());
      if (Array.isArray(data)) {
        const newArrivalPhones = filterLastSixMonths(data);
        const productsnew = newArrivalPhones.sort((a: any, b: any) => {
          const [dayA, monthA, yearA] = a.launchDate.split("-").map(Number);
          const [dayB, monthB, yearB] = b.launchDate.split("-").map(Number);
          const dateA = new Date(yearA, monthA - 1, dayA).getTime();
          const dateB = new Date(yearB, monthB - 1, dayB).getTime();
          return dateB - dateA;
        });
        setNewArrivalProducts(newArrivalPhones);
      }
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    newArrivalProducts,
  };
};
