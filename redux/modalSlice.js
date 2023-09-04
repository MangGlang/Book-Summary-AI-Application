import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUpModalOpen: false,
  loginModalOpen: false,
  forgotPasswordModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // actions
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },

    openSignUpModal: (state) => {
      state.signUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.signUpModalOpen = false;
    },

    openForgotModal: (state) => {
      state.forgotPasswordModalOpen = true;
    },
    closeForgotModal: (state) => {
      state.forgotPasswordModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openSignUpModal,
  closeSignUpModal,
  openForgotModal,
  closeForgotModal,
} = modalSlice.actions;

export default modalSlice.reducer;
