"use server";

import { PayloadBodyTicket, ResponseTicketAction } from "@/types/ticketAction";
import { ticketService } from "./TicketService";

export const addTicketAction = async (
  data: PayloadBodyTicket
): Promise<ResponseTicketAction> => {
  try {
    await ticketService.checkAvailableTicketByDate({
      fromDate: data.fromDate,
      toDate: data.toDate,
    });
    await ticketService.addTicket(data);
    return { status: "success", message: "Ticket berhasil ditambahkan" };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, tiket gagal ditambahkan",
      };
    }
    return { status: "fail", message: error.message };
  }
};

export const getTicketsAction = async (): Promise<ResponseTicketAction> => {
  try {
    const tickets = await ticketService.getTickets();
    return {
      status: "success",
      message: "berhasil mendapatkan tickets",
      data: tickets,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, tiket gagal didapatkan",
      };
    }
    return { status: "fail", message: error.message };
  }
};

export const updateTicketByIdAction = async (
  id: string,
  data: PayloadBodyTicket
) => {
  try {
    const ticket = await ticketService.getTicketById(id);
    if (ticket.toDate < new Date()) {
      throw new Error("Tiket sudah kedaluwarsa, tidak dapat diubah");
    }
    await ticketService.updateTicketById(id, data);
    return { status: "success", message: "Tiket berhasil diubah" };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, tiket gagal diubah",
      };
    }
    return { status: "fail", message: error.message };
  }
};

export const deleteTicketByIdAction = async (
  id: string
): Promise<ResponseTicketAction> => {
  try {
    const ticket = await ticketService.getTicketById(id);
    if (ticket.toDate < new Date()) {
      throw new Error("Tiket sudah kedaluwarsa, tidak dapat dihapus");
    }
    await ticketService.deleteTicketById(id);
    return {
      status: "success",
      message: "Tiket berhasil dihapus",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, tiket gagal dihapus",
      };
    }
    return { status: "fail", message: error.message };
  }
};

export const activateTicketByIdAction = async (id: string) => {
  try {
    const ticket = await ticketService.getTickets();
    const ticketActive = ticket.find((ticket) => ticket.status === true);
    if (ticketActive?.status) {
      await ticketService.nonActiveTicketById(ticketActive.id);
    }
    await ticketService.activateTicketById(id);
    return {
      status: "success",
      message: "Tiket berhasil diaktifkan",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, tiket gagal diaktifkan",
      };
    }
    return { status: "fail", message: error.message };
  }
};

export const getTotalTicketRecordsAction =
  async (): Promise<ResponseTicketAction> => {
    try {
      const totalTicketRecords = await ticketService.getTotalTicketRecords();
      return {
        status: "success",
        message: "Total tiket berhasil didapatkan",
        data: {
          total: totalTicketRecords,
        },
      };
    } catch (error: any) {
      if ("code" in error) {
        return {
          status: "fail",
          message: "Terjadi kesalahan, tiket gagal didapatkan",
        };
      }
      return { status: "fail", message: error.message };
    }
  };

export const getActiveTicketAction = async () => {
  try {
    const ticketActive = await ticketService.getActiveTicket();
    return {
      status: "success",
      message: "Tiket berhasil didapatkan",
      data: ticketActive,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, tiket gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};
