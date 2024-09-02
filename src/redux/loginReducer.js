import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  showPassword: false,
  token: null,
  user: null,
  loading: false,
  isLoggedIn: false,
};

const loginSlicer = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setShowPassword,
  setToken,
  setUser,
  setLoading,
  setIsLoggedIn,
} = loginSlicer.actions;

export default loginSlicer.reducer;
