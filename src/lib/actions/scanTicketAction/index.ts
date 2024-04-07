"use server";

import { ResponseTransactionWithDiscount } from "@/types/transactionAction";
import { transactionService } from "../transactionAction/TransactionService";
import { scanTicketService } from "./ScanTicketService";

export const getScanTicketByTransactionIdAction = async (
  transactionId: string
) => {
  try {
    const scanTicket = await scanTicketService.getScanTicketByTransactionId(
      transactionId
    );
    if (scanTicket.status) {
      throw new Error("Tiket sudah pernah dipakai");
    }

    if (
      new Date(scanTicket.transaction.expired).getDate() !==
      new Date().getDate()
    ) {
      throw new Error("Tiket sudah kedaluwarsa atau belum dapat diaktifkan");
    }
    let transaction: ResponseTransactionWithDiscount =
      await transactionService.getTransactionById(scanTicket.transactionId);
    const total = transaction.quantity * transaction.price;
    if (transaction.memberUserId && transaction.voucherId) {
      const discountMember = total * transaction.memberUser?.discount!;
      const discountVoucher = total * transaction.voucher?.discount!;
      transaction = { discountMember, discountVoucher, ...transaction };
    }

    if (transaction.memberUserId) {
      const discountMember = total * transaction.memberUser?.discount!;
      transaction = { discountMember, ...transaction };
    }

    if (transaction.voucherId) {
      const discountVoucher = total * transaction.voucher?.discount!;
      transaction = { discountVoucher, ...transaction };
    }
    return {
      status: "success",
      message: "Scan Tiket berhasil didapatkan",
      data: transaction,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, scan tiket gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const confirmScanTicketByTransactionIdAction = async (
  transactionId: string,
  userId: string
) => {
  try {
    await scanTicketService.updateScanTicketByTransactionId(transactionId, {
      status: true,
      scannedAt: new Date(),
      acceptedBy: userId,
    });
    return {
      status: "success",
      message: "Tiket berhasil diaktifkan",
    };
  } catch (error: any) {
    return {
      status: "fail",
      message: "Terjadi kesalahan, tiket gagal diaktifkan",
    };
  }
};
