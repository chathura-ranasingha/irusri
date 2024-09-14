import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface RegistrationState {
  users: User[];
}

const initialState: RegistrationState = {
  users: [
    {
      name: "Chathura",
      email: "chathurabotha@gmail.com",
      password: "chathurabotha@gmail.com",
    },
  ],
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);

      console.log("State after update:", JSON.stringify(state, null, 2));
    },
  },
});

export const { registerUser } = registrationSlice.actions;

export default registrationSlice.reducer;
