import { Project } from "../models/Project.interface";
import { AXIOS_INSTANCE_GENERATOR, BASE_PROJECT_URL, BASE_PROJECT_CATEGORY_URL } from "./configURL";

const PROJECT_SERVICE = {
  getAllProjectCategory: async () => {
    let {data} = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_CATEGORY_URL).get('');
    return data;
  },
  createProject: async (projectInfo: Project) => {
    let {data} = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post('createProject', projectInfo);
    return data;
  },
}

export default PROJECT_SERVICE;