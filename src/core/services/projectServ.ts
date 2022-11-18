// import config URL
import {
  AXIOS_INSTANCE_GENERATOR,
  BASE_PROJECT_URL,
  BASE_PROJECT_CATEGORY_URL,
} from "./configURL";

// import redux
import { projectActions } from "../redux/slice/projectSlice";
import { spinnerActions } from "../redux/slice/spinnerSlice";
import { AppDispatch } from "../redux/store/store";

// import local interface
import {
  InterfaceProject,
  InterfaceProjectUpdate,
} from "../models/Project/Project.interface";

// import ANTD components
import { message } from "antd";

const PROJECT_SERVICE = {
  createProject: async (projectInfo: InterfaceProject) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      "createProjectAuthorize",
      projectInfo
    );
    return data;
  },
  getAll: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getAllProject`
    );
    return data;
  },
  getAllByName: async (searchKey: string) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getAllProject?keyword=${searchKey}`
    );
    return data;
  },
  getAllAndDispatch:
    (successMessage: string | null) => (dispatch: AppDispatch) => {
      AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
        .get(`/getAllProject`)
        .then((res) => {
          dispatch(projectActions.updateProjectList(res.data.content));
          if (successMessage) {
            message.success(successMessage);
          }
          dispatch(spinnerActions.setLoadingOff());
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.content);
          dispatch(spinnerActions.setLoadingOff());
        });
    },
  getAllProjectCategory: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_PROJECT_CATEGORY_URL
    ).get("");
    return data;
  },
  getDetails: async (projectID: number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getProjectDetail?id=${projectID}`
    );
    return data;
  },
  getDetailsAndSetProject:
    (
      projectID: number,
      setProject: React.Dispatch<React.SetStateAction<InterfaceProject | null>>,
      successMessage?: string
    ) =>
    (dispatch: AppDispatch) => {
      AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
        .get(`/getProjectDetail?id=${projectID}`)
        .then((res) => {
          console.log(res);
          setProject(res.data.content);
          if (successMessage) {
            message.success(successMessage);
          }
          dispatch(spinnerActions.setLoadingOff());
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.content);
          dispatch(spinnerActions.setLoadingOff());
        });
    },
  update: async (projectId: number, updatedProject: InterfaceProjectUpdate) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).put(
      `/updateProject?projectId=${projectId}`,
      updatedProject
    );
    return data;
  },
  delete: async (projectID: number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).delete(
      `/deleteProject?projectId=${projectID}`
    );
    return data;
  },
  assignUser: async (projectId: number, userId: number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      `/assignUserProject`,
      { projectId, userId }
    );
    return data;
  },
  deleteMember: async (projectId: number, userId: number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      `/removeUserFromProject`,
      { projectId, userId }
    );
    return data;
  },
};

export default PROJECT_SERVICE;
