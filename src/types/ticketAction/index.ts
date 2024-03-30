export type PayloadBodyTicket = {
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
} & PayloadBodyTicket;

export interface ITicketService {
  addTicket(data: PayloadBodyTicket): Promise<void>;
  checkAvailableTicketByDate(
    data: PayloadCheckAvailableTicketByDate
  ): Promise<void>;
  getTickets(): Promise<ResponseTicket[]>;
  getTicketById(id: string): Promise<ResponseTicket>;
  updateTicketById(id: string, data: PayloadBodyTicket): Promise<void>;
  deleteTicketById(id: string): Promise<void>;
  activateTicketById(id: string): Promise<void>;
  nonActiveTicketById(id: string): Promise<void>;
  getTotalTicketRecords(): Promise<number>;
  getActiveTicket(): Promise<ResponseTicket | null>;
  updateTicketQuantityById(id: string, quantity: number): Promise<void>;
}
