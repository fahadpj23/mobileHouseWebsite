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
      <div className="flex justify-center w-1/2">
        <div className="w-[60vw] h-[80vw] md:w-[26vw] md:h-[35vw]  items-center  ">
          <img
            src={product?.image}
            alt="product Image"
            className="w-full h-full "
          />
        </div>
      </div>
      <div className="ml-6 w-1/2">
        <div className="flex space-x-4">
          <h1 className="font-semibold text-sm md:text-lg text-green-600 tracking-wider">
            Offer Price: ₹{product.salesPrice}.00
          </h1>
          <h1 className=" bg-blue-500 text-white rounded p-1  text-xs md:text-base">
            {Math.floor(DiscountPercentage)}%off
          </h1>
        </div>
        <h1 className="line-through text-[11px] md:text-base text-red-500">
          MRP: ₹{product.mrp}
        </h1>
      </div>
    </div>
  );
};
export default SingleItem;
