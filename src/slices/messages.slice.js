import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: "messages",
    initialState: {
        messages: [],
        unReadMessages: []
    },
    reducers: {
        setMessage: (state, action) => {
            state.messages = action.payload
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        updateMessage: (state, action) => {
            const index = state.messages.findIndex(msg => msg._id === action.payload._id);
            if (index !== -1) {
                state.messages[index] = action.payload; // Güncellenen mesajı yerleştir
            }
        },
        addUnReadMessage: (state, action) => {
            state.unReadMessages.push(action.payload); // Yeni mesajı mevcut diziye ekle
        },
        setUnReadMessages: (state, action) => {
            state.unReadMessages = action.payload
        },
    }
})

export const { setMessage, addMessage, updateMessage, setUnReadMessages,addUnReadMessage } = messagesSlice.actions;
export default messagesSlice.reducer
