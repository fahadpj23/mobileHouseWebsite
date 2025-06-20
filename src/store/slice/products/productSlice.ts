import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "services/api";

// Define the initial state for the user
interface UserState {
  loading: boolean;
  entities: any | null; // Type based on your API response
  error: string | null;
}

// Initial state
const initialState: UserState = {
  loading: false,
  entities: null,
  error: null,
};

// Async thunk to fetch products data
export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await axiosInstance.get(`products/`);
    return response.data;
  }
);

export const addproducts = createAsyncThunk(
  "products/addProduct",
  async (data: any) => {
    const response = await axiosInstance.post(`products/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// Create slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// Export the reducer
export const productReducer = productSlice.reducer;
