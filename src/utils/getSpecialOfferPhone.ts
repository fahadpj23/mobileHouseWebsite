import { ALLPHONES } from "constants/allPhone";
import { shuffleArray } from "./shuffleArray";

export const getSpecialOfferPhones = () => {
  const specialOfferPhones =
    Array.isArray(ALLPHONES) &&
    ALLPHONES.filter((phones) => phones.specialOffer === true);
  return shuffleArray(specialOfferPhones);
};
