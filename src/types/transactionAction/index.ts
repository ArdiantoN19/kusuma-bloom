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

export interface ITransactionService {
  addTransaction(data: PayloadAddTransaction): Promise<void>;
  updateTransactionById(id: string, data: any): Promise<void>;
  checkAvailableVoucherInTransactionByUserId(
    userId: string,
    voucherId: string
  ): Promise<void>;
  checkValidSnapToken(token: string): Promise<void>;
}
