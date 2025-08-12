import { Rating } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import LazyImage from "./imageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";
import { PHONEMODEL } from "model/phoneModel";

interface props {
  product: any;
}
const SingleProductCard: FC<props> = ({ product }) => {
  const DiscountPercentage =
    Array.isArray(product?.variants) &&
    ((+product?.variants[0]?.mrp - +product?.variants[0]?.price) /
      ((+product?.variants[0]?.mrp + +product?.variants[0]?.price) / 2)) *
      100;
  console.log(product?.colors[0]?.images[0]?.url);
  return (
    <>
      <Link
        to={`/phone/${product?.id}/${
          Array.isArray(product?.variants) && product?.variants[0]?.id
        }/${
          Array.isArray(product?.colors) && product?.colors[0]?.id
        }/${encodeURIComponent(product?.productName)}`}
      >
        <div className=" p-3 md:p-6 flex flex-col space-y-2  bg-white relative rounded-md">
          <div className="flex justify-center bg-grayBackground rounded-md shadow-md p-2">
            <div className="w-full h-[150px]  md:h-[170px] object-contain">
              <LazyImage
                src={product?.colors[0]?.images[0]?.url}
                alt="Product Image"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <h1 className="  w-full text-[12px] md:text-[15px] font-medium truncate">
              {product?.productName ? (
                <>
                  {toPascalCase(product.productName)}{" "}
                  {product?.variants[0]?.ram}
                  {product?.variants[0]?.storage && (
                    <>
                      {" / "}
                      {product.variants[0].storage}
                    </>
                  )}
                </>
              ) : null}
            </h1>
            <h1 className="absolute top-3 right-3 bg-blue-500 text-white rounded p-1  text-[10px] md:text-base">
              {DiscountPercentage && Math.floor(DiscountPercentage)} %off
            </h1>
            <div className="flex space-x-3 items-center">
              <h1 className="font-bold tracking-wider text-[13px] md:text-[15px] ">
                ₹{product?.variants[0]?.price}.00
              </h1>
              <h1 className="line-through text-[12px] md:text-[13px] text-gray-600">
                ₹{product?.variants[0]?.mrp}
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
    </>
  );
};
export default SingleProductCard;
