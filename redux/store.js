import { configureStore } from '@reduxjs/toolkit'
import modalSlice from "@/redux/modalSlice"

export const store = configureStore({
  reducer: {
    modals: modalSlice
  },
})