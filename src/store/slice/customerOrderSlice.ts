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

// Async thunk to fetch Series data
export const fetchSeries = createAsyncThunk(
  "series/fetchSeries",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, "series"));
      const series = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return series;
    } catch (error: any) {
      console.error("Error fetching series:", error);
      return rejectWithValue(error.message || "Failed to fetch series");
    }
  }
);
export const getseriesById = createAsyncThunk(
  "series/getSeriesById",
  async (id: number) => {
    const response = await axiosInstance.get(`series/${id}`);
    return response.data;
  }
);

export const addCustomerOrder = createAsyncThunk(
  "customer/addCustomerOrder",
  async (data: any, { rejectWithValue }) => {
    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, "customers"), {
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

      console.log("✅ Customer added with ID:", docRef.id);

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

export const deleteSeries = createAsyncThunk(
  "series/deleteSeries",
  async (id: number) => {
    const response = await axiosInstance.delete(`series/${id}`);
    return response.data;
  }
);

// Create slice
const customerOrderSlice = createSlice({
  name: "Series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchSeries.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(getseriesById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entity = action.payload;
      })
      .addCase(addCustomerOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addCase(deleteSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteMessage = "deleted SuccessFully";
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addMatcher(
        isPending(fetchSeries, getseriesById, addCustomerOrder, deleteSeries),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.successMessage = "";
        }
      );
  },
});

// Export the reducer
export const customerOrderReducer = customerOrderSlice.reducer;
