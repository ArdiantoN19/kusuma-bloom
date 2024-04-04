import { IResendEmailService, PayloadSendMailType } from "@/types/resend";
import { Resend } from "resend";

class ResendEmailService implements IResendEmailService {
  constructor(private readonly Resend: any) {}

  async sendMail(payload: PayloadSendMailType): Promise<void> {
    const { data, error } = this.Resend.emails.send({
      from: process.env.BASE_EMAIL_APP as string,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });
    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  }
}

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const resendEmailService = new ResendEmailService(resend);
