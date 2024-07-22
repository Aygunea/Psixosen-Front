import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = {
    darkMode: localStorage.getItem('darkMode') === null ? true : localStorage.getItem('darkMode') === 'true',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        toggleTheme(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', state.darkMode);
            if (state.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
