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
  colors: any;
  variants: any;
  searchProduct: any;
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
};

// Async thunk to fetch products data
export const fetchSeriesProducts = createAsyncThunk(
  "products/getSeriesProduct",
  async (seriesId: string) => {
    const response = await axiosInstance.get(`get-product-by-series/,`, {
      params: { seriesId },
    });
    return response.data;
  }
);

export const fetchSearchProducts = createAsyncThunk(
  "products/getSearchProduct",
  async (searchValue: string) => {
    const response = await axiosInstance.get(`search-product`, {
      params: { searchValue },
    });
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    const response = await axiosInstance.get(`get-products`);
    return response.data;
  }
);

export const getNewArrivalProduct = createAsyncThunk(
  "products/getNewArrivalProduct",
  async () => {
    const response = await axiosInstance.get(`get-new-arrival-products`);
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
    const response = await axiosInstance.get(`trending-phone`);
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id: string | number) => {
    const response = await axiosInstance.get(`get-product-by-id/,`, {
      params: { id },
    });
    return response.data;
  }
);

export const getProductByIdEdit = createAsyncThunk(
  "products/getProductByIdEdit",
  async (id: string | number) => {
    const response = await axiosInstance.get(`get-product-by-id/,`, {
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
  async (id: number) => {
    const response = await axiosInstance.delete(`products/`, {
      params: { id },
    });
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
        state.successMessage = "deleted SuccessFully";
      })
      .addMatcher(
        isPending(
          fetchProducts,
          getProductById,
          editProduct,
          addproduct,
          getProductByBrand,
          getProductVariants,
          getProductColors,
          getProductByIdEdit,
          fetchSeriesProducts,
          deleteProduct,
          fetchSearchProducts
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
