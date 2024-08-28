import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  showPassword: false,
  token: null,
  user: null,
  loading: false,
  isLoggedIn: false,
  // login: null,
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
    // setLogin: (state, action) => {
    //   state.login = action.payload;
    // },
    // logout: (state) => {
    //   state.token = null;
    //   state.isLoggedIn = false;
    //   state.user = null;
    //   state.login = null;
    //   state.isAuthenticated = false;
    // },
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
