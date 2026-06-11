import { baseApi } from "@/redux/app/baseApi";
import { LoginDTO, SignUpDTO, AuthResponse } from "@/types/auth";
import { setUser } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginDTO>({
      query: (data) => ({
        url: "/users/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ token: data.token, role: data.role }));

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),

    // Sign Up
    signUp: builder.mutation<AuthResponse, SignUpDTO>({
      query: (data) => ({
        url: "/users/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ token: data.token, role: data.role }));

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        } catch (error) {
          console.error("Signup failed:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
export default authApi;
