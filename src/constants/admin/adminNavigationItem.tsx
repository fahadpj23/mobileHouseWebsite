import { IoHomeOutline } from "react-icons/io5";
import { NAVIGATIONITEMMODEL } from "model/navigationItemModel";

export const ADMINNAVIGATIONITEMS: NAVIGATIONITEMMODEL[] = [
  { title: "Product", link: "/admin/products", icon: <IoHomeOutline /> },
  { title: " Banner", link: "/admin/Banner", icon: <IoHomeOutline /> },
  { title: "New Arrival", link: "/admin/newArrival", icon: <IoHomeOutline /> },
  {
    title: "Upcoming",
    link: "/admin/upcoming",
    icon: <IoHomeOutline />,
  },
  {
    title: "Whatsapp Ads",
    link: "/admin/whatsappAds",
    icon: <IoHomeOutline />,
  },
  {
    title: "series",
    link: "/admin/series",
    icon: <IoHomeOutline />,
  },
];
