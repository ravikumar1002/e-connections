import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthUserData } from "@slice/authSlice";
import {
    collection,
    doc,
    getDocs,
    setDoc,
} from "firebase/firestore";
import { db } from "../App";

interface ISignupThunk {
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

export const getUserDataThunk = createAsyncThunk(
    "/auth/userDataFirebase", async (userID: string | undefined, { rejectWithValue }) => {
        try {
            // @ts-ignore
            const response = await getDocs<IAuthUserData>(collection(db, `${userID}`));
            return response?.docs[0].data()
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error, errorCode, errorMessage);
            return rejectWithValue(error);
        }
    }
);
