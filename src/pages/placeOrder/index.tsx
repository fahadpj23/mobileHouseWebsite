import React, { FC, useState } from "react";
import { database } from "../../firebase";
import { ref, push } from "firebase/database";
import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";

const PlaceOrder: FC<any> = ({ setProductAdd }) => {
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  //product add
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const db = getFirestore(app);
    const dbRef = ref(database, "products");

    const userData = {
      id: Date.now(),
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
  console.log(shippingDetails);
  const inputBox = (name: string, type: string, placeholder: string) => (
    <input
      onChange={(e) =>
        setShippingDetails({ ...shippingDetails, [name]: e?.target?.value })
      }
      id={name}
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-400 rounded-sm p-2 text-sm"
    />
  );

  return (
    <div className="flex">
      <div className="w-5/12 p-2">
        <div className="flex flex-col items-center">
          <div className="w-10/12 p-5 space-y-4 mt-5">
            <h1 className="text-lg font-semibold">Shipping Address</h1>
            <div className="flex flex-col space-y-2">
              {inputBox("name", "text", "enter Your name")}
              {inputBox("phone", "number", "enter Your phone number")}
              {inputBox("email", "text", "enter Your email")}
              <textarea
                value={shippingDetails?.address}
                onChange={(e) =>
                  setShippingDetails({
                    ...shippingDetails,
                    address: e?.target?.value,
                  })
                }
                placeholder="Enter your address"
                rows={4}
                className="w-full border border-gray-400 rounded-sm p-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
