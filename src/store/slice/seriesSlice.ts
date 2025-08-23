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
export const fetchSeries = createAsyncThunk("series/fetchSeries", async () => {
  const response = await axiosInstance.get(`series/`);
  return response.data;
});

export const getseriesById = createAsyncThunk(
  "series/getSeriesById",
  async (id: number) => {
    const response = await axiosInstance.get(`series/${id}`);
    return response.data;
  }
);

export const addSeries = createAsyncThunk(
  "series/addSeries",
  async (data: any) => {
    const response = await axiosInstance.post(`series/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
const seriesSlice = createSlice({
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
      .addCase(addSeries.fulfilled, (state, action) => {
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
        isPending(fetchSeries, getseriesById, addSeries, deleteSeries),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.successMessage = "";
        }
      );
  },
});

// Export the reducer
export const seriesReducer = seriesSlice.reducer;
