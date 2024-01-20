// rxslice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  username: null,
  subscriptionStatus: "Basic",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // actions: 2 arguments bc changing "null-state values" with "action values"
    setUser: (state, action) => {
      // payload = argument passed in; which is an object with the initialState properties above
      (state.email = action.payload.email),
        (state.username = action.payload.username),
        (state.subscriptionStatus = action.payload.subscriptionStatus);
    },

    signOutUser: (state) => {
      (state.email = null),
        (state.username = null),
        (state.subscriptionStatus = null);
    },

    setSubscriptionStatus: (state, action) => {
      state.subscriptionStatus = action.payload;
    },
  },
});

export const { setUser, signOutUser, setSubscriptionStatus } =
  userSlice.actions;

export default userSlice.reducer;
