import { getNewArrivalPhones } from "./getNewArrival";
import { getSpecialOfferPhones } from "./getSpecialOfferPhone";
import { getTrendingPhones } from "./getTrendingPhones";
import { removeDuplicateSeries } from "./removeDuplicateSeries";

export const FetchProductTypeItems = (type: string) => {
  if (type === "newArrival")
    return removeDuplicateSeries(getNewArrivalPhones())?.slice(0, 10);
  else if (type === "specialOffer")
    return removeDuplicateSeries(getSpecialOfferPhones())?.slice(0, 10);
  else return removeDuplicateSeries(getTrendingPhones())?.slice(0, 10);
};
