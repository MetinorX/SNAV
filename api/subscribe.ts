import type { VercelRequest, VercelResponse } from "@vercel/node";
import { addSubscriber } from "./_lib/store";
import { sendMail } from "./_lib/mailer";
import { welcomeEmailHtml } from "./_lib/templates";
import { asString, isEmail } from "./_lib/validate";

export const config = { maxDuration: 30 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = asString(req.body?.email).toLowerCase();
  if (!isEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required" });
  }

  try {
    await addSubscriber(email);
  } catch {
    return res.status(503).json({ error: "Subscriber store unavailable right now" });
  }

  try {
    await sendMail({
      to: email,
      subject: "Welcome to SNAV Tourism!",
      html: welcomeEmailHtml(email),
    });
  } catch {
    return res.status(200).json({ ok: true, note: "Subscribed; welcome email will follow" });
  }

  return res.status(201).json({ ok: true });
}