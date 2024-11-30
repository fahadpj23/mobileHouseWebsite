import { Divider } from "@mui/material";
import { getSpecificationIcon } from "utils/getSpecificationIcon";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetails } from "utils/getProductDetails";
import { getDiscountPercentage } from "utils/getDiscountPercentage";
import { RiWhatsappFill } from "react-icons/ri";
import { useScreenSize } from "hooks/useScreenSize";
import ProductImageSlider from "components/commonComponents/productImageSlider";
import { getPhoneVariants } from "utils/getPhoneVariants";
import { toPascalCase } from "utils/pascalCaseConvert";
import { getProductImage } from "utils/getProductImages";

const SingleItem = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>("");
  const [productImages, setProductImages] = useState<any>();
  const [displayImage, setDisplayImage] = useState<any>();
  const [productColors, setProductColors] = useState<any>([]);
  const [phoneVariants, setPhoneVariants] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    productId && setProduct(getProductDetails(productId));
  }, [productId]);

  useEffect(() => {
    if (product) {
      const colors = getProductImage(product?.id);
      if (colors?.length) {
        setProductColors(colors);
        setProductImages(colors[0]);
        setDisplayImage(colors[0]?.images[0]);
      } else {
      }
      product?.colors && setProductImages(product?.image);
      setDisplayImage(product?.image);
    }
  }, [product]);

  useEffect(() => {
    product?.series && setPhoneVariants(getPhoneVariants(product?.series));
  }, [product]);

  const handleColor = (color: any) => {
    setIsLoading(true);
    setProductImages(color);
    setDisplayImage(color?.images[0]);
  };

  const handleWhatapp = (product: any) => {
    const phoneNumber = "8304830868";
    const currentURL = window.location.href;
    const encodedMessage = encodeURIComponent(`${product?.name}
    Check out this link: ${currentURL}`);
    const whatsappURL = `https://wa.me/+91${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [isLoading]);

  return (
    <div className="block md:flex items-center ">
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen fixed top-0 left-0 w-screen z-50 bg-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {product && (
        <>
          <div className="flex justify-center w-full md:w-1/2 ">
            <div className=" flex flex-col justify-center items-center ">
              <div className=" p-3 w-screen mb-3 flex justify-center">
                {isMobile && !isLoading && productImages?.images?.length ? (
                  <ProductImageSlider productImages={productImages} />
                ) : (
                  <div className="w-[50vw] h-[85vw] md:w-[26vw] md:h-[25vw] flex justify-center items-center  ">
                    <img
                      src={displayImage}
                      alt={`${product?.name} Image `}
                      className="w-full h-full object-contain "
                      id="mainImage"
                    />
                  </div>
                )}
              </div>
              <div className="flex space-x-3 justify-center w-full ">
                {!isMobile &&
                  productImages?.images?.map((image: any) => {
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
          <div className=" w-full md:w-1/2 mt-0 md:mt-20 ">
            <div className="space-y-2 ml-3 md:ml-6">
              <h1 className="font-semibold truncate w-full text-[15px] md:text-base flex items-center space-x-1">
                <span>{product?.name} </span>
                <span> {productImages?.name}</span>
              </h1>
              <div className="flex items-center space-x-2 text-base">
                <h1 className="font-semibold   tracking-wide text-[16px]">
                  ₹{product.salesPrice}.00
                </h1>

                <h1 className="line-through text-gray-500 text-xs">
                  MRP: ₹{product.mrp}
                </h1>
                <h1 className=" text-[#11a453] text-[18px] rounded p-1 font-semibold  text-sm md:text-base">
                  {product && getDiscountPercentage(product)}% off
                </h1>
              </div>
            </div>
            <RiWhatsappFill
              onClick={() => handleWhatapp(product)}
              className="fixed bottom-10 right-10 text-green-600 z-50 text-[40px] animate-bounce shadow-2xl "
            />

            <div className="flex flex-col">
              {productColors?.length && (
                <div>
                  <div className="flex space-x-6 ml-6 mt-6 ">
                    {productColors?.map((color: any) => {
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
                          <h1 className="text-[12px] md:text-[14px] font-semibold capitalize">
                            {color?.name && toPascalCase(color?.name)}
                          </h1>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 py-3 ml-2 mt-5 text-center">
                {phoneVariants?.map((variant: any) => (
                  <Link
                    onClick={() => setIsLoading(true)}
                    replace
                    key={variant?.id}
                    to={`/phone/${variant?.id}/${encodeURIComponent(
                      variant?.name
                    )}`}
                    className={`p-1 border ${
                      product?.id === variant?.id
                        ? "border-2 border-blue-500"
                        : "border border-gray-400"
                    } text-[12px] rounded-xs`}
                  >
                    {variant?.specifications?.["RAM | Storage"]}
                  </Link>
                ))}
              </div>
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
