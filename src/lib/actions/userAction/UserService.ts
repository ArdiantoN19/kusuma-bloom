import {
  IUserService,
  PayloadBodyUser,
  ResponseUser,
} from "@/types/userAction";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class UserService implements IUserService {
  constructor(private readonly prismaUser: PrismaClient["user"]) {}

  async checkAvailableEmail(email: string): Promise<void> {
    const user = await this.prismaUser.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error("Email sudah terdaftar");
    }
  }

  async addUser(data: PayloadBodyUser): Promise<ResponseUser> {
    const user = await this.prismaUser.create({
      data,
    });

    return user as ResponseUser;
  }

  async getUsers(idToExclude: string): Promise<ResponseUser[]> {
    const users = await this.prismaUser.findMany({
      where: {
        id: {
          not: idToExclude,
        },
      },
    });
    return users as ResponseUser[];
  }

  async getUserById(id: string): Promise<ResponseUser> {
    const user = await this.prismaUser.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    return user as ResponseUser;
  }

  async updateImageUserById(id: string, image: string): Promise<void> {
    await this.prismaUser.update({
      where: {
        id,
      },
      data: {
        image,
      },
    });
  }
}

export const userService = new UserService(prisma?.user);
