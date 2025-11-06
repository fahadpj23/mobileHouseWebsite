import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchProductDetails } from "store/slice/productSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";
import { addCustomerOrder } from "store/slice/customerOrderSlice";
const CustomerOrder = () => {
  const { productId, productVariantId, productColorId, productName } =
    useParams();
  const [qty, setQty] = useState<any>(1);
  const dispatch = useAppDispatch();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    pincode: "",
  });
  const { orderProduct } = useAppSelector((state) => state?.user?.products);

  useEffect(() => {
    dispatch(
      fetchProductDetails({ productId, productVariantId, productColorId })
    );
  }, [productId, productVariantId, productColorId]);

  const submitOrder = () => {
    const data = {
      name: customerDetails.name,
      address: customerDetails.address,
      phone: customerDetails.phoneNumber,
      pincode: customerDetails.pincode,
      phoneId:
        orderProduct.productName +
        " " +
        orderProduct?.selectedVariant?.ram +
        "/" +
        orderProduct?.selectedVariant?.storage +
        "  " +
        "  " +
        orderProduct?.selectedColor?.name,
      price: orderProduct?.selectedVariant?.price,
      productId,
      productVariantId,
      productColorId,
      // phoneName: data.PhoneName,
      // price: data.price,
      // createdAt: new Date(),
    };
    console.log(data);
    // dispatch(addCustomerOrder(data));
  };
  console.log(customerDetails);
  console.log(orderProduct);
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
            <div className="space-y-2 font-semibold text-sm">
              <h1 className="space-x-1 ">
                <span>{`${toPascalCase(orderProduct?.productName)}`} </span>

                <span>
                  {`${orderProduct?.selectedVariant?.ram}/${orderProduct?.selectedVariant?.storage}`}
                </span>
                <span> {toPascalCase(orderProduct?.selectedColor?.name)}</span>
              </h1>

              <h1 className="text-green-500 font-semibold">
                ₹{orderProduct?.selectedVariant?.price}
              </h1>
              <div className="flex space-x-2">
                <h1>qty:</h1>
                <div className="flex space-x-1">
                  <button
                    onClick={() => (qty - 1 > 0 ? setQty(+qty - 1) : qty)}
                    className="bg-red-500 text-white text-xl w-8 text-center"
                  >
                    -
                  </button>
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      // Ensure it's a positive integer
                      if (/^\d*$/.test(value)) {
                        setQty(value);
                      }
                    }}
                    className="border border-gray-500 w-8 text-center"
                    value={qty}
                    type="text"
                    min="1" // Minimum value
                    step="1" // Only whole numbers
                    onKeyPress={(e) => {
                      // Prevent non-digit characters
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <button
                    onClick={() => setQty(+qty + 1)}
                    className="bg-green-500 text-white text-xl w-8"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 space-y-2 mt-3">
            <input
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="Name"
              name="name"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <textarea
              rows={3}
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="Address"
              name="address"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="pincode"
              name="pincode"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              name="phoneNumber"
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  [e.target.name]: e.target.value,
                })
              }
              className="border border-gray-500 rounded-sm text-sm w-full p-2"
              placeholder="Phone number"
            />
            <button
              onClick={submitOrder}
              className="bg-orange-500 text-white text-center w-full p-2 "
            >
              Place Order
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default CustomerOrder;
