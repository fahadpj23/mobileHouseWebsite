import { ALLPHONES } from "constants/allPhone";
import { shuffleArray } from "./shuffleArray";

export const getTrendingPhones = () => {
  console.log(ALLPHONES);
  const trendingPhones =
    Array.isArray(ALLPHONES) &&
    ALLPHONES.filter((phones) => phones.trendingPhone === true);
  return shuffleArray(trendingPhones);
};
