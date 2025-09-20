import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
  isFulfilled,
} from "@reduxjs/toolkit";
import axiosInstance from "services/api";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// Define the initial state for the user
interface UserState {
  loading: boolean;
  entities: any | null; // Type based on your API response
  error: string | null;
  entity: any;
  successMessage: string;
  newArrival: any;
  specialOffer: any;
  trendingPhone: any;
  colors: any;
  variants: any;
  searchProduct: any;
  deleteMessage: any;
}

// Initial state
const initialState: UserState = {
  loading: false,
  entities: null,
  error: null,
  entity: null,
  successMessage: "",
  newArrival: [],
  specialOffer: [],
  trendingPhone: [],
  colors: [],
  variants: [],
  searchProduct: [],
  deleteMessage: [],
};

const formatDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Async thunk to fetch products data
export const fetchSeriesProducts = createAsyncThunk(
  "products/getSeriesProduct",
  async (seriesId: string) => {
    const q = query(
      collection(db, "products"),
      where("seriesId", "==", seriesId)
    );

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  }
);

export const fetchBrandProducts = createAsyncThunk(
  "products/getBrandProduct",
  async (brandName: string) => {
    console.log("Fdf");
    const brandNameTrim = brandName.trim().toLowerCase();

    const q = query(
      collection(db, "products"),
      where("brand", "==", brandNameTrim)
    );

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "products/getSearchProduct",
  async (searchValue: string) => {
    // const response = await axiosInstance.get(`search-product`, {
    //   params: { searchValue },
    // });
    // return response.data;
    const cleanedSearch = searchValue.trim().toLowerCase();

    const snapshot = await getDocs(collection(db, "products"));

    const products = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((product: any) => {
        const name = (product.productName || "").trim().toLowerCase();
        return name.includes(cleanedSearch);
      });

    return products;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async (_, { rejectWithValue }) => {
    try {
      const productsRef = collection(db, "products");

      const q = query(productsRef, orderBy("createdAt", "desc")); // sort by created date
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error: any) {
      console.error("❌ fetchProducts error:", error);
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

export const getNewArrivalProduct = createAsyncThunk(
  "products/getNewArrivalProduct",
  async () => {
    const currentDate = new Date();
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setMonth(currentDate.getMonth() - 4);

    const currentDateStr = formatDateString(currentDate);
    const fourMonthsAgoStr = formatDateString(fourMonthsAgo);

    // ✅ Build query
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("launchDate", ">=", fourMonthsAgoStr),
      where("launchDate", "<=", currentDateStr),
      orderBy("launchDate", "desc")
    );

    const snapshot = await getDocs(q);

    const products: any[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;

    // Return response
  }
);

export const getSpecialOffer = createAsyncThunk(
  "products/getSpecialOffer",
  async () => {
    const response = await axiosInstance.get(`products/specialOffer`);
    return response.data;
  }
);
export const getTrendingPhone = createAsyncThunk(
  "products/getTrendingPhone",
  async () => {
    const productsRef = collection(db, "products");

    // ✅ Firestore numeric comparison
    const q = query(productsRef, where("rating", ">", 4.2));

    const snapshot = await getDocs(q);

    const products: any[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: string) => {
    const docRef = doc(db, "products", id); // 🔹 points to /products/{id}
    const docSnap: any = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // ✅ return product object
    } else {
      throw new Error("Product not found"); // ❌ handle missing product
    }
  }
);

export const getProductByIdEdit = createAsyncThunk(
  "products/getProductByIdEdit",
  async (id: string | number) => {
    const response = await axiosInstance.get(`get-product-by-id`, {
      params: { id },
    });
    return response.data;
  }
);

export const getProductVariants = createAsyncThunk(
  "products/getProductVariants",
  async (productId: any) => {
    const response = await axiosInstance.get(`products/${productId}/variants`);
    return response.data;
  }
);
export const getProductColors = createAsyncThunk(
  "products/getProductColors",
  async (productId: any) => {
    const response = await axiosInstance.get(`products/${productId}/colors`);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number) => {
    const response = await axiosInstance.delete(`delete-product/${productId}`);
    return response.data;
  }
);

export const addproduct = createAsyncThunk(
  "products/addProduct",
  async (data: any) => {
    const response = await axiosInstance.post(`add-product/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (data: any) => {
    const response = await axiosInstance.put(`update-product`, data);
    return response.data; // Don't forget to return the data
  }
);

// Create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entity = action.payload;
        }
      )

      .addCase(
        getProductByIdEdit.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entity = action.payload;
        }
      )
      .addCase(
        getSpecialOffer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.specialOffer = action.payload;
        }
      )
      .addCase(
        getProductColors.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.colors = action.payload;
        }
      )
      .addCase(
        getProductVariants.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.variants = action.payload;
        }
      )
      .addCase(
        fetchSeriesProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entities = action.payload;
        }
      )
      .addCase(
        fetchBrandProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entities = action.payload;
        }
      )

      .addCase(
        fetchSearchProducts.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.searchProduct = action.payload;
        }
      )

      .addCase(
        getTrendingPhone.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.trendingPhone = action.payload;
        }
      )
      .addCase(
        getNewArrivalProduct.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.newArrival = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(addproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "product updated SuccessFully";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteMessage = "deleted SuccessFully";
      })
      .addMatcher(
        isPending(
          fetchProducts,
          getProductById,
          editProduct,
          addproduct,
          getProductVariants,
          getProductColors,
          getProductByIdEdit,
          fetchSeriesProducts,
          deleteProduct,
          fetchSearchProducts,
          fetchBrandProducts
        ),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.entities = [];
          state.entity = {};
          state.searchProduct = [];
        }
      )
      .addMatcher(
        isFulfilled(fetchProducts),
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entities = action.payload;
          state.successMessage = "";
        }
      );
  },
});

// Export the reducer
export const productReducer = productSlice.reducer;
