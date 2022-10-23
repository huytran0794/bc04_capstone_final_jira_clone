import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";

const USER_SERVICE = {
  login: async (loginData: {email: string, passWord: string}) => {
    let {data} = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(`/signin`, loginData);
    return data;
  } ,
}

export default USER_SERVICE;