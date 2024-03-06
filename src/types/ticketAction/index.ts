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
  data?: any;
};

export type ResponseTicket = {
  id: string;
  created_at: Date;
  updated_at: Date;
  user: {
    name: string | null;
    image: string | null;
  };
} & PayloadAddedTicket;

export interface ITicketService {
  addTicket(data: PayloadAddedTicket): Promise<void>;
  checkAvailableTicketByDate(
    data: PayloadCheckAvailableTicketByDate
  ): Promise<void>;
  getTickets(): Promise<ResponseTicket[]>;
  getTicketById(id: string): Promise<ResponseTicket>;
  deleteTicketById(id: string): Promise<void>;
}
