import { Divider } from "@mui/material";
import { getSpecificationIcon } from "utils/getSpecificationIcon";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetails } from "utils/getProductDetails";
import { getDiscountPercentage } from "utils/getDiscountPercentage";
const SingleItem = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>("");

  useEffect(() => {
    productId && setProduct(getProductDetails(productId));
  }, [productId]);

  return (
    <div className="block md:flex items-center ">
      {product && (
        <>
          <div className="flex justify-center w-full md:w-1/2 ">
            <div className=" bg-grayBackground p-3 w-screen mb-3 flex justify-center">
              <div className="w-[70vw] h-[70vw] md:w-[26vw] md:h-[30vw] flex justify-center items-center ">
                <img
                  src={product?.image}
                  alt={`${product?.name} Image `}
                  className="w-full h-full "
                />
              </div>
            </div>
          </div>
          <div className=" w-full md:w-1/2 mt:0 md:mt-20 ">
            <div className="space-y-2 ml-3 md:ml-6">
              <h1 className="font-semibold truncate w-full text-sm md:text-base">
                {product?.name}
              </h1>
              <div className="flex items-center space-x-2 text-sm md:text-base">
                <h1 className="font-semibold  text-green-600 tracking-wide">
                  ₹{product.salesPrice}.00
                </h1>

                <h1 className="line-through  text-red-500 text-xs">
                  MRP: ₹{product.mrp}
                </h1>
                <h1 className=" text-[#11a453] rounded p-1 font-semibold  text-sm md:text-base">
                  {product && getDiscountPercentage(product)}% off
                </h1>
              </div>
            </div>
            {product?.specifications && (
              <div className=" pb-3">
                <div className="space-y-3 py-3">
                  <h1 className="font-semibold ml-3 md:ml-6">Specifications</h1>
                  <Divider sx={{ width: "100%" }} />
                </div>
                <div className="space-y-3 ml-3 md:ml-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {product &&
                    Object.entries(product?.specifications).map(
                      (specification: any) => {
                        return (
                          <div
                            key={specification[0]}
                            className="flex items-center space-x-2 text-xs md:text-base"
                          >
                            <div>{getSpecificationIcon(specification[0])}</div>
                            <div>
                              <h1 className="text-gray-500">
                                {specification[0]}
                              </h1>
                              <h1>{specification[1]}</h1>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default SingleItem;
