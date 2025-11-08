import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchProductDetails } from "store/slice/productSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";
import { addCustomerOrder } from "store/slice/customerOrderSlice";
import OrderSuccessDialog from "./orderSuccess";

const CustomerOrder = () => {
  const { productId, productVariantId, productColorId, productName } =
    useParams();
  const [qty, setQty] = useState<any>(1);
  const dispatch = useAppDispatch();
  const [placeOrder, setPlaceOrder] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { orderProduct } = useAppSelector((state) => state?.user?.products);
  const { successMessage, orderSuccessDetails } = useAppSelector(
    (state) => state.user?.customerOrder
  );

  useEffect(() => {
    dispatch(
      fetchProductDetails({ productId, productVariantId, productColorId })
    );
  }, [productId, productVariantId, productColorId, dispatch]);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!customerDetails.name.trim()) newErrors.name = "Name is required";
    if (!customerDetails.address.trim())
      newErrors.address = "Address is required";
    if (!customerDetails.pincode.trim())
      newErrors.pincode = "Pincode is required";
    if (!customerDetails.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(customerDetails.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitOrder = () => {
    if (!validateFields()) return; // ❌ Stop if validation fails
    setPlaceOrder(true);
    const data = {
      name: customerDetails.name.trim(),
      address: customerDetails.address.trim(),
      phoneNumber: customerDetails.phoneNumber.trim(),
      pincode: customerDetails.pincode.trim(),
      phoneName:
        orderProduct?.productName +
        " " +
        orderProduct?.selectedVariant?.ram +
        "/" +
        orderProduct?.selectedVariant?.storage +
        " " +
        orderProduct?.selectedColor?.name,
      price: orderProduct?.selectedVariant?.price,
      productId,
      qty,
      productVariantId,
      productColorId,
    };

    dispatch(addCustomerOrder(data));
  };

  return (
    <div className="mt-6 h-full md:h-screen">
      {placeOrder && orderSuccessDetails && (
        <OrderSuccessDialog open={true} orderId={orderSuccessDetails?.id} />
      )}
      {orderProduct ? (
        <div className="block md:flex h-full md:h-3/5">
          {/* Product section */}
          <div className="flex w-full md:w-1/2 h-full items-center justify-center">
            <div className="w-1/3 h-[100px] md:h-[170px] object-contain">
              <ServerLazyImage
                src={orderProduct?.selectedColor?.images[0]?.url}
                alt="Product Image"
              />
            </div>
            <div className="space-y-2 font-semibold text-sm">
              <h1 className="space-x-1">
                <span>{toPascalCase(orderProduct?.productName)}</span>
                <span>
                  {`${orderProduct?.selectedVariant?.ram}/${orderProduct?.selectedVariant?.storage}`}
                </span>
                <span>{toPascalCase(orderProduct?.selectedColor?.name)}</span>
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
                      if (/^\d*$/.test(value)) {
                        setQty(value);
                      }
                    }}
                    className="border border-gray-500 w-8 text-center"
                    value={qty}
                    type="text"
                    min="1"
                    step="1"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
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

          {/* Customer form section */}
          <div className="p-2 space-y-3 mt-3 md:w-1/2">
            <div>
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
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
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
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <input
                className="border border-gray-500 rounded-sm text-sm w-full p-2"
                placeholder="Pincode"
                name="pincode"
                onChange={(e) =>
                  setCustomerDetails({
                    ...customerDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>

            <div>
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
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <button
              onClick={submitOrder}
              className="bg-orange-500 text-white text-center w-full p-2 mt-2"
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
