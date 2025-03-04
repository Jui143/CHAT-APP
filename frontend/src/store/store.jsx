import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Ensure correct path

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store; // Export the store separately
