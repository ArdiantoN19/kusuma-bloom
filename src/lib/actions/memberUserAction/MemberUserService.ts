import {
  IMemberUser,
  PayloadBodyMemberUser,
  PayloadDeleteMemberUser,
  PayloadVerifyMemberUser,
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

  async verifyMemberUser(data: PayloadVerifyMemberUser): Promise<void> {
    await this.prismaMemberUser.update({
      where: {
        userId: data.userId,
      },
      data: {
        verifiedAt: new Date(),
        ...data,
      },
    });
  }

  async deleteMemberUser(data: PayloadDeleteMemberUser): Promise<void> {
    await this.prismaMemberUser.delete({
      where: {
        userId: data.userId,
        acceptedBy: data.acceptedBy,
      },
    });
  }
}

export const memberUserService = new MemberUserService(prisma.memberUser);
