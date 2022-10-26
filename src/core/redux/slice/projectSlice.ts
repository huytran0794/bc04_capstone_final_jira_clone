import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../hooks/redux/useRedux";
import { Project } from "../../models/Project.interface";


type InitialState = {
  project: Project
};

const initialState:InitialState = {
    project: {
      projectName: "",
      description: "",
      categoryId: 1,
      alias: "",
    }
};

const projectCategorySlice = createSlice({
  name: "projectCategorySlice",
  initialState: initialState,
  reducers: {
    createProject: (state, action:PayloadAction<Project>) => {      
      state.project = action.payload;
    },
  },
});

export const projectCategoryActions = projectCategorySlice.actions;

const projectCategoryReducer = projectCategorySlice.reducer;

export default projectCategoryReducer;
