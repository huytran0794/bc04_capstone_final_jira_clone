import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InterfaceProject } from "../../models/Project/Project.interface";

// import local services
import PROJECT_SERVICE from "../../services/projectServ";

type InitialState = {
  project: Partial<InterfaceProject>;
  projectList: Array<InterfaceProject> | undefined;
};

const initialState: InitialState = {
  project: {
    projectName: "",
    description: "",
    categoryId: 1,
    alias: "",
  },
  projectList: undefined,
};

const projectSlice = createSlice({
  name: "projectSlice",
  initialState: initialState,
  reducers: {
    createProject: (state, action: PayloadAction<InterfaceProject>) => {
      state.project = action.payload;
    },
    updateProjectList: (
      state,
      action: PayloadAction<Array<InterfaceProject>>
    ) => {
      state.projectList = action.payload;
    },
  },
});

export const projectActions = projectSlice.actions;

const projectReducer = projectSlice.reducer;

export default projectReducer;
