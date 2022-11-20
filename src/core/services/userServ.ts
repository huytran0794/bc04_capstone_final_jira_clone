import { InterfaceProject } from "../models/Project/Project.interface";
import { User } from "../models/User/User.interface";
import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";

type TaskGetUserListResponse = {
  content: User[];
};

type ProjectResponse = {
  content: InterfaceProject;
};

const USER_SERVICE = {
  login: async (loginData: { email: string; passWord: string }) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/signin`,
      loginData
    );
    return data;
  },

  getAllUser: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/getUser`
    );
    return data;
  },

  getUserByKeyword: async (keyword: string) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_USER_URL
    ).get<TaskGetUserListResponse>(`/getUser?keyword=${keyword}`);
    return data;
  },
  getUserByProjectId: async (id: number) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_USER_URL
    ).get<TaskGetUserListResponse>(`/getUserByProjectId?idProject=${id}`);
    return data;
  },

  register: async (registerData: User) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/signup`,
      registerData
    );
    return data;
  },
};

export default USER_SERVICE;
