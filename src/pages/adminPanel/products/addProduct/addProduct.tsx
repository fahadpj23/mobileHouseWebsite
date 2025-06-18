import { useEffect, useState } from "react";

import { useAppDispatch } from "hooks/useRedux";
import { addproducts } from "store/slice/products/productSlice";

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<any>({
    name: "54",
    ram: "5",
    storage: "10",
    price: "45000",
    mrp: "50000",
    brand: "vivo",
    series: "vivo",
    networkType: "5g",
    category: "1",
    display: "6",
    frontCamera: "4",
    rearCamera: "5",
    os: "d",
    processor: "f",
    battery: "54",
  });

  const submitForm = async () => {
    // 1. Create a FormData object
    // This is flexible and works for both text data and file uploads.
    const productData: any = new FormData();

    // 2. Append all key-value pairs from our state to the FormData object
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    // productData.append("file", file);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      // 3. Send the POST request using fetch
      dispatch(addproducts(productData));
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      console.log(false);
    }
  };

  return (
    <div className="flex space-x-3">
      <button onClick={submitForm} className="bg-red-500">
        form submit
      </button>
      <form></form>
    </div>
  );
};

export default AddProduct;
