import { createSlice } from "@reduxjs/toolkit";

const busSlice = createSlice({
    name: "bus",
    initialState: {
        bus: null,
    },
    reducers: {
        setBus: (state, action) => {
            state.user = action.payload;
        },
        login: (state) => {
            state.isLoggedIn = true; // Set isLoggedIn to true when login happens
            localStorage.setItem('isLoggedIn', 'true');
          },
        logout: (state) => {
            state.isLoggedIn = false; // Set isLoggedIn to false when logout happens
            localStorage.setItem('isLoggedIn', 'false');
        },
    }
})

export const { setBus, login, logout } = busSlice.actions;
export default busSlice.reducer;