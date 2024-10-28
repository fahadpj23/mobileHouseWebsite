import { VIVOPHONES } from "constants/vivo";
import { OPPOPHONES } from "constants/oppo";
import { REALMEPHONES } from "constants/realme";
import { SAMSUNGPHONES } from "constants/samsung";
import { MIPHONES } from "constants/mi";

export const getBrandPhones = (brandName: string) => {
  switch (brandName) {
    case "vivo":
      return VIVOPHONES;
    case "oppo":
      return OPPOPHONES;
    case "realme":
      return REALMEPHONES;
    case "samsung":
      return SAMSUNGPHONES;
    case "mi":
      return MIPHONES;
    default:
      return "";
  }
};
