import { apiClient } from "@/lib/api-client";
import {
  IUserConversionsResponse,
  IUserPoints,
  IUserTransactionsResponse,
  User,
} from "@/types/profile";

function normalizeUser(response: unknown): User {
  if (!response || typeof response !== "object") {
    throw new Error("Invalid user response");
  }

  const data = response as Record<string, unknown>;

  if (data.user && typeof data.user === "object") {
    return data.user as User;
  }

  return data as User;
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get("/users/me");
  return normalizeUser(data);
}

export async function fetchUserPoints() {
  const { data } = await apiClient.get<IUserPoints>("/users/points");
  return data;
}

export async function fetchUserTransactions() {
  const { data } = await apiClient.get("/users/transactions");

  if (Array.isArray(data)) {
    return data as IUserTransactionsResponse["transactions"];
  }

  return (data as IUserTransactionsResponse).transactions ?? [];
}

export async function fetchUserConversions() {
  const { data } = await apiClient.get("/users/conversions");

  if (Array.isArray(data)) {
    return data as IUserConversionsResponse["conversions"];
  }

  return (data as IUserConversionsResponse).conversions ?? [];
}

export async function fetchUserById(userId: string) {
  const { data } = await apiClient.get(`/users/${userId}`);
  return normalizeUser(data);
}
