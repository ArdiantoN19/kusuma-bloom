import {
  ITicketService,
  PayloadAddedTicket,
  PayloadCheckAvailableTicketByDate,
} from "@/types/ticketAction";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class TicketService implements ITicketService {
  constructor(private readonly prismaTicket: PrismaClient["ticket"]) {}

  async checkAvailableTicketByDate(data: PayloadCheckAvailableTicketByDate) {
    const ticket = await this.prismaTicket.findUnique({
      where: {
        fromDate_toDate: {
          fromDate: data.fromDate,
          toDate: data.toDate,
        },
      },
    });
    if (ticket) {
      throw new Error("Gagal menambahkankan tiket, tiket sudah dibuat");
    }
  }

  async addTicket(data: PayloadAddedTicket) {
    await this.prismaTicket.create({ data });
  }

  async getTickets() {
    const tickets = await this.prismaTicket.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return tickets;
  }
}

export const ticketService = new TicketService(prisma.ticket);
