import { MAINBANNERMODEL } from "model/mainBannerModel";
import BANNER1 from "assets/mainBanner/banner1.jpeg";
import BANNER2 from "assets/mainBanner/banner2.jpeg";

import BANNER4 from "assets/mainBanner/banner4.webp";
import BANNER5 from "assets/mainBanner/banner5.webp";
import BANNER6 from "assets/mainBanner/banner6.webp";

export const MAINBANNER: MAINBANNERMODEL[] = [
  {
    id: 1,
    image: BANNER1,
    series: ["OPPORENO14", "OPPORENO14PRO"],
  },
  {
    id: 2,
    image: BANNER2,
    series: ["VIVOX200FE"],
  },

  {
    id: 4,
    image: BANNER4,
    series: ["S25", "S25ULTRA", "S25PLUS"],
  },

  {
    id: 5,
    image: BANNER5,
    series: ["F29", "F29PRO"],
  },
  {
    id: 6,
    image: BANNER6,
    series: ["VIVOY400PRO"],
  },
];
