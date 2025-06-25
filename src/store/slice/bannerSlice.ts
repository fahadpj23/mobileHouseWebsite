import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isPending,
} from "@reduxjs/toolkit";
import axiosInstance from "services/api";

// Define the initial state for the user
interface UserState {
  loading: boolean;
  entities: any | null; // Type based on your API response
  error: string | null;
  entity: any;
}

// Initial state
const initialState: UserState = {
  loading: false,
  entities: null,
  error: null,
  entity: null,
};

// Async thunk to fetch Banners data
export const fetchBanners = createAsyncThunk(
  "banners/fetchBanner",
  async () => {
    const response = await axiosInstance.get(`banners/`);
    return response.data;
  }
);

export const getBannerById = createAsyncThunk(
  "banners/getBannerById",
  async (id: number) => {
    const response = await axiosInstance.get(`banners/${id}`);
    return response.data;
  }
);

export const addBanners = createAsyncThunk(
  "banners/addBanner",
  async (data: any) => {
    console.log("FD");
    const response = await axiosInstance.post(`banners/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// Create slice
const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchBanners.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(getBannerById.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entity = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addMatcher(
        isPending(fetchBanners, getBannerById, addBanners),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

// Export the reducer
export const BannerReducer = bannerSlice.reducer;
