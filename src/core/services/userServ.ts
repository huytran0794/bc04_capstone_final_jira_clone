import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";

const USER_SERVICE = {
  login: (data: {email: string, password: string}) =>
    AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(`/DangNhap`, data),
}