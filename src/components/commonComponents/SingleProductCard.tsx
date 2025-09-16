import { Rating } from "@mui/material";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import LazyImage from "./imageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";
import React from "react";
import ServerLazyImage from "./serverImageLazyLoading";

interface Props {
  product: any;
  productVariant: any;
}

const SingleProductCard: FC<Props> = ({ product, productVariant }) => {
  // Memoized calculations
  const discountPercentage = useMemo(() => {
    const mrp = +productVariant.mrp;
    const price = +productVariant.price;
    return ((mrp - price) / ((mrp + price) / 2)) * 100;
  }, [productVariant]);

  const productUrl = useMemo(() => {
    if (
      !product?.id ||
      !Array.isArray(product?.variants) ||
      !Array.isArray(product?.colors)
    )
      return "#";

    return `/phone/${product.id}/${productVariant?.id || ""}/${
      product.colors[0]?.id || ""
    }/${encodeURIComponent(product.productName || "")}`;
  }, [product]);

  const productName = useMemo(() => {
    if (!product?.productName) return null;

    const baseName = toPascalCase(product.productName);
    const variantInfo = product.variants?.[0]
      ? `${productVariant.ram}${
          productVariant.storage ? `/${productVariant.storage}` : ""
        }`
      : "";

    return `${baseName} ${variantInfo}`;
  }, [product]);

  const priceInfo = useMemo(() => {
    if (!Array.isArray(product?.variants) || product.variants.length === 0)
      return { price: 0, mrp: 0 };

    return {
      price: productVariant?.price || 0,
      mrp: productVariant?.mrp || 0,
    };
  }, [product?.variants]);

  const imageUrl = useMemo(
    () => product?.colors?.[0]?.images?.[0]?.key || "",
    [product?.colors]
  );

  // Early return for invalid product
  if (!product) return null;

  return (
    <Link to={productUrl}>
      <div className="p-3 md:p-6 flex flex-col space-y-2 bg-white relative rounded-md">
        <div className="flex justify-center bg-grayBackground rounded-md shadow-md p-2">
          <div className="w-full h-[150px] md:h-[170px] object-contain">
            <ServerLazyImage src={imageUrl} alt="Product Image" />
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <h1 className="w-full text-[12px] md:text-[15px] font-medium truncate">
            {productName}
          </h1>

          {discountPercentage > 0 && (
            <h1 className="absolute top-3 right-3 bg-blue-500 text-white rounded p-1 text-[10px] md:text-base">
              {Math.floor(discountPercentage)}% off
            </h1>
          )}

          <div className="flex space-x-3 items-center">
            <h1 className="font-bold tracking-wider text-[13px] md:text-[15px]">
              ₹{priceInfo.price}.00
            </h1>
            {priceInfo.mrp > priceInfo.price && (
              <h1 className="line-through text-[12px] md:text-[13px] text-gray-600">
                ₹{priceInfo.mrp}
              </h1>
            )}
          </div>

          <Rating
            precision={0.1}
            sx={{ fontSize: 12 }}
            name="read-only"
            value={product?.rating || 0}
            readOnly
          />
        </div>
      </div>
    </Link>
  );
};

export default React.memo(SingleProductCard);
