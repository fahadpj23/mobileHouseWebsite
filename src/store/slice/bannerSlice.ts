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

// Async thunk to fetch Banners data
export const fetchBanners = createAsyncThunk("banner/fetchBanner", async () => {
  const response = await axiosInstance.get(`banner/`);
  return response.data;
});

export const getBannerById = createAsyncThunk(
  "banner/getBannerById",
  async (id: number) => {
    const response = await axiosInstance.get(`banner/${id}`);
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deleteBannerById",
  async (id: number) => {
    const response = await axiosInstance.delete(`banner/${id}`);
    return response.data;
  }
);

export const addBanners = createAsyncThunk(
  "banner/addBanner",
  async (data: any) => {
    const response = await axiosInstance.post(`banner/`, data);
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
      .addCase(addBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "deleted SuccessFully";
      })
      .addMatcher(
        isPending(fetchBanners, getBannerById, addBanners),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.successMessage = "";
        }
      );
  },
});

// Export the reducer
export const BannerReducer = bannerSlice.reducer;
