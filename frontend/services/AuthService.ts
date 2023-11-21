import RegisterData from "@/types/RegisterData";
import { instance } from "./service.api.config";
import User from "@/types/User";
import LoginData from "@/types/LoginData";
import { AxiosError } from "axios";

const AuthService = {
  register(data: RegisterData) {
    return instance
      .post("/auth/register/", data)
      .then((response) => {
        return response.data as User;
      })
      .catch((error) => {
        
      });
  },
  login(data: LoginData) {
    return instance
      .post(`/auth/login/`, data)
      .then((response) => {
        return response.data as User;
      })
      .catch((error: AxiosError) => {
        if (error.response?.status == 400) throw Error("Invalid credentials");
        console.error(error);
        return null;
      });
  },
  logout() {
    return instance
      .post(`/auth/logout/`)
      .then((response) => {
        return true;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default AuthService;
