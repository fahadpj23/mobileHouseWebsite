import { ALLPHONES } from "constants/allPhone";

export const getPhoneVariants = (variantKeyWord: string) => {
  const phoneVariants =
    Array.isArray(ALLPHONES) &&
    ALLPHONES.filter((phone) => phone?.series === variantKeyWord);
  return phoneVariants;
};
