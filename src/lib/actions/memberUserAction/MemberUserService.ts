import {
  IMemberUser,
  PayloadBodyMemberUser,
  ResponseMemberUser,
} from "@/types/memberUserAction";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class MemberUserService implements IMemberUser {
  constructor(private readonly prismaMemberUser: PrismaClient["memberUser"]) {}

  async checkAvailableMemberUserById(userId: string): Promise<void> {
    const memberUser = await this.prismaMemberUser.findFirst({
      where: {
        userId,
      },
    });

    if (memberUser) {
      throw new Error(
        "Member user telah ditambahkan, menunggu proses review oleh admin!"
      );
    }
  }

  async addMemberUser(data: PayloadBodyMemberUser): Promise<void> {
    await this.prismaMemberUser.create({ data });
  }

  async getMemberUserById(userId: string): Promise<ResponseMemberUser> {
    const memberUser = await this.prismaMemberUser.findFirst({
      where: {
        userId,
      },
    });

    return memberUser as ResponseMemberUser;
  }
}

export const memberUserService = new MemberUserService(prisma.memberUser);
