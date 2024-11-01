import { ALLPHONES } from "constants/allPhone";
export const getProductDetails = (productId: string) => {
  console.log(productId);
  const phoneDetails = ALLPHONES.filter((phones) => phones.id === productId);
  return phoneDetails[0];
};
