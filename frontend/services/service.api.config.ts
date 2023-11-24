import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || `http://127.0.0.1:8000/api/v1/`,
});
