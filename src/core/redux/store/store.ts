/* import packages */
import { configureStore } from "@reduxjs/toolkit";

/* import reducers */
import userReducer from "../slice/userSlice";
import spinnerReducer from "../slice/spinnerSlice";
import projectCategoryReducer from "../slice/projectCategorySlice";

const store = configureStore({
  reducer: { userReducer, spinnerReducer, projectCategoryReducer },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>

export default store;
