import { createSlice } from "@reduxjs/toolkit";

// Helper function to load notifications from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = sessionStorage.getItem("notifications");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load notifications from local storage", e);
    return [];
  }
};

// Helper function to save notifications to local storage
const saveToLocalStorage = (notifications) => {
  try {
    const serializedState = JSON.stringify(notifications);
    sessionStorage.setItem("notifications", serializedState);
  } catch (e) {
    console.warn("Could not save notifications to local storage", e);
  }
};

const NotificationReducer = createSlice({
  name: "notifications",
  initialState: {
    notifications: loadFromLocalStorage(),
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      saveToLocalStorage(state.notifications);
    },
    deleteNotification: (state, action) => {
      const updatedNotifications = state.notifications.filter(notification => notification._id !== action.payload);
      state.notifications = updatedNotifications;
      saveToLocalStorage(updatedNotifications);
    },
  }
});

export const { setNotifications, deleteNotification } = NotificationReducer.actions;
export default NotificationReducer.reducer;
