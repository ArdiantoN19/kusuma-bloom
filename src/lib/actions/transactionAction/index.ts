"use server";

import { ResponseTransactionWithDiscount } from "@/types/transactionAction";
import { transactionService } from "./TransactionService";
import { PayloadSendMailType } from "@/types/resend";
import { nodemailerEmailService } from "@/lib/nodemailer";

export const checkValidTokenAction = async (token: string) => {
  try {
    await transactionService.checkValidSnapToken(token);
    return true;
  } catch (error) {
    return false;
  }
};

export const getTransactionByIdAction = async (
  userId: string,
  transactionId: string
) => {
  try {
    let transaction: ResponseTransactionWithDiscount =
      await transactionService.getTransactionById(transactionId);
    if (transaction.userId !== userId) {
      throw new Error("Anda tidak boleh mengakses resource ini!");
    }
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
      message: "Transaksi berhasil didapatkan",
      data: transaction,
    };
  } catch (error: any) {
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const sendMailByTransactionIdAction = async (
  email: string,
  template: string
) => {
  const payload: PayloadSendMailType = {
    to: email,
    subject: "Konfirmasi Pemesanan Tiket KUSUMA BLOOM",
    html: template,
  };
  nodemailerEmailService.sendMail(payload);
};

export const getTransactionsAction = async () => {
  try {
    const transactions = await transactionService.getTransactions({});
    return {
      status: "success",
      message: "Transaksi berhasil didapatkan",
      data: transactions,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, transaksi gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};
