import { GENDER } from "@/lib/actions/userAction/Validator";

export enum ROLE {
  REGULAR = "REGULAR",
  ADMIN = "ADMIN",
}

export type PayloadRegisterType = {
  username: string;
  email: string;
  password: string;
  role?: ROLE;
};

export interface IAuthService {
  checkAvailableEmail(email: string): Promise<any>;
  register(data: PayloadRegisterType): Promise<any>;
  login(email: string): Promise<any>;
  getUserByEmail(email: string): Promise<UserType>;
  updateEmailVerified(email: string): Promise<void>;
}

export type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  role: ROLE;
  gender: GENDER;
  address: string;
  created_at: Date;
  updated_at: Date;
};
