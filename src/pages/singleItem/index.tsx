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
      <div className="ml-6 w-1/2 space-y-2">
        <h1 className=" text-green-500 rounded p-1 font-semibold  text-sm md:text-base">
          Extra ₹{product?.mrp - product?.salesPrice} off
        </h1>
        <h1 className="font-semibold text-sm md:text-lg text-black-600 tracking-wider">
          Offer Price: ₹{product.salesPrice}.00
        </h1>

        <h1 className="line-through text-[11px] md:text-base text-gray-500">
          MRP: ₹{product.mrp}
        </h1>
      </div>
    </div>
  );
};
export default SingleItem;
