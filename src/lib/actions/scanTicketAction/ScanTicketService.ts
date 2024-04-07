import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import {
  IScanTicketService,
  PayloadScanTicket,
  ResponseScanTicket,
} from "@/types/scanTicketAction";

class ScanTicketService implements IScanTicketService {
  constructor(private readonly prismaScanTicket: PrismaClient["scanTicket"]) {}

  async addScanTicket(transactionId: string): Promise<void> {
    await this.prismaScanTicket.create({
      data: {
        transactionId,
      },
    });
  }
  async getScanTicketByTransactionId(
    transactionId: string
  ): Promise<ResponseScanTicket> {
    const scanTicket = await this.prismaScanTicket.findUnique({
      where: {
        transactionId,
      },
      include: {
        transaction: {
          select: {
            expired: true,
          },
        },
      },
    });

    if (!scanTicket) throw new Error("Tiket tidak ditemukan");
    return scanTicket;
  }

  async updateScanTicketByTransactionId(
    transactionId: string,
    data: Partial<PayloadScanTicket>
  ): Promise<void> {
    await this.prismaScanTicket.update({
      where: {
        transactionId,
      },
      data,
    });
  }
}

export const scanTicketService = new ScanTicketService(prisma.scanTicket);
