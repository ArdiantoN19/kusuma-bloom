import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { IReportService, PayloadReportType } from "@/types/reportAction";

class ReportService implements IReportService {
  constructor(private readonly prismaReport: PrismaClient["report"]) {}

  async addReport(data: PayloadReportType): Promise<void> {
    await this.prismaReport.create({ data });
  }
}

export const reportService = new ReportService(prisma.report);
