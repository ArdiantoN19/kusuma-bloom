import { ResponseTransaction } from "../transactionAction";

export type payloadPost = {
  from: Date;
  to: Date;
  userId: string;
};

export const transformDataTransaction = (
  transactions: ResponseTransaction[]
) => {
  return transactions.map((transaction: ResponseTransaction) => {
    const total = transaction.quantity * transaction.price;
    return {
      id: transaction.id,
      quantity: transaction.quantity,
      price: transaction.price,
      gross_amount: transaction.gross_amount,
      snap_token: transaction.snap_token,
      payment_type: transaction.payment_type || "-",
      status: transaction.status,
      expired: new Date(transaction.expired),
      userId: transaction.userId,
      ticketId: transaction.ticketId,
      memberUserId: transaction.memberUserId || "-",
      voucherId: transaction.voucherId || "-",
      discountMember: transaction.memberUser
        ? total * transaction.memberUser.discount
        : 0,
      voucher: transaction.voucher ? total * transaction.voucher.discount : 0,
      user: transaction.user.name,
      email: transaction.user.email,
      scan_ticket:
        transaction.scanTickets && transaction.scanTickets.status
          ? "Yes"
          : "No",
      created_at: new Date(transaction.created_at),
    };
  });
};
