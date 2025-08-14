import { Divider } from "@mui/material";
import { FaShare } from "react-icons/fa";
import { getSpecificationIcon } from "utils/getSpecificationIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDiscountPercentage } from "utils/getDiscountPercentage";
import { RiWhatsappFill } from "react-icons/ri";
import { useScreenSize } from "hooks/useScreenSize";
import ProductImageSlider from "components/commonComponents/productImageSlider";
import { toPascalCase } from "utils/pascalCaseConvert";

import { getProductById } from "store/slice/productSlice";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";

const SingleItem = () => {
  const { productId, productVariantId, productColorId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { entity } = useAppSelector((state) => state.user.products);
  const [product, setProduct] = useState<any>(entity);
  const [variantDetails, setVariantDetails] = useState<any>({});

  const [selectedColorsDetails, setSelectedColorsDetails] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [isLoading, setIsLoading] = useState<any>(true);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [productId]);

  useEffect(() => {
    entity && Object.keys(entity).length && setProduct(entity);
  }, [entity]);

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

  const handlePreOrder = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLScQbFBroPDJj6-9FSwM9bETZziMVYwh84JDgiMFzSy8PLoyLQ/viewform?usp=header",
      "_blank"
    );
  };

  const handleColor = (id: number) => {
    setIsLoading(true);
    setSelectedImage("");
    setSelectedColorsDetails({});
    navigate(
      `/phone/${product?.id}/${productVariantId}/${id}/${encodeURIComponent(
        product?.productName
      )}`
    );
  };

  const handleVariant = (id: number) => {
    setIsLoading(true);
    navigate(
      `/phone/${productId}/${id}/${productColorId}/${encodeURIComponent(
        product?.productName
      )}`
    );
  };

  const displaySpecification = (name: string, value: string | number) => {
    return (
      <div className="flex items-center space-x-2 text-xs md:text-base">
        <div>{getSpecificationIcon(name)}</div>
        <div>
          <h1 className="text-gray-500">{name}</h1>
          <h1>{value}</h1>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (
      product &&
      Object.keys(product).length &&
      productColorId &&
      Array.isArray(product?.colors)
    ) {
      const colorValue = productColorId;
      const colorInfo = product?.colors.find(
        (color: any) => color.id === colorValue
      );
      setSelectedColorsDetails(colorInfo);
    }
  }, [productColorId, productId, product]);

  useEffect(() => {
    if (
      product &&
      Object.keys(product).length &&
      productVariantId &&
      Array.isArray(product?.variants)
    ) {
      const variantInfo = product?.variants.find(
        (variant: any) => variant.id === productVariantId
      );
      setVariantDetails(variantInfo);
    }
  }, [productId, productVariantId, product]);

  return (
    <div className="block md:flex items-center ">
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen fixed top-0 left-0 w-screen z-50 bg-white">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {product && Object.keys(product).length && (
        <>
          <div className="flex justify-center w-full md:w-1/2 ">
            <div className=" flex flex-col justify-center items-center ">
              <div className=" p-3 w-screen mb-3 flex justify-center ">
                {isMobile && selectedColorsDetails ? (
                  <ProductImageSlider productImages={selectedColorsDetails} />
                ) : (
                  <div className="w-[80vw] h-[50vh] md:w-[30vw] md:h-[30vw] flex justify-center items-center   ">
                    <div className="w-full h-full ">
                      <ServerLazyImage
                        src={
                          selectedImage
                            ? selectedImage?.url
                            : selectedColorsDetails &&
                              selectedColorsDetails?.images &&
                              selectedColorsDetails?.images[0]?.url
                        }
                        alt={`${product?.name} Image `}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex space-x-3 justify-center w-full ">
                {!isMobile &&
                  selectedColorsDetails?.images?.map((image: any) => {
                    return (
                      <button
                        onClick={() => setSelectedImage(image)}
                        key={image}
                        className="p-1 border border-gray-300 rounded-md w-10 h-14 md:w-20 md:h-16 "
                      >
                        <div className="w-full h-full object-contain">
                          <ServerLazyImage
                            src={image?.url}
                            alt="phone image "
                          />
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className=" w-full md:w-1/2 mt-0 md:mt-10 ">
            <div className="space-y-2 ml-3 md:ml-6">
              <h1 className="font-semibold truncate w-full text-[15px] md:text-base flex items-center space-x-1">
                <span>
                  {product?.productName && toPascalCase(product?.productName)}
                </span>
                <span>{variantDetails?.ram}/</span>
                <span>{variantDetails?.storage}</span>
                <span>
                  {selectedColorsDetails?.name &&
                    toPascalCase(selectedColorsDetails?.name)}
                </span>
              </h1>
              <div className="flex items-center space-x-2 text-base">
                <h1 className="font-semibold   tracking-wide text-[16px]">
                  ₹{variantDetails?.price}.00
                </h1>

                <h1 className="line-through text-gray-500 text-xs">
                  MRP: ₹{variantDetails?.mrp}
                </h1>
                <h1 className=" text-[#11a453] text-[18px] rounded p-1 font-semibold  text-sm md:text-base">
                  {product &&
                    variantDetails &&
                    getDiscountPercentage(
                      +variantDetails?.price,
                      +variantDetails?.mrp
                    )}
                  % off
                </h1>
                <FaShare
                  className="text-blue-500"
                  onClick={() => handleWhatapp(product)}
                />
              </div>
              {product?.prebook && (
                <button
                  onClick={handlePreOrder}
                  className="bg-orange-500 rounded-sm  text-white  text-sm my-2 p-1  w-fit "
                >
                  Prebook Now
                </button>
              )}
            </div>
            <div>
              <RiWhatsappFill
                onClick={() => handleWhatapp(product)}
                className="fixed bottom-10 right-10 text-green-600 z-50 text-[40px] animate-bounce shadow-2xl "
              />
            </div>

            <div className="flex flex-col">
              {Array.isArray(product?.colors) ? (
                <div>
                  <div className="flex space-x-6 ml-6 mt-6 ">
                    {product?.colors?.map((color: any) => {
                      return (
                        <button
                          key={color?.id}
                          onClick={() => handleColor(color?.id)}
                          className=" flex flex-col items-center "
                        >
                          <div className="w-10 h-16 md:w-16 ">
                            <div
                              key={color?.images[0]?.url}
                              className="w-full h-full object-contain"
                            >
                              <ServerLazyImage
                                src={color?.images[0]?.url}
                                alt="phone image "
                              />
                            </div>
                          </div>
                          <h1 className="text-[12px] md:text-[14px] font-semibold capitalize">
                            {color?.name && toPascalCase(color?.name)}
                          </h1>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 py-3 ml-2 mt-5 text-center">
                {product?.variants?.map((variant: any) => (
                  <button
                    key={variant?.id}
                    onClick={() => handleVariant(variant?.id)}
                    className={`p-1 border ${
                      productVariantId === variant?.id
                        ? "border-2 border-blue-500"
                        : "border border-gray-400"
                    } text-[12px] rounded-xs`}
                  >
                    {`${variant?.ram}GB | ${variant?.storage}GB`}
                  </button>
                ))}
              </div>

              <div className=" pb-3">
                <div className="space-y-3 py-3">
                  <h1 className="font-semibold ml-3 md:ml-6">Specifications</h1>
                  <Divider sx={{ width: "100%" }} />
                </div>
                <div className="space-y-3 ml-3 md:ml-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {displaySpecification("Display", product?.display)}
                  {displaySpecification("Processor", product?.processor)}
                  {displaySpecification(
                    "Rear Camera",
                    `${product?.rearCamera} MP`
                  )}
                  {displaySpecification(
                    "Front Camera",
                    `${product?.frontCamera} MP`
                  )}
                  {displaySpecification("Battery", `${product?.battery}`)}
                  {displaySpecification("Network", product?.networkType)}
                  {displaySpecification("OS", product?.os)}
                  {displaySpecification(
                    "RAM | Storage",
                    `${variantDetails?.ram} Gb | ${variantDetails?.storage} Gb`
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default SingleItem;
