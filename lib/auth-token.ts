import { setCookie, deleteCookie } from "cookies-next";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function saveStoredToken(token: string): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", token);
  setCookie("token", token, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  deleteCookie("token", { path: "/" });
}
