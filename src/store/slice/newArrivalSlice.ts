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

// Async thunk to fetch NewArrivals data
export const fetchNewArrivals = createAsyncThunk(
  "newArrivals/fetchNewArrival",
  async () => {
    const response = await axiosInstance.get(`newArrivals/`);
    return response.data;
  }
);

export const getNewArrivalById = createAsyncThunk(
  "newArrivals/getNewArrivalById",
  async (id: number) => {
    const response = await axiosInstance.get(`newArrivals/${id}`);
    return response.data;
  }
);

export const addNewArrivals = createAsyncThunk(
  "newArrivals/addNewArrival",
  async (data: any) => {
    const response = await axiosInstance.post(`newArrival/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// Create slice
const newArrivalSlice = createSlice({
  name: "newArrivals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(
        fetchNewArrivals.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entities = action.payload;
        }
      )
      .addCase(
        getNewArrivalById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entity = action.payload;
        }
      )
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addMatcher(
        isPending(fetchNewArrivals, getNewArrivalById, addNewArrivals),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

// Export the reducer
export const newArrivalReducer = newArrivalSlice.reducer;
