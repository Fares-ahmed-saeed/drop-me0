export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}
