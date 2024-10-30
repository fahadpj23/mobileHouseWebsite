import { FC } from "react";
import { Link } from "react-router-dom";

interface props {
  product: any;
}
const SingleProductCard: FC<props> = ({ product }) => {
  const DiscountPercentage =
    ((product.mrp - product.salesPrice) /
      ((product.mrp + product.salesPrice) / 2)) *
    100;

  return (
    <Link
      to={`/phone/${product?.name?.replace(/[ /]/g, "")}`}
      state={{ product }}
    >
      <div className="shadow-xl  bg-white p-3 md:p-6 flex flex-col space-y-2  relative rounded-md">
        <div className="flex justify-center">
          <img
            src={product?.image}
            alt="phone Image"
            style={{ objectFit: "fill", width: "150px", height: "170px" }}
          />
        </div>
        <h1 className="font-semibold truncate w-full">{product?.name}</h1>
        <h1 className="absolute top-3 right-3 bg-blue-500 text-white rounded p-1  text-xs md:text-base">
          {Math.floor(DiscountPercentage)}%off
        </h1>
        <h1 className="font-semibold text-sm md:text-lg text-green-600 tracking-wider">
          ₹{product.salesPrice}.00
        </h1>
        <h1 className="line-through text-[11px] md:text-base text-red-500">
          ₹{product.mrp}
        </h1>
      </div>
    </Link>
  );
};
export default SingleProductCard;
