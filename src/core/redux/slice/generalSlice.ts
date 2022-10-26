import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerOpen: false,
  drawerContent: "AAAA",
  handleSummitDrawer: () => {},
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    handleDrawerOpen: (state, action) => {
      state.drawerContent = action.payload;
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const generalActions = generalSlice.actions;

const generalReducer = generalSlice.reducer;

export default generalReducer;
