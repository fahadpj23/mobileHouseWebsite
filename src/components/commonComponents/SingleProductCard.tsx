import { Rating } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import LazyImage from "./imageLazyLoading";

interface props {
  product: any;
}
const SingleProductCard: FC<props> = ({ product }) => {
  const DiscountPercentage =
    ((product.mrp - product.salesPrice) /
      ((product.mrp + product.salesPrice) / 2)) *
    100;

  return (
    <Link to={`/phone/${product?.id}/${encodeURIComponent(product?.name)}`}>
      <div className=" p-3 md:p-6 flex flex-col space-y-2  bg-white relative rounded-md">
        <div className="flex justify-center bg-grayBackground rounded-md shadow-md p-2">
          <div className="w-full h-[150px]  md:h-[170px] object-contain">
            <LazyImage src={product?.image} alt="Product Image" />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <h1 className="font-semibold  w-full text-[13px] md:text-base truncate">
            {product?.name}
          </h1>
          <h1 className="absolute top-3 right-3 bg-blue-500 text-white rounded p-1  text-[10px] md:text-base">
            {Math.floor(DiscountPercentage)} %off
          </h1>
          <div className="flex space-x-3 items-center">
            <h1 className="font-semibold text-[13px] md:text-md ">
              ₹{product.salesPrice}.00
            </h1>
            <h1 className="line-through text-[11px] md:text-[13px] text-gray-500">
              ₹{product.mrp}
            </h1>
          </div>
          <Rating
            precision={0.1}
            sx={{ fontSize: 12 }}
            name="read-only"
            value={product?.rating}
            readOnly
          />
        </div>
      </div>
    </Link>
  );
};
export default SingleProductCard;
