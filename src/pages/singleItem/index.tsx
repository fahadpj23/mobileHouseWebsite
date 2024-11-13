import { Divider } from "@mui/material";
import { getSpecificationIcon } from "utils/getSpecificationIcon";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetails } from "utils/getProductDetails";
import { getDiscountPercentage } from "utils/getDiscountPercentage";
import { RiWhatsappFill } from "react-icons/ri";

const SingleItem = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>("");
  const [productImages, setProductImages] = useState<any>();
  const [displayImage, setDisplayImage] = useState<any>();

  useEffect(() => {
    productId && setProduct(getProductDetails(productId));
  }, [productId]);

  useEffect(() => {
    if (product) {
      product?.colors && setProductImages(product?.colors[0]);
      setDisplayImage(
        product?.colors ? product?.colors[0]?.images[0] : product?.image
      );
    }
  }, [product]);

  const handleColor = (color: any) => {
    setProductImages(color);
    setDisplayImage(color?.images[0]);
  };

  const handleWhatapp = (product: any) => {
    const phoneNumber = "8304830868";
    const currentURL = window.location.href;
    const encodedMessage = encodeURIComponent(
      `${product?.name}
    Check out this link: ${currentURL}`
    );
    const whatsappURL = `https://wa.me/+91${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };
  return (
    <div className="block md:flex items-center ">
      {product && (
        <>
          <div className="flex justify-center w-full md:w-1/2 ">
            <div className=" flex flex-col justify-center items-center ">
              <div className=" p-3 w-screen mb-3 flex justify-center">
                <div className="w-[50vw] h-[85vw] md:w-[26vw] md:h-[25vw] flex justify-center items-center  ">
                  <img
                    src={displayImage}
                    alt={`${product?.name} Image `}
                    className="w-full h-full object-contain "
                    id="mainImage"
                  />
                </div>
              </div>
              <div className="flex space-x-3 justify-center w-full ">
                {productImages?.images?.map((image: any) => {
                  return (
                    <button
                      key={image}
                      onClick={() => setDisplayImage(image)}
                      className="p-1 border border-gray-300 rounded-md w-10 h-14 md:w-20 md:h-16 "
                    >
                      <img
                        src={image}
                        alt={`productImage `}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" w-full md:w-1/2 mt-5 md:mt-20 ">
            <div className="space-y-2 ml-3 md:ml-6">
              <h1 className="font-semibold truncate w-full text-[18px] md:text-base">
                {product?.name} {productImages?.name}
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
            <RiWhatsappFill
              onClick={() => handleWhatapp(product)}
              className="fixed bottom-10 right-10 text-green-600 z-50 text-[40px] animate-bounce shadow-2xl "
            />

            <div className="flex flex-col">
              {product?.colors && (
                <div>
                  <div className="flex space-x-5 ml-6 mt-6 ">
                    {product?.colors?.map((color: any) => {
                      return (
                        <button
                          key={color?.images[0]}
                          onClick={() => handleColor(color)}
                          className=" flex flex-col items-center "
                        >
                          <div className="w-10 h-16 md:w-16 ">
                            <img
                              src={color?.images[0]}
                              className="w-full h-full object-contain "
                              alt="phone image"
                            />
                          </div>
                          <h1 className="text-[13px] font-semibold">
                            {color?.name}
                          </h1>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {product?.specifications && (
                <div className=" pb-3">
                  <div className="space-y-3 py-3">
                    <h1 className="font-semibold ml-3 md:ml-6">
                      Specifications
                    </h1>
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
                              <div>
                                {getSpecificationIcon(specification[0])}
                              </div>
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
          </div>
        </>
      )}
    </div>
  );
};
export default SingleItem;
