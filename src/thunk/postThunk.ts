import { IPosts, IUserPosts } from "@dto/posts";
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


export const getUserPostsThunk = createAsyncThunk(
    "/appData/getUserPosts", async (_, { rejectWithValue }) => {
        try {
            const response = await GetAxiosDataAsJSON<IUserPosts>("users/2/posts");
            return response
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);
