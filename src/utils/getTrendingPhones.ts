import { ALLPHONES } from "constants/allPhone";

export const getTrendingPhones = () => {
  const trendingPhones = ALLPHONES.filter(
    (phones) => phones.trendingPhone === true
  );
  return trendingPhones;
};
