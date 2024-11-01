import { ALLPHONES } from "constants/allPhone";

export const getSpecialOfferPhones = () => {
  const specialOfferPhones = ALLPHONES.filter(
    (phones) => phones.specialOffer === true
  );
  return specialOfferPhones;
};
