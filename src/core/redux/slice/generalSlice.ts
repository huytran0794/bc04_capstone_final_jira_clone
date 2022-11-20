import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface interfaceInitialStateGeneralReducer {
  isDrawerOpen: boolean;
  DrawerContent: React.ReactNode;
  // handleSummitDrawer: () => void;
}

const initialState: interfaceInitialStateGeneralReducer = {
  isDrawerOpen: false,
  DrawerContent: null,
  // handleSummitDrawer: () => {},
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    handleDrawerOpen: (state, action: PayloadAction<React.ReactNode>) => {
      state.DrawerContent = action.payload;
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
