import { IComments, IPosts } from "@dto/posts";
import { IUsersData } from "@dto/user_data";
import { createSlice } from "@reduxjs/toolkit";
import { getPostsThunk } from "@thunk/postThunk";
import { getUsersThunk } from "@thunk/userThunk";

interface IAppState {
  posts: IPosts,
  comments: IComments,
  users: IUsersData,
  getPostsStatus: string,
  getUsersStatus: string,
}

const initialState: IAppState = {
  posts: [],
  comments: [],
  users: [],
  getPostsStatus: "idle",
  getUsersStatus: "idle",
};

const appDataSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.pending, (state, action) => {
        state.getPostsStatus = "pending";
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.getPostsStatus = "fulfilled";
        state.posts = action.payload;
        console.log(action.payload)
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.getPostsStatus = "rejected";
      })
      .addCase(getUsersThunk.pending, (state, action) => {
        state.getUsersStatus = "pending";
      })
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.getUsersStatus = "fulfilled";
        state.users = action.payload;
        console.log(action.payload)
      })
      .addCase(getUsersThunk.rejected, (state, action) => {
        state.getUsersStatus = "rejected";
      })
  },
});

export const appDataReducer = appDataSlice.reducer;
