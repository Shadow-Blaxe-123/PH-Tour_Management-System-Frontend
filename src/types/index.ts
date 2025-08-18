import type { ComponentType } from "react";

export type {
  ISendOtp,
  ILogin,
  CreateResData,
  IRegister,
  LoginResData,
  IVerifyOtp,
} from "@/types/auth.types";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISideBarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
