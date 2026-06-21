import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import type { AuthState } from "../features/authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export type RootState = {
  auth: AuthState
}

export type AppDispatch = typeof store.dispatch
