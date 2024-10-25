import { VIVOPHONES } from "constants/vivo";
import { OPPOPHONES } from "constants/oppo";
export const getBrandPhones = (brandName: string) => {
  switch (brandName) {
    case "vivo":
      return VIVOPHONES;
    case "oppo":
      return OPPOPHONES;
    default:
      return "";
  }
};
