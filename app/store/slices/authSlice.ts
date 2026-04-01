import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthState {
  user: User | null | undefined;
}

const initialState: AuthState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;