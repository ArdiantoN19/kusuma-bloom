export type PayloadBodyVoucher = {
  name: string;
  total: number;
  discount: number;
  status?: boolean;
  userId: string;
};

export type ResponseVoucherAction = {
  status: string;
  message: string;
  data?: any;
};

export type ResponseVoucher = {
  id: string;
  created_at: Date;
  updated_at: Date;
  user: {
    name: string;
    image: string;
  };
} & PayloadBodyVoucher;

export interface IVoucherService {
  checkAvailableVoucher(name: string): Promise<void>;
  addVoucher(data: PayloadBodyVoucher): Promise<void>;
  getVouchers(): Promise<ResponseVoucher[]>;
  getVoucherById(id: string): Promise<ResponseVoucher>;
  updateVoucherById(id: string, data: PayloadBodyVoucher): Promise<void>;
  deleteVoucherById(id: string): Promise<void>;
}
