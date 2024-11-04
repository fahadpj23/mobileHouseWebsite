import { RiDiscountPercentLine } from "react-icons/ri";
import { GrAnnounce } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";

export const NAVIGATIONITEMS = [
  { title: "Home", link: "/", icon: <IoHomeOutline /> },
  { title: "New Arrival", link: "newArrival", icon: <GrAnnounce /> },
  {
    title: "Special Offer",
    link: "specialOffer",
    icon: <RiDiscountPercentLine />,
  },
  { title: "Trending Phone", link: "trendingPhones", icon: <FaArrowTrendUp /> },
];
