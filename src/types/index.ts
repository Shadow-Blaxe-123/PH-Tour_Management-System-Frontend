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
