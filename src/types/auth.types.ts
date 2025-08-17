export interface ISendOtp {
  email: string;
}
export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}
export interface LoginResData {
  accessToken: string;
  refreshToken: string;
}
export interface IRegister {
  email: string;
  name: string;
  password: string;
}
export interface Auth {
  provider: string;
  providerId: string;
}

export interface CreateResData {
  name: string;
  email: string;
  password: string;
  isDeleted: boolean;
  isVerified: boolean;
  isActive: string;
  role: string;
  auths: Auth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}
