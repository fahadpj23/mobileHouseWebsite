import { IoHomeOutline } from "react-icons/io5";
import { NAVIGATIONITEMMODEL } from "model/navigationItemModel";

export const ADMINNAVIGATIONITEMS: NAVIGATIONITEMMODEL[] = [
  { title: "Product", link: "/admin/products", icon: <IoHomeOutline /> },
  { title: " Banner", link: "/admin/mainBanner", icon: <IoHomeOutline /> },
  { title: "New Arrival", link: "/admin/newArrival", icon: <IoHomeOutline /> },
  {
    title: "Just Launched",
    link: "/admin/justLaunched",
    icon: <IoHomeOutline />,
  },
  {
    title: "Whatsapp Ads",
    link: "/admin/whatsappAds",
    icon: <IoHomeOutline />,
  },
];
