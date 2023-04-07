import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "App";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface IValuesType {
  persistUser?: true | undefined;
  email: string;
  password: string;
}

export const signupThunk = createAsyncThunk(
  "/auth/signup", async (values: IValuesType, { rejectWithValue }) => {
    const auth = getAuth();
    const { email, password } = values
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, `${response.user?.providerData[0].uid}`, "Personal-informations"), {
        userName: "ABcde",
        phoneNumber: 36363636636,
        website: "asdsdbjabhdjsa.com",
        bio: "luyfgausdgfadfasduifgasdufysadgfasdybdf dsdifasgd fsdiafyaifavsdbilf 9fuhoa0eaidfcbasiuvdg ppqe9ofgcoreddasgufagdifagfdg fausdfgas",
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
  "/auth/login", async (values: IValuesType, { rejectWithValue }) => {
    const auth = getAuth();
    const { email, password } = values
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


// export const updateUserThunk = createAsyncThunk(
//   "/auth/updateUser", async (updatedValues: object, { rejectWithValue }) => {
//     const auth = getAuth();
//     try {
//       const response = await updateProfile(auth?.currentUser, updatedValues);
//       console.log(response)
//       return response?.providerData[0]
//     } catch (error: any) {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(error, errorCode, errorMessage);
//       return rejectWithValue(error);
//     }
//   }
// );
