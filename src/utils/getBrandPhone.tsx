import { ALLPHONES } from "constants/allPhone";

export const getBrandPhones = (brandName: string) => {
  const brandPhones =
    Array.isArray(ALLPHONES) &&
    ALLPHONES.filter(
      (phones) => phones.brand.toUpperCase() === brandName.toUpperCase()
    );
  return brandPhones;
};
