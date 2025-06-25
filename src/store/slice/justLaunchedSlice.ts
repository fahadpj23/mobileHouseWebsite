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

// Async thunk to fetch JustLaunched data
export const fetchJustLaunched = createAsyncThunk(
  "justLaunched/fetchJustLaunched",
  async () => {
    const response = await axiosInstance.get(`JustLaunched/`);
    return response.data;
  }
);

export const getJustLaunchedById = createAsyncThunk(
  "justLaunched/getJustLaunchedById",
  async (id: number) => {
    const response = await axiosInstance.get(`JustLaunched/${id}`);
    return response.data;
  }
);

export const addJustLaunched = createAsyncThunk(
  "justLaunched/addJustLaunched",
  async (data: any) => {
    const response = await axiosInstance.post(`JustLaunched/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
);

// Create slice
const justLaunchedlice = createSlice({
  name: "justLaunched",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(
        fetchJustLaunched.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entities = action.payload;
        }
      )
      .addCase(
        getJustLaunchedById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.entity = action.payload;
        }
      )
      .addCase(fetchJustLaunched.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addMatcher(
        isPending(fetchJustLaunched, getJustLaunchedById, addJustLaunched),
        (state, action) => {
          state.loading = true;
          state.error = null;
        }
      );
  },
});

// Export the reducer
export const justLaunchedReducer = justLaunchedlice.reducer;
