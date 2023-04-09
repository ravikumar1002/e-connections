import { IUserLogin } from "@dto/user_data";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "App";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface IValuesType {
  persistUser?: true | undefined;
  email: string;
  password: string;
  name: string;
  username: string;
}

export const signupThunk = createAsyncThunk(
  "/auth/signup", async (values: IValuesType, { rejectWithValue }) => {
    const auth = getAuth();
    const { email, password, name, username } = values
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, `${response.user?.providerData[0].uid}`, "Personal-informations"), {
        username: username,
        phone: null,
        name: name,
        website: "",
        bio: "",
      });
      return response.user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error, errorCode, errorMessage);
      return rejectWithValue(error);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "/auth/login", async (userInfo: IUserLogin, { rejectWithValue }) => {
    const auth = getAuth();
    const { email, password } = userInfo
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return response.user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error, errorCode, errorMessage);
      return rejectWithValue(error);
    }
  }
);

