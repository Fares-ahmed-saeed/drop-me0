export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://recyclingapp-ochre.vercel.app";

export const AUTH_BASE_URL = `${API_URL}/users/auth`;

export const TOKEN_COOKIE = "Task_Manager.token";
