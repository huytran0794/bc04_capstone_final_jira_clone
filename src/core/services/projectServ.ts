import { AXIOS_INSTANCE_GENERATOR, BASE_PROJECT_URL } from "./configURL";

const PROJECT_SERVICE = {
  getAll: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getAllProject`
    );
    return data;
  },
};

export default PROJECT_SERVICE;
