// // slices/requests.slice.js
// import { createSlice } from "@reduxjs/toolkit";

// const RequestSlice = createSlice({
//   name: "request",
//   initialState: {
//     request: sessionStorage.getItem("request") ? JSON.parse(sessionStorage.getItem("request")) : [],
//   },
//   reducers: {
//     setrequest: (state, action) => {
//       state.request = action.payload;
//       sessionStorage.setItem("request", JSON.stringify(action.payload));
//     },
//   }
// });

// export const { setrequest } = RequestSlice.actions;
// export default RequestSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const getRequestFromSessionStorage = () => {
  const storedData = sessionStorage.getItem("request");
  try {
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error parsing session storage data:', error);
    return [];
  }
};

const RequestSlice = createSlice({
  name: "request",
  initialState: {
    request: getRequestFromSessionStorage(),
  },
  reducers: {
    setrequest: (state, action) => {
      state.request = action.payload;
      sessionStorage.setItem("request", JSON.stringify(action.payload));
    },
  }
});

export const { setrequest } = RequestSlice.actions;
export default RequestSlice.reducer;
