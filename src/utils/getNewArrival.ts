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

export const getNewArrivalPhones = () => {
  const newArrivalPhones = filterLastSixMonths(ALLPHONES);
  return newArrivalPhones;
};
