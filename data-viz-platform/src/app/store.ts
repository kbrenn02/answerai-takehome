// Setting up the Redux store. Using Redux for state management
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../components/Auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;