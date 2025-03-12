import React, { FC, useEffect, useState } from "react";
import { database } from "../../firebase";
import { ref, push } from "firebase/database";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import { useParams } from "react-router-dom";
import { getProductDetails } from "utils/getProductDetails";
import LazyImage from "components/commonComponents/imageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";

const PlaceOrder: FC<any> = ({ setProductAdd }) => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<any>("");
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleSubmit = () => {
    const dbRef = ref(database, "order");

    const userData = {
      id: Date.now(),
      name: shippingDetails?.name,
      phone: shippingDetails?.phone,
      email: shippingDetails?.email,
      address: shippingDetails?.address,
    };

    // Add data to the database
    push(dbRef, userData)
      .then(() => {
        console.log("Data added successfully!");
        setProductAdd(false);
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
      });
  };

  useEffect(() => {
    productId && setProductDetails(getProductDetails(productId));
  }, [productId]);

  const inputBox = (name: string, type: string, placeholder: string) => (
    <input
      onChange={(e) =>
        setShippingDetails({ ...shippingDetails, [name]: e?.target?.value })
      }
      id={name}
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-400 rounded-sm p-2 text-sm rounded-sm"
    />
  );

  return (
    <div className="flex flex-col-reverse md:flex mt-6 p-5 ">
      <div className="w-full md:w-5/12 ">
        <div className="flex flex-col items-center w-full">
          <div className="w-full md:w-10/12 space-y-4 mt-5">
            <h1 className="text-lg font-semibold">Shipping Address</h1>
            <div className="flex flex-col space-y-4">
              {inputBox("name", "text", "name")}
              {inputBox("phone", "number", " phone number")}
              {inputBox("email", "text", " email")}
              <textarea
                value={shippingDetails?.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e?.target?.value,
                  })
                }
                placeholder=" address"
                rows={4}
                className="w-full border border-gray-400 rounded-sm p-2 text-sm rounded-sm"
              />
              {inputBox("pincode", "number", " pincode")}
              {inputBox("city", "text", " city")}
              {inputBox("state", "text", " state")}
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white p-2"
              >
                place order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 p-2 space-y-5">
        <h1 className="font-semibold text-lg">Your Order</h1>
        <div className="flex space-x-2">
          <div className="w-auto h-[20vw] md:h-[20vw]  ">
            <LazyImage
              src={productDetails?.image}
              alt="phone Image"
              fill={true}
            />
          </div>
          <div className="flex flex-col space-y-1 ">
            <h1 className="font-semibold  text-sm">
              {productDetails?.name && toPascalCase(productDetails?.name)}
            </h1>
            <h1 className="flex space-x-5 items-center  text-xs">
              <span className="font-semibold">
                ₹{productDetails?.salesPrice}.00
              </span>
            </h1>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="flex w-full justify-between text-xs">
            <span>Subtotal</span>
            <span>{productDetails?.salesPrice}.00</span>
          </h1>
          <h1 className="flex w-full justify-between text-xs">
            <span>Shipping Charge</span>
            <span>Free</span>
          </h1>
          <h1 className="flex w-full justify-between font-semibold">
            <span>Total</span>
            <span>{productDetails?.salesPrice}.00</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
