import { GENDER } from "@/lib/actions/userAction/Validator";
import { ROLE } from "../authAction";

export type PayloadBodyUser = {
  name: string;
  email: string;
  password: string;
  image: string;
  role: ROLE;
  gender: GENDER;
  address?: string | null;
  emailVerified?: Date | null;
};

export type ResponseUser = {
  id: string;
  created_at: Date;
  updated_at: Date;
  memberUsers?: {
    userId: string;
    image: string;
    verifiedAt?: Date | null;
  } | null;
} & PayloadBodyUser;

export type ResponseUserAction = {
  status: string;
  message: string;
  data?: any;
};

export interface IUserService {
  checkAvailableEmail(email: string): Promise<void>;
  addUser(data: PayloadBodyUser): Promise<ResponseUser>;
  getUsers(idToExclude: string): Promise<ResponseUser[]>;
  updateImageUserById(id: string, image: string): Promise<void>;
  getUserById(id: string): Promise<ResponseUser>;
  deleteUserById(id: string): Promise<void>;
  updateUserById(id: string, data: PayloadBodyUser): Promise<ResponseUser>;
  getTotalUserRecords(): Promise<number>;
  getCountUsers(): Promise<number>;
}
