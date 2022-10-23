import { createSlice } from "@reduxjs/toolkit";
import { LOCAL_SERVICE } from "../../services/localServ";

const initialState = {
  user: LOCAL_SERVICE.user.get(),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
