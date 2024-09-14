import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import registrationReducer from "../features/registration/registrationSlice";
import todoReducer from "../features/todoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registrationReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
