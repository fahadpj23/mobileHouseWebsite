import { ALLPHONES } from "constants/allPhone";
import { shuffleArray } from "./shuffleArray";

export const getSpecialOfferPhones = () => {
  const specialOfferPhones = ALLPHONES.filter(
    (phones) => phones.specialOffer === true
  );
  return shuffleArray(specialOfferPhones);
};
