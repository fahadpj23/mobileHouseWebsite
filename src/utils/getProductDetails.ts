import { ALLPHONES } from "constants/allPhone";
export const getProductDetails = (productId: string) => {
  const phoneDetails = ALLPHONES.filter((phones) => phones.id === productId);
  return phoneDetails[0];
};
