import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class ScanTicketService {
  constructor(private readonly prismaScanTicket: PrismaClient["scanTicket"]) {}

  async addScanTicket(transactionId: string): Promise<void> {
    await this.prismaScanTicket.create({
      data: {
        transactionId,
      },
    });
  }
}

export const scanTicketService = new ScanTicketService(prisma.scanTicket);
