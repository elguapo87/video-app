import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserSuccess, subscription, toggleSaveVideo } = userSlice.actions;

export default userSlice.reducer;

