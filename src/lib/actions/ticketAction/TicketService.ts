import {
  ITicketService,
  PayloadAddedTicket,
  PayloadCheckAvailableTicketByDate,
  ResponseTicket,
} from "@/types/ticketAction";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class TicketService implements ITicketService {
  constructor(private readonly prismaTicket: PrismaClient["ticket"]) {}

  async checkAvailableTicketByDate(
    data: PayloadCheckAvailableTicketByDate
  ): Promise<void> {
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

  async addTicket(data: PayloadAddedTicket): Promise<void> {
    await this.prismaTicket.create({ data });
  }

  async getTickets(): Promise<ResponseTicket[]> {
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

  async getTicketById(id: string): Promise<ResponseTicket> {
    const ticket = await this.prismaTicket.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    if (!ticket) {
      throw new Error("Tiket tidak ditemukan");
    }

    return ticket;
  }

  async deleteTicketById(id: string): Promise<void> {
    await this.prismaTicket.delete({
      where: {
        id,
      },
    });
  }
}

export const ticketService = new TicketService(prisma.ticket);
