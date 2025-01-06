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
  specialOfferproducts: any;
  newArrivalproducts: any;
  Trendingproducts: any;
}

// Create a default context value
const defaultContext: ProductContextType = {
  products: [],
  specialOfferproducts: [],
  newArrivalproducts: [],
  Trendingproducts: [],
};

// Create the context
export const ProductContext = createContext<ProductContextType>(defaultContext);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<any>([]);
  const [specialOfferproducts, setSpecialOfferproducts] = useState<any>([]);
  const [newArrivalproducts, setNewArrivalproducts] = useState<any>([]);
  const [Trendingproducts, setTrendingproducts] = useState<any>([]);

  const fetchSpecialOfferProduct = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const dbquery = query(dbRef, orderByChild("specialOffer"), equalTo(true));
    const snapshot = await get(dbquery);

    if (snapshot.exists()) {
      setSpecialOfferproducts(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  const fetchAllProducts = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);

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
      setNewArrivalproducts(Object.values(snapshot.val()));
      // console.log(Array(data)?.length ? getNewArrivalPhones(data) : "Dsd");
    } else {
      alert("error");
    }
  };
  const fetchTrendingOfferProduct = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const dbquery = query(dbRef, orderByChild("trendingPhone"), equalTo(true));
    const snapshot = await get(dbquery);

    if (snapshot.exists()) {
      setTrendingproducts(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    fetchSpecialOfferProduct();
    fetchTrendingOfferProduct();
    fetchNewArrivalProduct();
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        newArrivalproducts,
        specialOfferproducts,
        Trendingproducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
