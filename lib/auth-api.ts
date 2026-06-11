import axios, { isAxiosError } from "axios";
import { AUTH_BASE_URL } from "@/components/constants";

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  fName: string;
  lName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  message?: string;
  role?: "user" | "admin";
}

export function extractAuthToken(
  response: AuthResponse & Record<string, unknown>,
): string | null {
  if (typeof response.token === "string") return response.token;
  if (typeof response.accessToken === "string") return response.accessToken;
  if (typeof response.jwt === "string") return response.jwt;

  const nested = response.data;
  if (nested && typeof nested === "object") {
    const data = nested as Record<string, unknown>;
    if (typeof data.token === "string") return data.token;
    if (typeof data.accessToken === "string") return data.accessToken;
  }

  return null;
}

export function getAuthErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      if ("message" in data && typeof data.message === "string") {
        return data.message;
      }

      if ("errors" in data) {
        const { errors } = data;

        if (typeof errors === "string") {
          return errors;
        }

        if (Array.isArray(errors) && errors.length > 0) {
          return errors.join(", ");
        }
      }
    }

    return error.message || "Something went wrong";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

export async function loginUser(payload: LoginPayload) {
  const { data } = await authClient.post<AuthResponse>("/login", payload);
  return data;
}

export async function signUpUser(payload: SignupPayload) {
  const { data } = await authClient.post<AuthResponse>("/signup", payload);
  return data;
}
