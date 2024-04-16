import { ticketService } from "@/lib/actions/ticketAction/TicketService";
import { transactionService } from "@/lib/actions/transactionAction/TransactionService";
import { voucherService } from "@/lib/actions/voucherAction/VoucherService";
import {
  BodyPayloadType,
  createPayloadAddTransaction,
  grossAmount,
} from "@/types/transactionRoute";

export async function POST(req: Request) {
  const bodyPayload: BodyPayloadType = await req.json();
  const order_id = `trx-${+new Date()}`;
  const gross_amount = grossAmount(bodyPayload);

  const payload = {
    transaction_details: {
      order_id,
      gross_amount,
    },
    credit_card: { secure: true },
    customer_details: {
      first_name: bodyPayload.user.name,
      email: bodyPayload.user.email,
    },
  };

  const url = `${process.env.NEXT_PUBLIC_BASE_URL_MIDTRANS_API}/snap/v1/transactions`;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `BASIC ${process.env.MIDTRANS_AUTH_STRING}`,
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, options);
  const responseJson = await response.json();

  if (!response.ok) {
    return Response.json(
      {
        status: "fail",
        message: responseJson.error_messages,
      },
      { status: response.status, statusText: response.statusText }
    );
  }

  if (bodyPayload.voucher) {
    const total = bodyPayload.voucher.total - 1;
    if (total === 0) {
      await voucherService.updateVoucherById(bodyPayload.voucher.id, {
        status: false,
      });
    }
    await voucherService.updateTotalVoucherById(bodyPayload.voucher.id, total);
  }

  const quantityTicket = (
    await ticketService.getTicketById(bodyPayload.ticketId)
  ).quantity;
  const remainingTicket = quantityTicket - Number(bodyPayload.quantity);
  await ticketService.updateTicketQuantityById(
    bodyPayload.ticketId,
    remainingTicket
  );

  const payloadTransaction = createPayloadAddTransaction({
    token: responseJson.token,
    gross_amount,
    order_id,
    bodyPayload,
  });
  await transactionService.addTransaction(payloadTransaction);

  return Response.json(
    {
      status: "success",
      message: "Transaksi berhasil dibuat",
      data: responseJson,
    },
    { status: 201 }
  );
}
