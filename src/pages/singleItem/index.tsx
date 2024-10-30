import { Divider } from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const SingleItem = () => {
  const location = useLocation();
  const linkState = location?.state;
  const product = linkState?.product;

  const DiscountPercentage =
    ((product.mrp - product.salesPrice) /
      ((product.mrp + product.salesPrice) / 2)) *
    100;
  return (
    <div className="block md:flex items-center ">
      <div className="flex justify-center w-full md:w-1/2 ">
        <div className="w-[80vw] h-[80vw] md:w-[26vw] md:h-[35vw] flex justify-center items-center  ">
          <img
            src={product?.image}
            alt="product Image"
            className="w-full h-full "
          />
        </div>
      </div>
      <div className=" w-full md:w-1/2 mt:0 md:mt-20 ">
        <div className="space-y-2 ml-6">
          <h1 className="font-semibold truncate w-full text-xl">
            {product?.name}
          </h1>
          <div className="flex items-center space-x-2 text-lg">
            <h1 className="font-semibold  text-green-600 tracking-wide">
              ₹{product.salesPrice}.00
            </h1>

            <h1 className="line-through  text-red-500 text-xs">
              MRP: ₹{product.mrp}
            </h1>
            <h1 className=" text-[#11a453] rounded p-1 font-semibold  t">
              {DiscountPercentage && Math.floor(DiscountPercentage)}% off
            </h1>
          </div>
        </div>
        <div className=" pb-3">
          <div className="space-y-3 py-3">
            <h1 className="font-semibold ml-6 ">Specifications</h1>
            <Divider sx={{ width: "100%" }} />
          </div>
          <div className="space-y-3 ml-6">
            {product?.specification &&
              Object.entries(product?.specification)?.map(
                (specification: any) => (
                  <h1 key={specification[0]} className="font-light text-sm ">
                    {specification[0]} : {specification[1]}
                  </h1>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleItem;