import { ALLPHONES } from "constants/allPhone";

export const getPhoneVariants = (variantKeyWord: string) => {
  const phoneVariants = ALLPHONES.filter(
    (phone) => phone?.series === variantKeyWord
  );
  return phoneVariants;
};
