import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getLastDigestWeek, getISOWeek, getSubscribers, setLastDigestWeek } from "../_lib/store";
import { sendMail } from "../_lib/mailer";
import { fallbackNewsletter, generateNewsletter } from "../_lib/ai";
import { weeklyNewsletterHtml } from "../_lib/templates";

export const config = { maxDuration: 300 };

const isAuthorized = (req: VercelRequest): boolean => {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.authorization === `Bearer ${secret}`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const week = getISOWeek(new Date());
    const lastSentWeek = await getLastDigestWeek();
    if (lastSentWeek === week) {
      return res.status(200).json({ ok: true, skipped: true, reason: "already-sent-this-week" });
    }

    const subscribers = await getSubscribers();
    if (subscribers.length === 0) {
      await setLastDigestWeek(week);
      return res.status(200).json({ ok: true, skipped: true, reason: "no-subscribers" });
    }

    let content = fallbackNewsletter();
    let usedFallback = true;
    try {
      content = await generateNewsletter();
      usedFallback = false;
    } catch {
      content = fallbackNewsletter();
    }

    const subject = `${content.subject} | SNAV Tourism`;
    const html = weeklyNewsletterHtml(content);

    const failed: string[] = [];
    let sent = 0;
    for (const email of subscribers) {
      try {
        await sendMail({ to: email, subject, html });
        sent += 1;
      } catch {
        failed.push(email);
      }
    }

    await setLastDigestWeek(week);

    return res.status(200).json({ ok: true, week, sent, failedCount: failed.length, usedFallback });
  } catch {
    return res.status(500).json({ error: "Weekly digest failed" });
  }
}