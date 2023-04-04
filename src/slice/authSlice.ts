import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {}

const initialState: IAuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const authReducer = authSlice.reducer;
