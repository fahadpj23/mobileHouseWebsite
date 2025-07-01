// features/user/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch } from "../index";
import axiosInstance from "services/api";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
  isAuthenticated: false,
};

export const login =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const res = await axiosInstance.post("/user/login", { email, password });

    const { accessToken, refreshToken, user } = res.data;
    dispatch(setCredentials({ accessToken, refreshToken, user }));
  };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: any;
      }>
    ) => {
      console.log("FDf");
      console.log(action.payload);

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
