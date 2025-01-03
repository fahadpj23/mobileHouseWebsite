import { ALLPHONES } from "constants/allPhone";
export const getProductDetails = (productId: string) => {
  const phoneDetails =
    Array.isArray(ALLPHONES) &&
    ALLPHONES.filter((phones) => phones.id === productId);
  return Array.isArray(phoneDetails) && phoneDetails[0];
};
