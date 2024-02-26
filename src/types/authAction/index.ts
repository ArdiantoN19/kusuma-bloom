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
}

export type UserType = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  role: ROLE;
  created_at: Date;
  updated_at: Date;
};
