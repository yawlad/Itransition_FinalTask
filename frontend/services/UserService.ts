import { AxiosError } from "axios";
import { instance } from "./service.api.config";
import User from "@/types/User";
import handleAxiosError from "@/utils/handleAxiosError";

const UserService = {
  getUsers() {
    return instance
      .get("/users/")
      .then((response) => {
        return response.data as User[];
      })
      .catch(handleAxiosError);
  },
  getUser(id: number) {
    return instance
      .get(`/users/${id}/`)
      .then((response) => {
        return response.data as User;
      })
      .catch(handleAxiosError);
  },
  patchUser(
    id: number,
    data: { is_blocked?: boolean; is_superuser?: boolean }
  ) {
    return instance
      .patch(`/users/${id}/`, data)
      .then((response) => {
        return response.data as User;
      })
      .catch(handleAxiosError);
  },
  deleteUser(id: number) {
    return instance
      .delete(`/users/${id}/`)
      .then((response) => {
        return;
      })
      .catch(handleAxiosError);
  },
  getMe() {
    return instance
      .get(`/users/me/`)
      .then((response) => {
        return response.data as User;
      })
      .catch(handleAxiosError);
  },
  patchMe(data: { username?: string; email?: string; new_password?: string }) {
    return instance
      .patch(`/users/me/`, data)
      .then((response) => {
        return response.data as User;
      })
      .catch(handleAxiosError);
  },
};

export default UserService;
