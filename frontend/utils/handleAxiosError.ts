import { AxiosError } from "axios";
import sessionStore from "@/stores/SessionStore";

const handleAxiosError = (error: AxiosError) => {
  if (error.response?.status == 403) {
    sessionStore.setUser(null);
    throw error;
  }
  throw error;
};

export default handleAxiosError;
