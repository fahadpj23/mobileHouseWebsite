import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
  isFulfilled,
} from "@reduxjs/toolkit";
import axiosInstance from "services/api";

// Define the initial state for the user
interface UserState {
  loading: boolean;
  entities: any | null; // Type based on your API response
  error: string | null;
  entity: any;
  successMessage: string;
}

// Initial state
const initialState: UserState = {
  loading: false,
  entities: null,
  error: null,
  entity: null,
  successMessage: "",
};

// Async thunk to fetch products data
export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await axiosInstance.get(`products/`);
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: number) => {
    const response = await axiosInstance.get(`products/${id}`);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/getProductById",
  async (id: number) => {
    const response = await axiosInstance.delete(`products/${id}`);
    return response.data;
  }
);

export const getProductByBrand = createAsyncThunk(
  "products/getProductByBrand",
  async (brand: string) => {
    const response = await axiosInstance.get(`products/brand/${brand}`);
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

      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entity = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addMatcher(
        isPending(
          fetchProducts,
          getProductById,
          addproducts,
          getProductByBrand
        ),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isFulfilled(fetchProducts, getProductByBrand),
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
