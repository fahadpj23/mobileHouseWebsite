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

// Async thunk to fetch NewArrivals data
export const fetchNewArrivals = createAsyncThunk(
  "newArrival/fetchNewArrival",
  async () => {
    const response = await axiosInstance.get(`newArrival/`);
    return response.data;
  }
);

export const getNewArrivalById = createAsyncThunk(
  "newArrival/getNewArrivalById",
  async (id: number) => {
    const response = await axiosInstance.get(`newArrival/${id}`);
    return response.data;
  }
);

export const deleteNewArrival = createAsyncThunk(
  "newArrival/deleteNewArrival",
  async (id: number) => {
    const response = await axiosInstance.delete(`newArrival/${id}`);
    return response.data;
  }
);

export const addNewArrivals = createAsyncThunk(
  "newArrival/addNewArrival",
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
      .addCase(addNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addCase(deleteNewArrival.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "deleted SuccessFully";
      })
      .addMatcher(
        isPending(
          fetchNewArrivals,
          getNewArrivalById,
          addNewArrivals,
          deleteNewArrival
        ),
        (state, action) => {
          state.loading = true;
          state.error = null;
          state.successMessage = "";
        }
      );
  },
});

// Export the reducer
export const newArrivalReducer = newArrivalSlice.reducer;
