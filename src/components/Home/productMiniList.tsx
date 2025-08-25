import SingleProductCard from "components/commonComponents/singleProductCard";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PHONEMODEL } from "model/phoneModel";

interface props {
  title: string;
  listItems: PHONEMODEL[];
  link: string;
}
const ProductMiniList: FC<props> = ({ title, listItems, link }) => {
  return (
    <div className="">
      <div className="flex justify-between pb-2 items-center ">
        <h1 className="font-semibold text-sm md:text-lg ">{title}</h1>
        <div className="flex space-x-1 text-xs items-center">
          <Link to={`Phones${link}`} className="text-blue-600">
            show more
          </Link>
        </div>
      </div>
      {Array.isArray(listItems) && listItems?.length ? (
        <>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
            {listItems?.slice(0, 6).map((product: PHONEMODEL) => (
              <SingleProductCard key={product?.name} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
          {[...Array(6)].map((key) => (
            <div
              key={key}
              className=" p-3 md:p-6 flex flex-col space-y-2  bg-white relative rounded-md animate-pulse"
            >
              <div className="flex justify-center rounded-md shadow-md p-2">
                <div className="w-full h-[150px]  md:h-[170px] object-contain  bg-gray-100"></div>
              </div>
              <div className="flex flex-col space-y-1">
                <h1 className="  w-full text-[12px] md:text-[15px] font-medium truncate">
                  <div className="w-11 bg-gray-100"></div>
                  <div className="w-8 bg-gray-100"></div>
                  <div className="w-8 bg-gray-100"></div>
                </h1>

                <div className="flex space-x-3 items-center">
                  <h1 className="font-bold tracking-wider text-[13px] md:text-[15px] ">
                    <div className="w-8 bg-gray-100"></div>
                  </h1>
                  <h1 className="line-through text-[12px] md:text-[13px] text-gray-600">
                    <div className="w-8 bg-gray-100"></div>
                  </h1>
                </div>
                <div className="w-8 bg-gray-100"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductMiniList;
