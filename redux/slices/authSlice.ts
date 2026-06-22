import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;        // logged in user
  users: User[];            // all registered users
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  users: [],
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.users.push(action.payload.user);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    restoreUser: (state) => {
      if (typeof window === "undefined") return;

      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        state.user = JSON.parse(user);
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { signup, login, logout, restoreUser } = authSlice.actions;
export default authSlice.reducer;