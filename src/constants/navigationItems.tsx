import { RiDiscountPercentLine } from "react-icons/ri";
import { GrAnnounce } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { NAVIGATIONITEMMODEL } from "model/navigationItemModel";

export const NAVIGATIONITEMS: NAVIGATIONITEMMODEL[] = [
  { title: "Home", link: "/", icon: <IoHomeOutline /> },
  { title: "New Arrival", link: "phones/newArrival", icon: <GrAnnounce /> },
  {
    title: "Special Offer",
    link: "phones/specialOffer",
    icon: <RiDiscountPercentLine />,
  },
  {
    title: "Trending Phone",
    link: "phones/trendingPhones",
    icon: <FaArrowTrendUp />,
  },
];
