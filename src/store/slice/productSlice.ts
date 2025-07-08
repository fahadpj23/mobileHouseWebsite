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
  newArrival: any;
  specialOffer: any;
  trendingPhone: any;
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
};

// Async thunk to fetch products data
export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await axiosInstance.get(`products/`);
    return response.data;
  }
);

export const getNewArrival = createAsyncThunk(
  "products/getNewArrival",
  async () => {
    const response = await axiosInstance.get(`products/newArrival`);
    return response.data;
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
    const response = await axiosInstance.get(`products/trendingPhone`);
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

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ data, editId }: { data: any; editId: number }) => {
    const response = await axiosInstance.put(`products/${editId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
        getSpecialOffer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.specialOffer = action.payload;
        }
      )
      .addCase(
        getTrendingPhone.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.trendingPhone = action.payload;
        }
      )
      .addCase(getNewArrival.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.newArrival = action.payload;
      })
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
          editProduct,
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
