import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
} from "@reduxjs/toolkit";
import axiosInstance from "services/api";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
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
  deleteMessage: string;
}

// Initial state
const initialState: UserState = {
  loading: false,
  entities: null,
  error: null,
  entity: null,
  successMessage: "",
  deleteMessage: "",
};

// Async thunk to fetch stock data
export const fetchstock = createAsyncThunk("stock/fetchstock", async () => {
  const snapshot = await getDocs(collection(db, "stock"));
  const stock = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return stock;
});

export const getstockById = createAsyncThunk(
  "stock/getstockById",
  async (id: number) => {
    const response = await axiosInstance.get(`stock/${id}`);
    return response.data;
  }
);

export const addStock = createAsyncThunk(
  "stock/addStock",
  async (data: any) => {
    try {
      const stockRef = collection(db, "stocks");
      const q = query(
        stockRef,
        where("productId", "==", data?.productId),
        where("variantId", "==", data?.variantId),
        where("colorId", "==", data?.colorId)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // 🔹 Combination already exists — update stock
        const docRef = querySnapshot.docs[0].ref;

        const newStock = data?.addedStock;

        await updateDoc(docRef, { stock: newStock });
      } else {
        console.log(data);
        await addDoc(stockRef, {
          productId: data?.productId,
          variantId: data?.variantId,
          colorId: data?.colorId,
          stock: data?.addedStock,
        });
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("❌ Failed to update stock");
    }
  }
);

export const deletestock = createAsyncThunk(
  "stock/deletestock",
  async (id: number) => {
    const response = await axiosInstance.delete(`stock/${id}`);
    return response.data;
  }
);

// Create slice
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchstock.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(getstockById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entity = action.payload;
      })
      .addCase(fetchstock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addCase(deletestock.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteMessage = "deleted SuccessFully";
      })
      .addMatcher(
        isPending(fetchstock, getstockById, addStock, deletestock),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.error = null;
          state.successMessage = "";
        }
      );
  },
});

// Export the reducer
export const stockReducer = stockSlice.reducer;
