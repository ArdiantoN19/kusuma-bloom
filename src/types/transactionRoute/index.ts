import { ResponseMemberUser } from "@/types/memberUserAction";
import { PayloadAddTransaction } from "@/types/transactionAction";
import { ResponseVoucher } from "@/types/voucherAction";

export type BodyPayloadType = {
  ticketId: string;
  ticketName: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  memberUser: ResponseMemberUser | null;
  voucher: ResponseVoucher | undefined;
  total: number;
  discountMember: number;
  discountVoucher: number;
  date: Date;
  quantity: string;
  price: string;
};

export function grossAmount(bodyPayload: BodyPayloadType) {
  let gross_amount: number = 0;

  if (bodyPayload.discountMember > 0 && bodyPayload.discountVoucher > 0) {
    gross_amount =
      bodyPayload.total -
      bodyPayload.discountMember -
      bodyPayload.discountVoucher;
  } else if (bodyPayload.discountMember > 0) {
    gross_amount = bodyPayload.total - bodyPayload.discountMember;
  } else if (bodyPayload.discountVoucher > 0) {
    gross_amount = bodyPayload.total - bodyPayload.discountVoucher;
  } else {
    gross_amount = bodyPayload.total;
  }

  return gross_amount;
}

type FCreatePayloadAddTransaction = {
  order_id: string;
  gross_amount: number;
  token: string;
  bodyPayload: BodyPayloadType;
};

export function createPayloadAddTransaction({
  order_id,
  gross_amount,
  token,
  bodyPayload,
}: FCreatePayloadAddTransaction): PayloadAddTransaction {
  let payload = {
    id: order_id,
    price: Number(bodyPayload.price),
    quantity: Number(bodyPayload.quantity),
    gross_amount,
    expired: bodyPayload.date,
    snap_token: token,
    userId: bodyPayload.user.id,
    ticketId: bodyPayload.ticketId,
  };

  if (bodyPayload.memberUser && bodyPayload.voucher) {
    return {
      memberUserId: bodyPayload.memberUser.id,
      voucherId: bodyPayload.voucher.id,
      ...payload,
    };
  }

  if (bodyPayload.memberUser) {
    return {
      memberUserId: bodyPayload.memberUser.id,
      ...payload,
    };
  }

  if (bodyPayload.voucher) {
    return {
      voucherId: bodyPayload.voucher.id,
      ...payload,
    };
  }

  return payload;
}
