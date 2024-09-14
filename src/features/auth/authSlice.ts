import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  currentUser: { email: string; password: string } | null;
}

const initialState: AuthState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
