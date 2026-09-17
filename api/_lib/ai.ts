export interface NewsletterDestination {
  name: string;
  description: string;
}

export interface NewsletterData {
  subject: string;
  intro: string;
  destinations: NewsletterDestination[];
  tips: string[];
  quote: string;
}

const NIM_BASE_URL = process.env.NVIDIA_NIM_URL || "https://integrate.api.nvidia.com/v1";
const NIM_MODEL = process.env.NVIDIA_NIM_MODEL || "mistralai/mistral-nemotron";
const NIM_FALLBACK_MODEL = process.env.NVIDIA_FALLBACK_MODEL || "deepseek-ai/deepseek-v4-flash-0731";
const PRIMARY_ATTEMPTS = 2;
const PRIMARY_TIMEOUT_MS = 45000;
const FALLBACK_TIMEOUT_MS = 110000;

const buildPrompt = (isoWeek: string): string => {
  return `You are the senior newsletter writer for SNAV Tourism, a premium Indian travel agency (Kashmir, Rajasthan, Kerala, Golden Temple, Goa, Ladakh, Uttarakhand, Tamil Nadu and more) that sends a weekly travel digest.

Write this week's newsletter (week ${isoWeek}). Respond with ONLY valid JSON and nothing else - no markdown, no code fences. Exact schema:
{"subject":"email subject line, max 60 characters","intro":"one welcoming paragraph, 2-3 sentences","destinations":[{"name":"Indian destination","description":"one compelling sentence"}],"tips":["one practical travel tip"],"quote":"a short inspiring travel quote attributed to its author"}

Requirements:
- destinations: 3 Indian destinations, each with a fresh angle for the season
- tips: 2-4 concise, practical tips (packing, booking, seasonal, cultural)
- quote: short, real, attributed`;
};

const stripCodeFences = (content: string): string => {
  const trimmed = content.trim();
  if (trimmed.startsWith("```")) {
    return trimmed.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "").trim();
  }
  return trimmed;
};

const normalizeNewsletter = (data: unknown): NewsletterData => {
  const record = (data ?? {}) as Record<string, unknown>;
  const destinations = Array.isArray(record.destinations)
    ? (record.destinations as NewsletterDestination[]).slice(0, 6).map((d) => ({
        name: String(d?.name || "Destination"),
        description: String(d?.description || ""),
      }))
    : [];
  const tips = Array.isArray(record.tips) ? (record.tips as unknown[]).slice(0, 4).map((t) => String(t)) : [];
  return {
    subject: String(record.subject || "This Week With SNAV Tourism").trim().slice(0, 90),
    intro: String(record.intro || "").trim(),
    destinations,
    tips,
    quote: String(record.quote || "").trim(),
  };
};

const complete = async (model: string, timeoutMs: number, apiKey: string, isoWeek: string): Promise<string> => {
  const response = await fetch(`${NIM_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: buildPrompt(isoWeek) }],
      temperature: 0.7,
      max_tokens: 1500,
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`NIM API error (${model}): ${response.status}`);
  }

  const payload = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error(`NIM API returned an empty response (${model})`);
  }
  return content;
};

const parseNewsletter = (content: string): NewsletterData => {
  const parsed = JSON.parse(stripCodeFences(content)) as unknown;
  return normalizeNewsletter(parsed);
};

export const generateNewsletter = async (): Promise<NewsletterData> => {
  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA_NIM_API_KEY is not configured");
  }

  const isoWeek = new Date().toISOString().slice(0, 10);

  let lastError: unknown;
  for (let attempt = 1; attempt <= PRIMARY_ATTEMPTS; attempt += 1) {
    try {
      return parseNewsletter(await complete(NIM_MODEL, PRIMARY_TIMEOUT_MS, apiKey, isoWeek));
    } catch (error) {
      lastError = error;
      if (attempt < PRIMARY_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }
  }

  try {
    return parseNewsletter(await complete(NIM_FALLBACK_MODEL, FALLBACK_TIMEOUT_MS, apiKey, isoWeek));
  } catch (error) {
    throw lastError instanceof Error ? lastError : error;
  }
};

export const fallbackNewsletter = (): NewsletterData => ({
  subject: "This Week With SNAV Tourism",
  intro:
    "Welcome to your weekly dose of wanderlust from SNAV Tourism. This week we shine a light on three destinations that deserve a spot on your travel map.",
  destinations: [
    { name: "Kashmir", description: "Eighty valleys of timeless beauty — shikara rides, saffron fields, and snow-dusted peaks." },
    { name: "Rajasthan", description: "Palaces, forts, and desert dunes — a royal circuit that never stops surprising." },
    { name: "Kerala", description: "Slow mornings on backwaters and misty tea hills in God's Own Country." },
  ],
  tips: [
    "Book shoulder-season dates for the best fares and crowds.",
    "Keep a scarf handy — it doubles for sun, temples, and cool evenings.",
    "Taste the local street food; it is the fastest way into any city.",
  ],
  quote: "“The world is a book, and those who do not travel read only one page.” — Saint Augustine",
});