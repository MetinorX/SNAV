import fs from "node:fs";
import path from "node:path";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getLastDigestWeek, getISOWeek, getSubscribers, setLastDigestWeek } from "../_lib/store.js";
import { sendMail } from "../_lib/mailer.js";
import { fallbackNewsletter, generateNewsletter } from "../_lib/ai.js";
import { weeklyNewsletterHtml, heroFor, HERO_CID } from "../_lib/templates.js";

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

    let heroData: Buffer | null = null;
    let heroFile = "";
    try {
      heroFile = heroFor(content.destinations[0]?.name);
      heroData = fs.readFileSync(path.join(process.cwd(), "src", "assets", heroFile));
    } catch {
      heroData = null;
    }

    const html = weeklyNewsletterHtml(
      content,
      heroData
        ? { heroCid: HERO_CID, heroAlt: content.destinations[0]?.name ?? "Destinations to explore" }
        : undefined
    );
    const attachments = heroData
      ? [{ filename: heroFile, content: heroData, cid: HERO_CID }]
      : undefined;

    const failed: string[] = [];
    let sent = 0;
    for (const email of subscribers) {
      try {
        await sendMail({ to: email, subject, html, ...(attachments ? { attachments } : {}) });
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