import { InterfaceProject } from "../models/Project/Project.interface";
import {
  AXIOS_INSTANCE_GENERATOR,
  BASE_PROJECT_URL,
  BASE_PROJECT_CATEGORY_URL,
} from "./configURL";

const PROJECT_SERVICE = {
  createProject: async (projectInfo: InterfaceProject) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      "createProject",
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
  
  getAllProjectCategory: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_PROJECT_CATEGORY_URL
    ).get("");
    return data;
  },
};

export default PROJECT_SERVICE;
