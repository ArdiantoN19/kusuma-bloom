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
  login({ email }: { email: string }): Promise<any>;
}
