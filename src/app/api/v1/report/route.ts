import { reportService } from "@/lib/actions/reportAction/ReportService";
import { transactionService } from "@/lib/actions/transactionAction/TransactionService";
import {
  payloadPost,
  transformDataTransaction,
} from "@/types/generateExcelRoute";
import { PayloadReportType } from "@/types/reportAction";
import { generateExcel, writeFileAsync } from "@/utils/excel";
import { ClientError } from "@/utils/exceptions/ClientError";

export async function POST(req: Request) {
  try {
    const payload: payloadPost = await req.json();
    let transactions = await transactionService.getTransactions({});
    transactions = transactions.filter(
      (filter) =>
        new Date(filter.created_at) >= new Date(payload.from) &&
        new Date(filter.created_at) <= new Date(payload.to)
    );

    if (!transactions.length) {
      throw new ClientError("Data tidak ditemukan");
    }

    const filename = `laporan-${new Date().getTime()}${new Date().getFullYear()}${
      new Date().getMonth() + 1
    }${new Date().getDate()}`;

    const xlsxBuffer = await generateExcel(
      transformDataTransaction(transactions),
      filename
    );

    const dataBuffer = Buffer.from(xlsxBuffer);
    await writeFileAsync(`${filename}.xlsx`, dataBuffer);

    const payloadReport: PayloadReportType = {
      name: filename,
      filename: `${filename}.xlsx`,
      size: xlsxBuffer.byteLength,
      month: new Date().getMonth() + 1,
      userId: payload.userId,
    };

    await reportService.addReport(payloadReport);

    return new Response(dataBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return Response.json(
        {
          status: "fail",
          message: error.message,
        },
        { status: error.statusCode }
      );
    }
    return Response.json(
      {
        status: "fail",
        message: "Terjadi kesalahan, laporan gagal digenerate",
      },
      { status: 500 }
    );
  }
}
