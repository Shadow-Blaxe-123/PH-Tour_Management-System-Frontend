export interface IUser {
  _id: string;
  name: string;
  email: string;
  isDeleted: boolean;
  isVerified: boolean;
  isActive: string;
  role: string;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
  address: string;
  phone: string;
}

export interface Auth {
  provider: string;
  providerId: string;
}
