export type PayloadSendMailType = {
  to: string;
  subject: string;
  html: string;
};

export interface IEmailService {
  createTransporter(): any;
  sendMail(payload: PayloadSendMailType): void;
}
