import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signUpModalOpen: false,
    loginModalOpen: false
}

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
    }
  }
});

export const {
    openLoginModal,
    closeLoginModal,
    openSignUpModal,
    closeSignUpModal
} = modalSlice.actions

export default modalSlice.reducer