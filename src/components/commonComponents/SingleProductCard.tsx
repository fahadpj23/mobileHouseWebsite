import VIVOV40PHONE from "assets/vivoV40Phone.jpg";
import { FC } from "react";

interface props {
  product: any;
}
const SingleProductCard: FC<props> = ({ product }) => {
  const DiscountPercentage = (45000 / 37000) * 100;

  return (
    <div>
      <div className="shadow-xl  bg-white p-3 md:p-6 flex flex-col space-y-2  relative rounded-md">
        <div className="flex justify-center">
          <img
            src={product?.image}
            alt="phone Image"
            height={150}
            width={150}
          />
        </div>
        <h1 className="absolute top-3 right-3 bg-blue-500 text-white rounded p-1  text-xs md:text-base">
          {80}%off
        </h1>
        <div className=" flex space-x-3 items-center">
          <h1 className="font-semibold text-xs md:text-base">
            Rs:{product.salesPrice}.00
          </h1>
          <h1 className="line-through text-xs md:text-sm">{product.mrp}</h1>
        </div>
      </div>
    </div>
  );
};
export default SingleProductCard;
