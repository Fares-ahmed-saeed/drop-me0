"use client";

import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(logoutAction());
    router.push("/login");
  };

  return logout;
};
