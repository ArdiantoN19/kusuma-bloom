import nodemailer from "nodemailer";
import { IEmailService, PayloadSendMailType } from "@/types/nodemailer";

class EmailService implements IEmailService {
  constructor(private readonly nodemailer: any) {}

  createTransporter(): any {
    return this.nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendMail(payload: PayloadSendMailType): void {
    const mailOptions = {
      from: process.env.SMTP_USERNAME,
      ...payload,
    };
    const transporter = this.nodemailer.createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

export const nodemailerEmailService = new EmailService(nodemailer);
