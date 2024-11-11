import { VIVOPHONES } from "constants/vivo";
import { OPPOPHONES } from "constants/oppo";
import { REALMEPHONES } from "constants/realme";
import { SAMSUNGPHONES } from "constants/samsung";
import { MIPHONES } from "constants/mi";
import { ALLPHONES } from "constants/allPhone";

export const getBrandPhones = (brandName: string) => {
  const brandPhones = ALLPHONES.filter(
    (phones) => phones.brand.toUpperCase() === brandName.toUpperCase()
  );
  return brandPhones;
};
