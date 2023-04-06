import { IUserPosts } from "@dto/posts";
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk } from "@thunk/authThunk";
import { getUserPostsThunk } from "@thunk/postThunk";
interface IAuthUser {
  providerId: string,
  uid: string,
  displayName: null,
  email: string,
  phoneNumber: null,
  photoURL: null,
}

interface IAuthState {
  authUser: IAuthUser,
  posts: IUserPosts,
  postStatus: string,
  authStatus: string,
  authError: string | null,
}

const initialState: IAuthState = {
  authUser: {
    providerId: "",
    uid: "",
    displayName: null,
    email: "",
    phoneNumber: null,
    photoURL: null,
  },
  posts: [],
  postStatus: "idle",
  authStatus: "idle",
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUserProfile: (state) => {
      state.authUser = {
        providerId: "",
        uid: "",
        displayName: null,
        email: "",
        phoneNumber: null,
        photoURL: null,
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state, action) => {
        state.authStatus = "pending";
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.authStatus = "fulfilled";
        state.authUser = <IAuthUser>action.payload?.providerData[0];
        console.log(action.payload)
        localStorage.setItem("authUser", JSON.stringify(state?.authUser));
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.authStatus = "rejected";
      })
      .addCase(loginThunk.pending, (state, action) => {
        state.authStatus = "pending";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.authStatus = "fulfilled";
        state.authUser = <IAuthUser>action.payload?.providerData[0];
        localStorage.setItem("authUser", JSON.stringify(state?.authUser));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.authStatus = "rejected";
      })
      .addCase(getUserPostsThunk.pending, (state, action) => {
        state.postStatus = "pending";
      })
      .addCase(getUserPostsThunk.fulfilled, (state, action) => {
        state.postStatus = "fulfilled";
        state.posts = <IUserPosts>action.payload;

      })
      .addCase(getUserPostsThunk.rejected, (state, action) => {
        state.postStatus = "rejected";
      })
  },

});

export const { logoutUserProfile } = authSlice.actions

export const authReducer = authSlice.reducer;
