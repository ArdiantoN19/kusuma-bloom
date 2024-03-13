import {
  IVoucherService,
  PayloadBodyVoucher,
  ResponseVoucher,
} from "@/types/voucherAction";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

class VoucherService implements IVoucherService {
  constructor(private readonly prismaVoucher: PrismaClient["voucher"]) {}

  async checkAvailableVoucher(name: string): Promise<void> {
    const voucher = await this.prismaVoucher.findUnique({
      where: {
        name,
      },
    });

    if (voucher) {
      throw new Error("Voucher sudah ada");
    }
  }

  async addVoucher(data: PayloadBodyVoucher): Promise<void> {
    await this.prismaVoucher.create({ data });
  }

  async getVouchers(): Promise<ResponseVoucher[]> {
    const vouchers = await this.prismaVoucher.findMany({
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
    return vouchers as ResponseVoucher[];
  }

  async getVoucherById(id: string): Promise<ResponseVoucher> {
    const voucher = await this.prismaVoucher.findFirst({
      where: {
        id,
      },
    });
    if (!voucher) {
      throw new Error("Voucher tidak ditemukan");
    }
    return voucher as ResponseVoucher;
  }

  async updateVoucherById(id: string, data: PayloadBodyVoucher): Promise<void> {
    await this.prismaVoucher.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteVoucherById(id: string): Promise<void> {
    await this.prismaVoucher.delete({
      where: {
        id,
      },
    });
  }
}

export const voucherService = new VoucherService(prisma.voucher);
