import { createSlice } from "@reduxjs/toolkit";
import { signupThunk } from "@thunk/authThunk";
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
  authStatus: "idle",
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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

  },

});

export const authReducer = authSlice.reducer;
