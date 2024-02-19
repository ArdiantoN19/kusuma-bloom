import prisma from "@/lib/prisma";
import { IAuthService, PayloadRegisterType, ROLE } from "@/types/authAction";
import { PrismaClient } from "@prisma/client";

class AuthService implements IAuthService {
  constructor(private readonly prismaUser: PrismaClient["user"]) {}

  async checkAvailableEmail(email: string): Promise<any> {
    const userEmail = await this.prismaUser.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });
    if (userEmail) {
      throw new Error("Email sudah terdaftar");
    }
  }

  async register({
    username,
    email,
    password,
    role = ROLE.REGULAR,
  }: PayloadRegisterType): Promise<any> {
    await this.prismaUser.create({
      data: {
        email,
        name: username,
        password,
        role,
        image: `${process.env.NEXT_PUBLIC_API_AVATAR_URL}?seed=${username}`,
      },
    });
  }

  async login({ email }: { email: string }): Promise<any> {
    return await this.prismaUser.findFirst({
      where: {
        email,
      },
    });
  }
}

export const authService = new AuthService(prisma.user);
// export const authService = {
//   checkAvailableEmail(email: string) {
//     console.log({ email });
//   },
// };
