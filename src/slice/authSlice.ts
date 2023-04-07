import { IUserPosts } from "@dto/posts";
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, signupThunk } from "@thunk/authThunk";
import { getUserPostsThunk } from "@thunk/postThunk";
import { getUserDataThunk } from "@thunk/userDataThunk";
export interface IAuthUser {
  providerId: string,
  uid: string,
  displayName: null,
  email: string,
  phoneNumber: null,
  photoURL: null,
}

export interface IAuthUserData {
  userName: string,
  phoneNumber: number | null,
  website: string,
  bio: string,
  name: string,
}

interface IAuthState {
  authUser: IAuthUser,
  authUserData: IAuthUserData,
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
  authUserData: {
    userName: "",
    phoneNumber: null,
    website: "",
    bio: "",
    name: "",
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
    addUserData: (state: IAuthState, action: { payload: IAuthUser }) => {
      state.authUser = action.payload
    },
    logoutUserProfile: (state: IAuthState) => {
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
      .addCase(signupThunk.pending, (state: IAuthState) => {
        state.authStatus = "pending";
      })
      .addCase(signupThunk.fulfilled, (state: IAuthState, action: { payload: { providerData: any } }) => {
        state.authStatus = "fulfilled";
        state.authUser = <IAuthUser>action.payload?.providerData[0];
        localStorage.setItem("authUser", JSON.stringify(state?.authUser));
      })
      .addCase(signupThunk.rejected, (state: IAuthState) => {
        state.authStatus = "rejected";
      })
      .addCase(loginThunk.pending, (state: IAuthState) => {
        state.authStatus = "pending";
      })
      .addCase(loginThunk.fulfilled, (state: IAuthState, action: { payload: { providerData: any } }) => {
        state.authStatus = "fulfilled";
        state.authUser = <IAuthUser>action.payload?.providerData[0];
        localStorage.setItem("authUser", JSON.stringify(state?.authUser));
      })
      .addCase(loginThunk.rejected, (state: IAuthState) => {
        state.authStatus = "rejected";
      })
      .addCase(getUserPostsThunk.pending, (state: IAuthState) => {
        state.postStatus = "pending";
      })
      .addCase(getUserPostsThunk.fulfilled, (state: IAuthState, action: { payload: IUserPosts }) => {
        state.postStatus = "fulfilled";
        state.posts = <IUserPosts>action.payload;

      })
      .addCase(getUserPostsThunk.rejected, (state: IAuthState,) => {
        state.postStatus = "rejected";
      })
      .addCase(getUserDataThunk.pending, (state: IAuthState) => {
        state.postStatus = "pending";
      })
      .addCase(getUserDataThunk.fulfilled, (state: IAuthState, action) => {
        state.postStatus = "fulfilled";
        state.authUserData = action.payload;
        console.log(action.payload, "action payload")
      })
      .addCase(getUserDataThunk.rejected, (state: IAuthState,) => {
        state.postStatus = "rejected";
      })
  },

});

export const { addUserData, logoutUserProfile } = authSlice.actions

export const authReducer = authSlice.reducer;
