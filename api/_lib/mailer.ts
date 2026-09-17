import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

export interface MailOptions {
  to: string;
  subject: string;
  html: string;
}

let transport: Transporter | null = null;

const getTransport = (): Transporter => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !pass || !from) {
    throw new Error("SMTP env vars are not configured");
  }

  if (!transport) {
    transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }
  return transport;
};

export const sendMail = async (options: MailOptions): Promise<void> => {
  const from = process.env.SMTP_FROM;
  if (!from) {
    throw new Error("SMTP_FROM is not configured");
  }
  const currentTransport = getTransport();
  await currentTransport.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
};