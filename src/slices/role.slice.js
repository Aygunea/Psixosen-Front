// slices/role.slice.js
import { createSlice } from "@reduxjs/toolkit";

const RoleReducer = createSlice({
  name: "role",
  initialState: {
    role: sessionStorage.getItem("role") || '',
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      // sessionStorage.setItem("role", JSON.stringify(action.payload));
      sessionStorage.setItem("role", action.payload);
    },
    clearRole: (state) => {
      state.role = '';
      sessionStorage.removeItem("role");
    }
  }
});

export const { setRole, clearRole } = RoleReducer.actions;
export default RoleReducer.reducer;
