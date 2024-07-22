import { createSlice } from "@reduxjs/toolkit";

const UserReducer = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(sessionStorage.getItem("user")) || null,
        onlineUsers: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            sessionStorage.setItem("user", JSON.stringify(action.payload));
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    }
})
export const { setUser, setOnlineUsers  } = UserReducer.actions
export default UserReducer.reducer
