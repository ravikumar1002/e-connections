import { IComment, IPost, IUserPost } from "@dto/posts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAxiosDataAsJSON } from "@services/GetAxiosDataAsJSON";

export const getPostsThunk = createAsyncThunk(
    "/appData/getPosts", async (_, { rejectWithValue }) => {
        try {
            const response = await GetAxiosDataAsJSON<IPost[]>("/posts");
            return response
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);


export const createPostsThunk = createAsyncThunk(
    "/appData/createUserPost", async (postData: object, { rejectWithValue }) => {
        try {
            const newPost = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify({ ...postData }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => json);
            return newPost
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);


export const getAllPostsCommentsThunk = createAsyncThunk(
    "/appData/getUserComments", async (_, { rejectWithValue }) => {
        try {
            const response = await GetAxiosDataAsJSON<IComment[]>("comments");
            return response
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);