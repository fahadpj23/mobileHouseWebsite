import { PHONEIMAGE } from "constants/phoneImages";
export const getProductImage = (id: string) => {
  const result = PHONEIMAGE.find((phone: any) => phone.id?.includes(id));
  return result?.colors ?? null;
};
