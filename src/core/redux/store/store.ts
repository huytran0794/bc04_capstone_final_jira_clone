/* import packages */
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slice/userSlice";
import spinnerReducer from "../slice/spinnerSlice";
import generalReducer from "../slice/generalSlice";
import projectReducer from "../slice/projectSlice";

const store = configureStore({
  reducer: { userReducer, projectReducer, spinnerReducer, generalReducer },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
