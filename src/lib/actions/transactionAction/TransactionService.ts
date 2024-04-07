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
      include: {
        voucher: {
          select: {
            discount: true,
          },
        },
        memberUser: {
          select: {
            discount: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
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
    userId: string,
    status: TRANSACTION_STATUS
  ): Promise<number> {
    const statusLength = await this.prismaTransaction.count({
      where: {
        status,
        userId,
      },
    });

    return statusLength;
  }

  async getTransactions({
    userId,
    orderBy,
    limit,
  }: {
    userId?: string;
    orderBy?: ORDERBY;
    limit?: number;
  }): Promise<ResponseTransaction[]> {
    const transactions = await this.prismaTransaction.findMany({
      where: {
        userId,
      },
      take: limit,
      orderBy: {
        created_at: orderBy,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return transactions as ResponseTransaction[];
  }

  async getAllCountTransactions(): Promise<number> {
    const count = await this.prismaTransaction.count();
    return count;
  }

  async getAllCountTransactionsInOneMonth(): Promise<number> {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const count = await this.prismaTransaction.count({
      where: {
        created_at: {
          lte: lastDayOfMonth,
          gte: firstDayOfMonth,
        },
      },
    });

    return count;
  }
}

export const transactionService = new TransactionService(prisma.transaction);
