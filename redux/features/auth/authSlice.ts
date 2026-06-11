import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { clearStoredToken, getStoredToken } from "@/lib/auth-token";

export interface IAuthState {
  token: string | null;
  role: "user" | "admin" | null;
}

const initialState: IAuthState = {
  token:
    typeof window !== "undefined" ? getStoredToken() || getCookie("token")?.toString() || null : null,

  role:
    typeof window !== "undefined"
      ? (getCookie("role")?.toString() as "user" | "admin") || null
      : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; role: "user" | "admin" }>,
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;

      if (typeof window !== "undefined") {
        // save token
        setCookie("token", action.payload.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        // save role
        setCookie("role", action.payload.role, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
      }
    },

    logout: (state) => {
      state.token = null;
      state.role = null;

      if (typeof window !== "undefined") {
        clearStoredToken();
        deleteCookie("token", { path: "/" });
        deleteCookie("role", { path: "/" });
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
