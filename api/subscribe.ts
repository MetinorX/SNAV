import type { VercelRequest, VercelResponse } from "@vercel/node";
import { addSubscriber } from "./_lib/store.js";
import { sendMail } from "./_lib/mailer.js";
import { welcomeEmailHtml } from "./_lib/templates.js";
import { asString, isEmail } from "./_lib/validate.js";

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
    const added = await addSubscriber(email);
    if (!added) {
      return res.status(200).json({ ok: true, alreadySubscribed: true });
    }
  } catch {
    return res.status(503).json({ error: "Subscriber store unavailable right now" });
  }

  try {
    await sendMail({
      to: email,
      subject: "Welcome to the SNAV Family!",
      html: welcomeEmailHtml(email),
    });
  } catch {
    return res.status(200).json({ ok: true, note: "Subscribed; welcome email will follow" });
  }

  return res.status(201).json({ ok: true });
}