import { getNewArrivalPhones } from "utils/getNewArrival";
import app from "constants/firebaseCofig";

import {
  endAt,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import React, { createContext, useState, ReactNode, useEffect } from "react";

// Define a Product type
export interface Product {
  id: number;
  name: string;
  price: number;
}

// Define the context type
interface ProductContextType {
  products: Product[];
}

// Create a default context value
const defaultContext: ProductContextType = {
  products: [],
};

// Create the context
export const ProductContext = createContext<ProductContextType>(defaultContext);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchSpecialOfferProduct = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const dbquery = query(dbRef, orderByChild("specialOffer"), equalTo(true));
    const snapshot = await get(dbquery);

    if (snapshot.exists()) {
      setProducts(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  const fetchNewArrivalProduct = async () => {
    const db = getDatabase(app);
    const dbquery = ref(db, "products");
    const snapshot = await get(dbquery);

    if (snapshot.exists()) {
      const products = Object.values(snapshot.val());
      products?.length ? setProducts(getNewArrivalPhones(products)) : [];
      console.log(getNewArrivalPhones(products));
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchNewArrivalProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
