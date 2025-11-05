import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchProductDetails } from "store/slice/productSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";
const CustomerOrder = () => {
  const { productId, productVariantId, productColorId, productName } =
    useParams();
  const [qty, setQty] = useState<any>(1);
  const dispatch = useAppDispatch();
  const { orderProduct } = useAppSelector((state) => state?.user?.products);

  useEffect(() => {
    dispatch(
      fetchProductDetails({ productId, productVariantId, productColorId })
    );
  }, [productId, productVariantId, productColorId]);

  return (
    <div className="mt-6 h-full md:h-screen">
      {orderProduct ? (
        <div className="block md:flex h-full md:h-3/5 ">
          <div className="flex w-full md:w-1/2 h-full items-center justify-center">
            <div className="w-1/3 h-[100px] md:h-[170px] object-contain">
              <ServerLazyImage
                src={orderProduct?.selectedColor?.images[0]?.url}
                alt="Product Image"
              />
            </div>
            <div className="space-y-2">
              <h1 className="space-x-2">
                <span>{`${toPascalCase(orderProduct?.productName)}`} </span>

                <span>
                  {`${orderProduct?.selectedVariant?.ram}/${orderProduct?.selectedVariant?.storage}`}
                </span>
              </h1>
              <h1 className="text-green-500 font-semibold">
                ₹{orderProduct?.selectedVariant?.price}
              </h1>
              <div className="flex space-x-2">
                <h1>qty:</h1>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    // Ensure it's a positive integer
                    if (/^\d*$/.test(value)) {
                      setQty(value);
                    }
                  }}
                  className="border border-gray-500"
                  value={qty}
                  type="number"
                  min="1" // Minimum value
                  step="1" // Only whole numbers
                  onKeyPress={(e) => {
                    // Prevent non-digit characters
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-2 space-y-2 mt-3">
            <input
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="Name"
            />
            <textarea
              rows={3}
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="Address"
            />
            <input
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="pincode"
            />
            <input
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="Phone number"
            />
            <button className="bg-orange-500 text-white text-center w-full p-2 ">
              Place Order
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default CustomerOrder;
