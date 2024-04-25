"use server";

import { TRANSACTION_STATUS } from "@/types/transactionAction";
import { transactionService } from "../actions/transactionAction/TransactionService";
import { voucherService } from "../actions/voucherAction/VoucherService";
import { ticketService } from "../actions/ticketAction/TicketService";
import { scanTicketService } from "../actions/scanTicketAction/ScanTicketService";
import {
  getTransactionByIdAction,
  sendMailByTransactionIdAction,
} from "@/lib/actions/transactionAction";
import { templateTransactionTicket } from "@/lib/actions/transactionAction/templateConfirmationTicket";
import { ResponseTransactionWithDiscount } from "@/types/transactionAction";

export type ResponseTypeMidtrans = {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  finish_redirect_url: string;
};

type ResponseErrorTypeMidtrans = {
  error_messages?: string[];
  status_code?: number;
  finish_redirect_url: string;
};

export const snapSuccessStatus = async (
  response: ResponseTypeMidtrans,
  user: {
    email: string;
    userId: string;
  }
): Promise<void> => {
  try {
    const data: Record<string, any> = {
      payment_type: response.payment_type,
      status: TRANSACTION_STATUS.SUCCESS,
    };
    await transactionService.updateTransactionById(response.order_id, data);
    await scanTicketService.addScanTicket(response.order_id);

    const transaction: ResponseTransactionWithDiscount = (
      await getTransactionByIdAction(user.userId, response.order_id)
    ).data!;

    const template = templateTransactionTicket(transaction);
    await sendMailByTransactionIdAction(user.email, template);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const snapPendingStatus = async (
  response: ResponseTypeMidtrans | any
) => {
  try {
    if (response.transaction_status === "pending") {
      const data: Record<string, any> = {
        payment_type: response.payment_type,
        status: TRANSACTION_STATUS.PENDING,
      };
      await transactionService.updateTransactionById(response.order_id, data);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export const snapErrorStatus = async (
  response: ResponseErrorTypeMidtrans | any
) => {
  try {
    const transactionId = response.order_id;
    const data: Record<string, any> = {
      status: TRANSACTION_STATUS.FAILURE,
    };
    const transaction = await transactionService.getTransactionById(
      transactionId
    );

    if (transaction.voucherId) {
      const voucher = await voucherService.getVoucherById(
        transaction.voucherId
      );
      const voucherTotal = voucher.total + 1;
      await voucherService.updateTotalVoucherById(voucher.id, voucherTotal);
    }

    const ticket = await ticketService.getTicketById(transaction.ticketId);
    const ticketTotal = ticket.quantity + transaction.quantity;
    await ticketService.updateTicketQuantityById(ticket.id, ticketTotal);

    await transactionService.updateTransactionById(transactionId, data);
  } catch (error: any) {
    console.error(error.message);
  }
};
