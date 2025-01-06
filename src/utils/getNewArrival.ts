import { ALLPHONES } from "constants/allPhone";

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

export const getNewArrivalPhones = (products: any) => {
  console.log(products);
  if (Array.isArray(products)) {
    const newArrivalPhones = filterLastSixMonths(products);
    const productsnew = newArrivalPhones.sort((a: any, b: any) => {
      const [dayA, monthA, yearA] = a.launchDate.split("-").map(Number);
      const [dayB, monthB, yearB] = b.launchDate.split("-").map(Number);

      const dateA = new Date(yearA, monthA - 1, dayA).getTime();
      const dateB = new Date(yearB, monthB - 1, dayB).getTime();

      return dateB - dateA;
    });
    return productsnew;
  }
};
