import {
  ITransactionService,
  PayloadAddTransaction,
} from "@/types/transactionAction";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class TransactionService implements ITransactionService {
  constructor(
    private readonly prismaTransaction: PrismaClient["transaction"]
  ) {}

  async addTransaction(data: PayloadAddTransaction): Promise<void> {
    await this.prismaTransaction.create({
      data,
    });
  }

  async updateTransactionById(id: string, data: any): Promise<void> {
    await this.prismaTransaction.update({
      where: {
        id,
      },
      data,
    });
  }

  async checkAvailableVoucherInTransactionByUserId(
    userId: string,
    voucherId: string
  ): Promise<void> {
    const transaction = await this.prismaTransaction.findUnique({
      where: {
        userId_voucherId: {
          userId,
          voucherId,
        },
        AND: {
          status: {
            not: "FAILURE",
          },
        },
      },
    });

    if (transaction) {
      throw new Error("Voucher sudah pernah dipakai");
    }
  }

  async checkValidSnapToken(token: string): Promise<void> {
    const snapToken = await this.prismaTransaction.findUnique({
      where: {
        snap_token: token,
      },
    });
    if (!snapToken) {
      throw new Error("Token tidak valid");
    }
  }
}

export const transactionService = new TransactionService(prisma.transaction);
