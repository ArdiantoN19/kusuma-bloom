import {
  ITransactionService,
  ORDERBY,
  PayloadAddTransaction,
  ResponseTransaction,
  TRANSACTION_STATUS,
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

  async updateTransactionById(
    id: string,
    data: Record<string, any>
  ): Promise<void> {
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

  async getTransactionById(id: string): Promise<ResponseTransaction> {
    const transaction = await this.prismaTransaction.findUnique({
      where: {
        id,
      },
    });
    if (!transaction) {
      throw new Error("Transaksi tidak ditemukan");
    }
    return transaction as ResponseTransaction;
  }

  async getVoucherIdInTransactionByUserId(userId: string): Promise<string[]> {
    const voucherIds = await this.prismaTransaction.findMany({
      where: {
        userId,
        voucherId: {
          not: null,
        },
      },
      select: {
        voucherId: true,
      },
    });

    return voucherIds.map((voucher) => voucher.voucherId) as string[];
  }

  async getLatestTransaction(): Promise<ResponseTransaction> {
    const transaction = await this.prismaTransaction.findFirst({
      orderBy: {
        created_at: "desc",
      },
    });

    return transaction as ResponseTransaction;
  }

  async getCountTransactionByStatus(
    status: TRANSACTION_STATUS
  ): Promise<number> {
    const statusLength = await this.prismaTransaction.count({
      where: {
        status,
      },
    });

    return statusLength;
  }

  async getTransactions(orderBy?: ORDERBY): Promise<ResponseTransaction[]> {
    const transactions = await this.prismaTransaction.findMany({
      orderBy: {
        created_at: orderBy,
      },
    });

    return transactions as ResponseTransaction[];
  }
}

export const transactionService = new TransactionService(prisma.transaction);
