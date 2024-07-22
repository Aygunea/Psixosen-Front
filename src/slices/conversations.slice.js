import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversations: [],
        allMessages: [],
        selectedConversation: null,
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload
        },
        setAllMessages: (state, action) => {
            state.allMessages = action.payload;
        },
        setselectedConversation: (state, action) => {
            state.selectedConversation = action.payload
        }
    }
})
export const fetchMessages = () => async (dispatch) => {
    // try {
    //     const response = await axios.get(`http://localhost:3000/api/messages`);
    //     dispatch(setAllMessages(response.data));
    // } catch (error) {
    //     console.error('Error fetching messages:', error);
    // }
};
export const { setConversations,setAllMessages, setselectedConversation } = conversationSlice.actions;
export default conversationSlice.reducer
