// rxslice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  username: null,
  subscriptionStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // actions: 2 arguments bc changing "null-state values" with "action values"
    setUser: (state, action) => {
      // payload = argument passed in; which is an object with the initialState properties above
      state.email = action.payload.email,
      state.username = action.payload.username,
      state.subscriptionStatus = action.payload.subscriptionStatus
    },

    signOutUser: (state) => {
        state.email = null,
        state.username = null,
        state.subscriptionStatus = null
    }
  },
});

export const {
    setUser,
    signOutUser
} = userSlice.actions;

export default userSlice.reducer;
