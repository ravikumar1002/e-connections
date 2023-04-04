import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appDataReducer } from "@slice/appSlice";
import { authReducer } from "@slice/authSlice";

export const store = configureStore({
    reducer: {
        user: authReducer,
        appData: appDataReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
