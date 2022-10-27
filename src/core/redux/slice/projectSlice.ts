import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {InterfaceProject} from "../../models/Project/Project.interface";

type InitialState = {
  project: Partial<InterfaceProject>
};

const initialState:InitialState = {
    project: {
      projectName: "",
      description: "",
      categoryId: 1,
      alias: "",
    }
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState: initialState,
  reducers: {
    createProject: (state, action:PayloadAction<InterfaceProject>) => {      
      state.project = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
