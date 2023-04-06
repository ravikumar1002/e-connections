import { IPosts } from "@dto/posts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAxiosDataAsJSON } from "@services/GetAxiosDataAsJSON";


export const getPostsThunk = createAsyncThunk(
    "/appData/getPosts", async (_, { rejectWithValue }) => {
        try {
            const response = await GetAxiosDataAsJSON<IPosts>("/posts");
            return response
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);