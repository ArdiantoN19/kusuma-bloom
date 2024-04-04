export type PayloadSendMailType = {
  to: string;
  subject: string;
  html: string;
};

export interface IResendEmailService {
  sendMail(data: PayloadSendMailType): Promise<void>;
}
