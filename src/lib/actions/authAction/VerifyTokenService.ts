import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

interface IVerifyTokenService {
  addVerifyToken(data: { identifier: string; token: string }): Promise<void>;
  checkValidToken(data: {
    identifier: string;
    token: string;
  }): Promise<{ email: string; token: string }>;
  verifyToken(data: {
    identifier: string;
    token: string;
  }): Promise<{ email: string; token: string }>;
  updateToken(data: {
    identifier: string;
    oldToken: string;
    newToken: string;
  }): Promise<void>;
  deleteToken(data: { identifier: string; token: string }): Promise<void>;
  getTokenByEmail(email: string): Promise<{ token: string }>;
}

class VerifyTokenService implements IVerifyTokenService {
  constructor(
    private readonly prismaVerifyToken: PrismaClient["verificationToken"]
  ) {}

  async addVerifyToken(data: {
    identifier: string;
    token: string;
  }): Promise<void> {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 2);

    await this.prismaVerifyToken.create({
      data: {
        ...data,
        expires,
      },
    });
  }

  async checkValidToken(data: {
    identifier: string;
    token: string;
  }): Promise<{ email: string; token: string }> {
    const validToken = await this.prismaVerifyToken.findUnique({
      where: {
        identifier_token: {
          identifier: data.identifier,
          token: data.token,
        },
      },
    });
    if (!validToken) {
      throw new Error("Token tidak valid");
    }
    if (validToken.expires < new Date()) {
      throw new Error("Token expired, klik kirim ulang otp");
    }

    return { email: validToken.identifier, token: validToken.token };
  }

  async verifyToken(data: {
    identifier: string;
    token: string;
  }): Promise<{ email: string; token: string }> {
    const validToken = await this.prismaVerifyToken.findUnique({
      where: {
        identifier_token: {
          identifier: data.identifier,
          token: data.token,
        },
      },
    });
    if (!validToken) {
      throw new Error("Token tidak valid");
    }

    return { email: validToken.identifier, token: validToken.token };
  }

  async updateToken(data: {
    identifier: string;
    oldToken: string;
    newToken: string;
  }): Promise<void> {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 2);
    await this.prismaVerifyToken.update({
      where: {
        identifier_token: {
          identifier: data.identifier,
          token: data.oldToken,
        },
      },
      data: {
        token: data.newToken,
        expires,
      },
    });
  }

  async deleteToken(data: {
    identifier: string;
    token: string;
  }): Promise<void> {
    await this.prismaVerifyToken.delete({
      where: {
        identifier_token: {
          identifier: data.identifier,
          token: data.token,
        },
      },
    });
  }

  async getTokenByEmail(email: string): Promise<{ token: string }> {
    const data = await this.prismaVerifyToken.findFirst({
      where: {
        identifier: email,
      },
    });
    return { token: data?.token as string };
  }
}

export const verifyTokenService = new VerifyTokenService(
  prisma.verificationToken
);
