import SingleProductCard from "components/commonComponents/singleProductCard";
import { FetchProductTypeItems } from "utils/fetchproductTypeItems";
import { PRODUCT_TYPES } from "constants/productType";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductType = () => {
  const [productTypeSelected, setProductTypeSelected] = useState(
    PRODUCT_TYPES[0]
  );
  const [products, setProducts] = useState(FetchProductTypeItems("newArrival"));

  useEffect(() => {
    setProducts(FetchProductTypeItems(productTypeSelected?.link));
  }, [productTypeSelected]);
  return (
    <div className="my-8">
      <div className="flex justify-center space-x-3">
        {PRODUCT_TYPES?.map((productType) => {
          return (
            <button
              onClick={() => setProductTypeSelected(productType)}
              className={`${
                productTypeSelected?.link === productType?.link
                  ? "bg-productTypeGreenBackground text-white border-none"
                  : "bg-white text-black border-2 border-gray-200"
              } py-2 px-4 rounded-3xl  tracking-wide text-[12px] md:text-base `}
            >
              {productType?.name}
            </button>
          );
        })}
      </div>
      <div className=" grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5 items-center">
        {products?.length &&
          products?.map((product: any) => (
            <SingleProductCard key={product?.name} product={product} />
          ))}
      </div>
      <div className="flex justify-center w-full">
        <Link
          to={productTypeSelected?.link}
          className="bg-gray-600 rounded-xl text-white justify-center p-2"
        >
          View More Products
        </Link>
      </div>
    </div>
  );
};
export default ProductType;
