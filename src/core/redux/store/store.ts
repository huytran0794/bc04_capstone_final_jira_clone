/* import packages */
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slice/userSlice";
import spinnerReducer from "../slice/spinnerSlice";
const store = configureStore({
  reducer: { userReducer, spinnerReducer },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store;
