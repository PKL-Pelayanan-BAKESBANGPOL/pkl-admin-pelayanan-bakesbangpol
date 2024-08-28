import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const profileSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = profileSlicer.actions;

export default profileSlicer.reducer;
