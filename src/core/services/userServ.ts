import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";
import { User, UserInterface } from './../models/User/User.interface';

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
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/getUser?keyword=${keyword}`
    );
    return data;
  },

  register: async (registerData:User) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/signup`,
      registerData
    );
    return data;
  },

  deleteUser: async (userId:number|undefined) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).delete(
      `/deleteUser?id=${userId}`,
      
    );
    return data;
  },

  editUser: async (userEdit:User) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).put(
      `/editUser`,
      userEdit
    );
    return data;
  },

};

export default USER_SERVICE;
