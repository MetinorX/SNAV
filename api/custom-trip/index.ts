import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendMail } from "../_lib/mailer.js";
import { customTripAdminHtml } from "../_lib/templates.js";
import { storeCustomTrip } from "../_lib/store.js";
import {
  tripChat,
  buildTripItinerary,
  fallbackTripChat,
  fallbackTripItinerary,
  extractProfileFromTranscript,
  type TripProfile,
  type TripItinerary,
  type ChatMessage,
} from "../_lib/ai.js";
import { asString, isEmail, isNonEmpty } from "../_lib/validate.js";

export const config = { maxDuration: 60 };

const ADMIN_TO = process.env.CONTACT_TO || "snavtourism@gmail.com";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 15;
const requestLog = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(ip, [...recent, now]);
    return true;
  }
  requestLog.set(ip, [...recent, now]);
  return false;
};

const clientIp = (req: VercelRequest): string =>
  (Array.isArray(req.headers["x-forwarded-for"])
    ? req.headers["x-forwarded-for"][0]
    : typeof req.headers["x-forwarded-for"] === "string"
      ? req.headers["x-forwarded-for"].split(",")[0]
      : undefined) ||
  req.socket.remoteAddress ||
  "unknown";

const asStr = (value: unknown, max = 200): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const asNum = (value: unknown, max = 1000): number | undefined => {
  const num = typeof value === "number" ? value : Number(String(value ?? "").replace(/[^\d]/g, ""));
  return Number.isFinite(num) && num > 0 && num <= max ? num : undefined;
};

const asStrArray = (value: unknown, max = 8): string[] =>
  (Array.isArray(value) ? value : []).slice(0, max).map((item) => asStr(item, 80)).filter(Boolean);

const safeProfile = (data: unknown): Partial<TripProfile> => {
  const record = (data ?? {}) as Record<string, unknown>;
  return {
    destination: asStr(record.destination, 120),
    month: asStr(record.month, 40),
    durationDays: asNum(record.durationDays, 30),
    travelers: asNum(record.travelers, 60),
    travelerNote: asStr(record.travelerNote, 120),
    budgetPerPerson: asNum(record.budgetPerPerson, 10000000),
    interests: asStrArray(record.interests),
    occasion: asStr(record.occasion, 80),
    pace: asStr(record.pace, 40),
    style: asStr(record.style, 40),
    needs: asStrArray(record.needs),
  };
};

const safeTranscript = (value: unknown, maxMessages = 40): ChatMessage[] => {
  if (!Array.isArray(value)) return [];
  return value
    .slice(-maxMessages)
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const record = item as Record<string, unknown>;
      const role = record.role === "assistant" || record.role === "user" ? record.role : null;
      const content = typeof record.content === "string" ? record.content.slice(0, 1000) : "";
      return role && content.trim() ? { role, content: content.trim() } : null;
    })
    .filter((item): item is ChatMessage => Boolean(item));
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const action = asString(body.action).toLowerCase();

  if (action === "chat" || action === "preview") {
    if (isRateLimited(clientIp(req))) {
      return res.status(429).json({ error: "Too many requests — please slow down a little." });
    }
  }

  if (action === "chat") {
    const messages = safeTranscript(body.messages);
    if (messages.length === 0) {
      return res.status(400).json({ error: "At least one message is required" });
    }
    try {
      const turn = await tripChat(messages);
      return res.status(200).json({ ok: true, ...turn, usedFallback: false });
    } catch {
      const hint = extractProfileFromTranscript(messages);
      const turn = fallbackTripChat(messages, hint);
      return res.status(200).json({ ok: true, ...turn, usedFallback: true });
    }
  }

  if (action === "preview") {
    const profile = safeProfile(body.profile);
    const refineHint = asStr(body.refineHint, 500);
    const itinerary: TripItinerary = await buildTripItinerary(profile, refineHint || undefined);
    return res.status(200).json({ ok: true, itinerary });
  }

  if (action === "submit") {
    const name = asStr(body.name, 120);
    const email = asStr(body.email, 160);
    const phone = asStr(body.phone, 14);
    const profile = safeProfile(body.profile);
    const rawItinerary = body.itinerary as TripItinerary | null | undefined;
    const itinerary =
      rawItinerary && typeof rawItinerary === "object" && Array.isArray(rawItinerary.days)
        ? (rawItinerary as TripItinerary)
        : (fallbackTripItinerary(profile, undefined) ?? null);
    const transcript = safeTranscript(body.transcript);

    if (name.length < 2 || !isEmail(email)) {
      return res.status(400).json({ error: "A name and a valid email address are required" });
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ error: "A valid 10-digit WhatsApp number is required" });
    }

    const payload = { profile, itinerary, transcript, sentAt: new Date().toISOString() };

    let storedId = "";
    try {
      storedId = await storeCustomTrip({ name, email, phone, status: "new", payload });
    } catch {
      storedId = "";
    }

    let emailSent = false;
    try {
      const subject = `[SNAV] Custom Trip Request${profile.destination ? ` — ${profile.destination}` : ""}${name ? ` — ${name}` : ""}`.replace(/\s+/g, " ").slice(0, 140);
      await sendMail({
        to: ADMIN_TO,
        subject,
        html: customTripAdminHtml({ profile, itinerary, name, email, phone }),
      });
      emailSent = true;
    } catch {
      emailSent = false;
    }

    if (!storedId && !emailSent) {
      return res.status(503).json({ error: "We couldn't reach our team right now. Please try again or WhatsApp us directly." });
    }

    return res.status(200).json({ ok: true, id: storedId, emailSent });
  }

  return res.status(400).json({ error: "Unknown action" });
}