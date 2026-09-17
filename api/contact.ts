import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendMail } from "./_lib/mailer";
import { asString, isEmail, isNonEmpty } from "./_lib/validate";
import { escapeHtml } from "./_lib/templates";

export const config = { maxDuration: 30 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const subject = asString(body.subject || "New Inquiry from snavtourism.com");
  const message = asString(body.message);
  const source = asString(body.source || "Contact form");

  if (!isNonEmpty(name) || !isNonEmpty(message)) {
    return res.status(400).json({ error: "Name and message are required" });
  }
  if (email && !isEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  const html = `
    <h2 style="margin:0 0 16px;font-size:20px;color:#14233b;">New Inquiry — ${escapeHtml(source)}</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.8;color:#3a4757;" width="100%">
      <tr><td style="padding:4px 0;color:#5b6b7e;width:110px;"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 0;color:#5b6b7e;"><strong>Email</strong></td><td>${escapeHtml(email || "—")}</td></tr>
      <tr><td style="padding:4px 0;color:#5b6b7e;"><strong>Phone</strong></td><td>${escapeHtml(phone || "—")}</td></tr>
      <tr><td style="padding:4px 0;color:#5b6b7e;"><strong>Subject</strong></td><td>${escapeHtml(subject)}</td></tr>
    </table>
    <p style="margin:20px 0 8px;font-size:14px;color:#5b6b7e;"><strong>Message:</strong></p>
    <p style="margin:0;font-size:14px;line-height:1.7;color:#3a4757;white-space:pre-wrap;">${escapeHtml(message)}</p>`;

  try {
    const to = process.env.CONTACT_TO || "snavtourism@gmail.com";
    await sendMail({ to, subject: `[SNAV] ${subject}`, html });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(503).json({ error: "Unable to send inquiry email right now" });
  }
}