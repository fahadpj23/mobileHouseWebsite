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

// Async thunk to fetch products data
export const fetchwhatsappAds = createAsyncThunk(
  "whatsappAds/fetchwhatsappAds",
  async () => {
    const response = await axiosInstance.get(`whatsappAds/`);
    return response.data;
  }
);

export const getwhatsappAdsById = createAsyncThunk(
  "whatsappAds/getwhatsappAdsById",
  async (id: number) => {
    const response = await axiosInstance.get(`whatsappAds/${id}`);
    return response.data;
  }
);

export const addwhatsappAds = createAsyncThunk(
  "whatsappAds/addwhatsappAds",
  async (data: any) => {
    const response = await axiosInstance.post(`whatsappAds/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// Create slice
const whatsappAdsSlice = createSlice({
  name: "whatsappAds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(
        fetchwhatsappAds.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entities = action.payload;
        }
      )
      .addCase(
        getwhatsappAdsById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entity = action.payload;
        }
      )
      .addCase(fetchwhatsappAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addwhatsappAds.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addMatcher(
        isPending(fetchwhatsappAds, getwhatsappAdsById, addwhatsappAds),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

// Export the reducer
export const whatsappAdsReducer = whatsappAdsSlice.reducer;
