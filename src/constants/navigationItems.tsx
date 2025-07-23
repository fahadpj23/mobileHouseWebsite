import DiscountIcon from "@mui/icons-material/Discount";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { NAVIGATIONITEMMODEL } from "model/navigationItemModel";

export const NAVIGATIONITEMS: NAVIGATIONITEMMODEL[] = [
  { title: "Home", link: "/", icon: <HomeOutlinedIcon /> },
  {
    title: "New Arrival",
    link: "phones/newArrival",
    icon: <CampaignOutlinedIcon />,
  },
  {
    title: "Special Offer",
    link: "phones/specialOffer",
    icon: <DiscountIcon />,
  },
  {
    title: "Trending Phone",
    link: "phones/trendingPhones",
    icon: <TrendingUpIcon />,
  },
];
