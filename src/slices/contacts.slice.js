import { createSlice } from "@reduxjs/toolkit";

const ContactReducer = createSlice({
    name: "contacts",
    initialState: {
        contacts: [],
    },
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload
        },
    }
})
export const { setContacts } = ContactReducer.actions
export default ContactReducer.reducer
