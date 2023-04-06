import { IUserData, IUsersData } from "@dto/user_data";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAxiosDataAsJSON } from "@services/GetAxiosDataAsJSON";


export const getUsersThunk = createAsyncThunk(
    "/appData/getUsers", async (_, { rejectWithValue }) => {
        try {
            const response = await GetAxiosDataAsJSON<IUsersData>("/Users");
            return response
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);



