// slices/listener.slice.js
import { createSlice } from '@reduxjs/toolkit';

const listenerSlice = createSlice({
    name: 'listener',
    initialState: {
        listener: JSON.parse(sessionStorage.getItem("listener")) || null,
        listenerId: null,
        onlineListeners: [],
    },
    reducers: {
        setListenerId: (state, action) => {
            state.listenerId = action.payload;
        },
        setListener: (state, action) => {
            state.listener = action.payload
            sessionStorage.setItem("listener", JSON.stringify(action.payload))
        },
        setOnlineListeners: (state, action) => {
            state.onlineListeners = action.payload;
        }
    },
});

export const { setListenerId, setListener, setOnlineListeners } = listenerSlice.actions;
export default listenerSlice.reducer;
