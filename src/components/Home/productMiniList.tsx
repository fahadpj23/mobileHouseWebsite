import SingleProductCard from "components/commonComponents/SingleProductCard";
import { FC } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";
import MultiCarousel from "./multiCarousel";

interface props {
  title: string;
  listItems: any;
  link: string;
}
const ProductMiniList: FC<props> = ({ title, listItems, link }) => {
  return (
    <div className="">
      <div className="flex justify-between pb-2 items-center ">
        <h1 className="font-semibold text-sm md:text-lg ">{title}</h1>
        <div className="flex space-x-1 text-xs items-center">
          <Link to={link} className="text-blue-600">
            show more
          </Link>
        </div>
      </div>
      <div className=" hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-5 items-center">
        {listItems?.slice(0, 5).map((product: any) => (
          <SingleProductCard key={product?.name} product={product} />
        ))}
      </div>
      <div className="block md:hidden">
        <MultiCarousel listItems={listItems} />
      </div>
    </div>
  );
};
export default ProductMiniList;
