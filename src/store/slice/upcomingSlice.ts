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

// Async thunk to fetch Upcoming data
export const fetchUpcoming = createAsyncThunk(
  "upcoming/fetchUpcoming",
  async () => {
    const response = await axiosInstance.get(`Upcoming/`);
    return response.data;
  }
);

export const getUpcomingById = createAsyncThunk(
  "Upcoming/getUpcomingById",
  async (id: number) => {
    const response = await axiosInstance.get(`Upcoming/${id}`);
    return response.data;
  }
);

export const addUpcoming = createAsyncThunk(
  "Upcoming/addUpcoming",
  async (data: any) => {
    const response = await axiosInstance.post(`Upcoming/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

export const deleteUpcoming = createAsyncThunk(
  "Upcoming/getUpcomingById",
  async (id: number) => {
    const response = await axiosInstance.delete(`Upcoming/${id}`);
    return response.data;
  }
);

// Create slice
const upcominglice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUpcoming.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(
        getUpcomingById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entity = action.payload;
        }
      )
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addUpcoming.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "added SuccessFully";
      })
      .addMatcher(
        isPending(fetchUpcoming, getUpcomingById, addUpcoming),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

// Export the reducer
export const upcomingReducer = upcominglice.reducer;
