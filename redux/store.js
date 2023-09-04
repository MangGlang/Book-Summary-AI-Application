import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "@/redux/modalSlice"
import userSlice from "@/redux/userSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice
  },
})