import app from "constants/firebaseCofig";
import { get, getDatabase, ref } from "firebase/database";
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

  const fetchProduct = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "products");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      console.log(Object.values(snapshot.val()));
      setProducts(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  console.log("Dsd");
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};
