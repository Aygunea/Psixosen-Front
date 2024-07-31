// slices/role.slice.js
import { createSlice } from "@reduxjs/toolkit";

const FormReducer = createSlice({
    name: "form",
    initialState: {
        form: {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            nickname: '',
            phone: '',
            gender: '',
            role: '',
            education: "",
            fieldOfActivity: "",
            experience: "",
            languages: "",
            category: "",
        }
    },
    reducers: {
        updateFormData: (state, action) => {
            state.form = { ...state.form, ...action.payload };
        },
    }
});

export const { updateFormData } = FormReducer.actions;
export default FormReducer.reducer;
