import { createSlice } from "@reduxjs/toolkit";

interface IAppState { }

const initialState: IAppState = {};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {},
});

export const appDataReducer = appDataSlice.reducer;
