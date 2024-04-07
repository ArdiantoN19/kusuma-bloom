export type PayloadScanTicket = {
  transactionId: string;
  status: boolean;
  acceptedBy: string | null;
  scannedAt: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type ResponseScanTicket = PayloadScanTicket & {
  transaction: {
    expired: Date;
  };
};

export interface IScanTicketService {
  addScanTicket(transactionId: string): Promise<void>;
  getScanTicketByTransactionId(
    transactionId: string
  ): Promise<ResponseScanTicket>;
  updateScanTicketByTransactionId(
    transactionId: string,
    data: Partial<ResponseScanTicket>
  ): Promise<void>;
}
