export type PayloadAddedTicket = {
  name: string;
  quantity: number;
  price: number;
  status: boolean;
  fromDate: Date;
  toDate: Date;
  userId: string;
};

export type PayloadCheckAvailableTicketByDate = {
  fromDate: Date;
  toDate: Date;
};

export type ResponseTicketAction = {
  status: string;
  message: string;
  data?: Record<string, any>[] | Record<string, any> | null;
};

export type ResponseTicket = {
  id: string;
  created_at: Date;
  updated_at: Date;
} & PayloadAddedTicket;

export interface ITicketService {
  addTicket(data: PayloadAddedTicket): Promise<void>;
  checkAvailableTicketByDate(
    data: PayloadCheckAvailableTicketByDate
  ): Promise<void>;
  getTickets(): Promise<ResponseTicket[]>;
}
