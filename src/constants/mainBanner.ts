import { MAINBANNERMODEL } from "model/mainBannerModel";
import BANNER1 from "assets/mainBanner/banner1.webp";
import BANNER2 from "assets/mainBanner/banner2.webp";

import BANNER4 from "assets/mainBanner/banner4.webp";
import BANNER5 from "assets/mainBanner/banner5.webp";
import BANNER6 from "assets/mainBanner/banner6.webp";
import BANNER7 from "assets/mainBanner/banner7.webp";

export const MAINBANNER: MAINBANNERMODEL[] = [
  {
    id: 2,
    image: BANNER1,
    series: ["SAMSUNGA36", "SAMSUNGA56"],
  },
  {
    id: 7,
    image: BANNER7,
    series: ["VIVOY400PRO"],
  },
  {
    id: 9,
    image: BANNER6,
    series: ["F29", "F29PRO"],
  },
  {
    id: 1,
    image: BANNER5,
    series: ["S25", "S25ULTRA", "S25PLUS"],
  },

  {
    id: 3,
    image: BANNER2,
    series: ["VIVOX200", "VIVOX200PRO"],
  },

  {
    id: 5,
    image: BANNER4,
    series: ["RENO13", "RENO13PRO"],
  },
];
