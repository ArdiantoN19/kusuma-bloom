"use server";

import { PayloadAddedTicket, ResponseTicketAction } from "@/types/ticketAction";
import { ticketService } from "./TicketService";

export const addTicketAction = async (
  data: PayloadAddedTicket
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

export const getTickets = async (): Promise<ResponseTicketAction> => {
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
        message: "Terjadi kesalahan, tiket gagal ditambahkan",
      };
    }
    return { status: "fail", message: error.message };
  }
};
