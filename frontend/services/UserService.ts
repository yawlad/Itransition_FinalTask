import { instance } from "./service.api.config";
import User from "@/types/User";

const UserService = {
  getUsers() {
    return instance
      .get("/users/")
      .then((response) => {
        return response.data as User[];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  },
  getUser(id: number) {
    return instance
      .get(`/users/${id}/`)
      .then((response) => {
        return response.data as User;
      })
      .catch((error) => {
        console.error(error);
        return {};
      });
  },
  getMe() {
    return instance
      .get(`/users/me/`)
      .then((response) => {
        return response.data as User;
      })
      .catch((error) => {
        throw error;
      });
  },
  patchMe(data: { username?: string; email?: string; new_password?: string }) {
    return instance
      .patch(`/users/me/`, data)
      .then((response) => {
        return response.data as User;
      })
      .catch((error) => {
        throw error;
      });
  },
};

export default UserService;
