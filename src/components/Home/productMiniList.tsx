import SingleProductCard from "components/commonComponents/SingleProductCard";
import { FC } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link } from "react-router-dom";

interface props {
  title: string;
  listItems: any;
  link: string;
}
const ProductMiniList: FC<props> = ({ title, listItems, link }) => {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-lg ">{title}</h1>
        <div className="flex space-x-1 text-xs items-center">
          <Link to={link} className="text-blue-600">
            View All{" "}
          </Link>
          <ArrowRightAltIcon />
        </div>
      </div>
      <div className=" mt-2  grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 ">
        {listItems?.map((product: any) => (
          <SingleProductCard key={product?.name} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductMiniList;
