import { Dispatch } from "@reduxjs/toolkit";
import { message } from "antd";
import { projectActions } from "../redux/slice/projectSlice";
import { AXIOS_INSTANCE_GENERATOR, BASE_PROJECT_URL } from "./configURL";

const PROJECT_SERVICE = {
  getAll: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getAllProject`
    );
    return data;
  },
  getAllAndDispatch:
    (successMessage: string | null) => (dispatch: Dispatch) => {
      AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
        .get(`/getAllProject`)
        .then((res) => {
          // console.log(res);
          dispatch(projectActions.updateProjectList(res.data.content));
          if (successMessage) {
            message.success(successMessage);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.content);
        });
    },
  getDetails: async (projectID: number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getProjectDetail?id=${projectID}`
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
