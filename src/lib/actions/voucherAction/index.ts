"use server";

import {
  PayloadBodyVoucher,
  ResponseVoucherAction,
} from "@/types/voucherAction";
import { voucherService } from "./VoucherService";
import { transactionService } from "../transactionAction/TransactionService";

export const addVoucherAction = async (
  data: PayloadBodyVoucher
): Promise<ResponseVoucherAction> => {
  try {
    await voucherService.checkAvailableVoucher(data.name);
    await voucherService.addVoucher(data);
    return {
      status: "success",
      message: "Voucher berhasil ditambahkan",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, voucher gagal ditambahkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const getVouchersAction = async (): Promise<ResponseVoucherAction> => {
  try {
    const vouchers = await voucherService.getVouchers();
    return {
      status: "success",
      message: "Voucher berhasil didapatkan",
      data: vouchers,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, voucher gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const deleteVoucherByIdAction = async (id: string) => {
  try {
    await voucherService.getVoucherById(id);
    await voucherService.deleteVoucherById(id);
    return {
      status: "success",
      message: "Voucher berhasil dihapus",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, voucher gagal dihapus",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const updateVoucherByIdAction = async (
  id: string,
  data: PayloadBodyVoucher
) => {
  try {
    await voucherService.getVoucherById(id);
    await voucherService.updateVoucherById(id, data);
    return {
      status: "success",
      message: "Voucher berhasil diubah",
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, voucher gagal diubah",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};

export const getVoucherByNameAction = async ({
  name,
  userId,
}: Record<string, string>) => {
  try {
    const voucher = await voucherService.getVoucherByName(name);
    await transactionService.checkAvailableVoucherInTransactionByUserId(
      userId,
      voucher.id
    );
    return {
      status: "success",
      message: "Voucher berhasil didapatkan",
      data: voucher,
    };
  } catch (error: any) {
    if ("code" in error) {
      return {
        status: "fail",
        message: "Terjadi kesalahan, voucher gagal didapatkan",
      };
    }
    return {
      status: "fail",
      message: error.message,
    };
  }
};
