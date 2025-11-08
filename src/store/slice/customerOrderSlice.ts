import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
} from "@reduxjs/toolkit";
import axiosInstance from "services/api";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
// Define the initial state for the user
interface UserState {
  loading: boolean;
  entities: any | null; // Type based on your API response
  error: string | null;
  entity: any;
  successMessage: string;
  deleteMessage: string;
  orderSuccessDetails: any;
}

// Initial state
const initialState: UserState = {
  loading: false,
  entities: null,
  error: null,
  entity: null,
  successMessage: "",
  deleteMessage: "",
  orderSuccessDetails: "",
};

// Async thunk to fetch Order data

export const addCustomerOrder = createAsyncThunk(
  "order/addCustomerOrder",
  async (data: any, { rejectWithValue }) => {
    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, "customerOrder"), {
        name: data.name,
        address: data.address,
        phone: data.phoneNumber,
        pincode: data.pincode,
        phoneName: data.phoneName,
        qty: data?.qty,
        price: data.price,
        productId: data?.productId,
        productVariantId: data?.productVariantId,
        productColorId: data?.productVariantId,
      });

      return {
        id: docRef.id,
        ...data,
      };
    } catch (error: any) {
      console.error("❌ Error adding customer:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCustomerOrder = createAsyncThunk(
  "order/fetchOrder",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, "customerOrder"));
      const Order = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return Order;
    } catch (error: any) {
      console.error("Error fetching Order:", error);
      return rejectWithValue(error.message || "Failed to fetch Order");
    }
  }
);

// Create slice
const customerOrderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCustomerOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = "product ordered SuccessFully";
      state.orderSuccessDetails = action.payload;
    });
    builder.addCase(fetchCustomerOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    });
  },
});

// Export the reducer
export const customerOrderReducer = customerOrderSlice.reducer;
