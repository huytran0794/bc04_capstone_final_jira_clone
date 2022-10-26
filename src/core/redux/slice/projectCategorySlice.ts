import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type ProjectCategory = {
  [name: string]: number
}

type InitialState = {
  projectCategoryArr: ProjectCategory[]
};

const initialState:InitialState = {
  projectCategoryArr: []
};

const projectCategorySlice = createSlice({
  name: "projectCategorySlice",
  initialState: initialState,
  reducers: {
    getAllProjectCategory: (state, action:PayloadAction<ProjectCategory[]>) => {      
      state.projectCategoryArr = [...action.payload];
    },
  },
});

export const projectCategoryActions = projectCategorySlice.actions;

const projectCategoryReducer = projectCategorySlice.reducer;

export default projectCategoryReducer;
