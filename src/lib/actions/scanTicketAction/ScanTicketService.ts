import { PrismaClient } from "@prisma/client";

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
