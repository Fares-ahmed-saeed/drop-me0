import axios from "axios";
import { getCookie } from "cookies-next";
import { API_URL } from "@/components/constants";
import { getStoredToken } from "@/lib/auth-token";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken() || getCookie("token")?.toString();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
