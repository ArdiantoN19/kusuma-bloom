import { getAuthServerSession } from "@/lib/auth";
import {
  ResponseTypeMidtrans,
  snapErrorStatus,
  snapPendingStatus,
  snapSuccessStatus,
} from "@/lib/midtrans";
import crypto from "crypto";

export async function POST(req: Request) {
  const session = await getAuthServerSession();

  const payload: ResponseTypeMidtrans | any = await req.json();
  const orderId = payload.order_id;
  const statusCode = payload.status_code;
  const grossAmount = payload.gross_amount;
  const transactionStatus = payload.transaction_status;

  const signatureKey = crypto
    .createHash("sha512")
    .update(
      `${orderId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}aa`
    )
    .digest("hex");
  const isValidSignatureKey = payload.signature_key === signatureKey;

  if (isValidSignatureKey) {
    if (transactionStatus === "capture" || transactionStatus === "settlement") {
      await snapSuccessStatus(payload, session?.user);
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      await snapErrorStatus(payload);
    } else if (transactionStatus === "pending") {
      await snapPendingStatus(payload);
    }
  } else {
    console.error("Invalid signature key");
  }

  return Response.json({
    status: "success",
    message: "success",
  });
}
