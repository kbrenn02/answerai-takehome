import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// the auth state can either be null if the user isn't logged in, or filled with the User
interface AuthState {
    user: {
        uid: string | null;
        email: string | null;
        displayName: string | null;
    }
}

// Define initial authentication state as null
const initialState: AuthState = {
    user: {
        uid: null,
        email: null,
        displayName: null,
    },
}

// Creating the auth slice itself
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // set the user at login
        setUser: (state, action: PayloadAction<AuthState['user']>) => {
            state.user = action.payload
        },
        // clear the user at logout
        clearUser: (state) => {
            state.user = { uid: null, email: null, displayName: null }
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;