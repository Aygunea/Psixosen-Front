// slices/role.slice.js
import { createSlice } from "@reduxjs/toolkit";

const MenuReducer = createSlice({
    name: "menu",
    initialState: {
        activePage: 'explore',
        initialMenu: "Profilim",
    },
    reducers: {
        setActivePage: (state, action) => {
            state.activePage = action.payload;
        },
        setInitialMenu: (state, action) => {
            state.initialMenu = action.payload;
        },
    }
});

export const { setActivePage, setInitialMenu, setPlaying } = MenuReducer.actions;
export default MenuReducer.reducer;
