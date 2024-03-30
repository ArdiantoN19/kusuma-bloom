import {
  ITicketService,
  PayloadBodyTicket,
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

  async addTicket(data: PayloadBodyTicket): Promise<void> {
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
        updated_at: "desc",
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

  async updateTicketById(id: string, data: PayloadBodyTicket): Promise<void> {
    await this.prismaTicket.update({
      where: { id },
      data,
    });
  }

  async deleteTicketById(id: string): Promise<void> {
    await this.prismaTicket.delete({
      where: {
        id,
      },
    });
  }

  async activateTicketById(id: string): Promise<void> {
    await this.prismaTicket.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    });
  }

  async nonActiveTicketById(id: string): Promise<void> {
    await this.prismaTicket.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });
  }

  async getTotalTicketRecords(): Promise<number> {
    return await this.prismaTicket.count();
  }

  async getActiveTicket(): Promise<ResponseTicket | null> {
    const ticketActive = await this.prismaTicket.findFirst({
      where: {
        status: true,
        quantity: {
          gt: 0,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return ticketActive;
  }

  async updateTicketQuantityById(id: string, quantity: number): Promise<void> {
    await this.prismaTicket.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });
  }
}

export const ticketService = new TicketService(prisma.ticket);
