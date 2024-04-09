export enum TRANSACTION_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}

export type PayloadAddTransaction = {
  id: string;
  quantity: number;
  price: number;
  gross_amount: number;
  snap_token: string;
  expired: Date;
  userId: string;
  ticketId: string;
  memberUserId?: string;
  voucherId?: string;
};

export type ResponseTransaction = {
  id: string;
  quantity: number;
  price: number;
  gross_amount: number;
  snap_token: string;
  payment_type: string | null;
  status: TRANSACTION_STATUS;
  expired: Date;
  userId: string;
  ticketId: string;
  memberUserId: string | null;
  voucherId: string | null;
  memberUser: {
    discount: number;
  } | null;
  voucher: {
    discount: number;
  } | null;
  user: {
    name: string;
    email: string;
    image?: string;
  };
  scanTickets: {
    status: boolean;
  } | null;
  created_at: Date;
  updated_at: Date;
};

export enum ORDERBY {
  desc = "desc",
  asc = "asc",
}

export type ResponseTransactionWithDiscount = ResponseTransaction & {
  discountMember?: number;
  discountVoucher?: number;
};

export interface ITransactionService {
  addTransaction(data: PayloadAddTransaction): Promise<void>;
  updateTransactionById(id: string, data: Record<string, any>): Promise<void>;
  checkAvailableVoucherInTransactionByUserId(
    userId: string,
    voucherId: string
  ): Promise<void>;
  checkValidSnapToken(token: string): Promise<void>;
  getTransactionById(id: string): Promise<ResponseTransaction>;
  getVoucherIdInTransactionByUserId(userId: string): Promise<string[]>;
  getLatestTransaction(): Promise<ResponseTransaction>;
  getCountTransactionByStatus(
    userId: string,
    status: TRANSACTION_STATUS
  ): Promise<number>;
  getTransactions({
    userId,
    orderBy,
    limit,
  }: {
    userId?: string;
    orderBy?: ORDERBY;
    limit?: number;
  }): Promise<ResponseTransaction[]>;
  getAllCountTransactions(): Promise<number>;
  getAllCountTransactionsInOneMonth(): Promise<number>;
}
