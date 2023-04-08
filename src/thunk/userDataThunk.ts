import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../App";


export const getUserDataThunk = createAsyncThunk(
    "/auth/userDataFirebase", async (userID: string | undefined, { rejectWithValue }) => {
        try {
            // @ts-ignore
            const response = await getDocs(collection(db, `${userID}`));
            return response?.docs[0].data()
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(error, errorCode, errorMessage);
            return rejectWithValue(error);
        }
    }
);
