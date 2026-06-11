"use client";
import { store } from "@/redux/app/store";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
