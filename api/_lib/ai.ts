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

export interface TripProfile {
  destination: string;
  month: string;
  durationDays?: number;
  travelers?: number;
  travelerNote: string;
  budgetPerPerson?: number;
  interests: string[];
  occasion: string;
  pace: string;
  style: string;
  needs: string[];
}

export interface TripDay {
  day: number;
  title: string;
  highlights: string[];
  stay?: string;
}

export interface TripItinerary {
  title: string;
  vibe: string;
  overview: string;
  seasonNote: string;
  days: TripDay[];
  budgetEstimate: string;
  notes: string[];
}

export interface TripChatTurn {
  reply: string;
  profile: Partial<TripProfile>;
  readyForItinerary: boolean;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const NIM_BASE_URL = process.env.NVIDIA_NIM_URL || "https://integrate.api.nvidia.com/v1";
const NIM_MODEL = process.env.NVIDIA_NIM_MODEL || "mistralai/mistral-nemotron";
const NIM_FALLBACK_MODEL = process.env.NVIDIA_FALLBACK_MODEL || "deepseek-ai/deepseek-v4-flash-0731";
const PRIMARY_ATTEMPTS = 2;
const PRIMARY_TIMEOUT_MS = 45000;
const FALLBACK_TIMEOUT_MS = 110000;

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

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

const chatComplete = async (
  model: string,
  timeoutMs: number,
  apiKey: string,
  messages: ChatMessage[],
  opts?: { temperature?: number; maxTokens?: number }
): Promise<string> => {
  const response = await fetch(`${NIM_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: opts?.temperature ?? 0.7,
      max_tokens: opts?.maxTokens ?? 1500,
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
      return parseNewsletter(await chatComplete(NIM_MODEL, PRIMARY_TIMEOUT_MS, apiKey, [{ role: "user", content: buildPrompt(isoWeek) }]));
    } catch (error) {
      lastError = error;
      if (attempt < PRIMARY_ATTEMPTS) {
        await sleep(1500);
      }
    }
  }

  try {
    return parseNewsletter(await chatComplete(NIM_FALLBACK_MODEL, FALLBACK_TIMEOUT_MS, apiKey, [{ role: "user", content: buildPrompt(isoWeek) }]));
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

const asNum = (value: unknown): number | undefined => {
  const num = typeof value === "number" ? value : Number(String(value ?? "").replace(/[^\d]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : undefined;
};

const asStr = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value.trim().slice(0, 120) : String(value ?? fallback).trim().slice(0, 120);

const asStrArray = (value: unknown, max = 8): string[] =>
  (Array.isArray(value) ? value : []).slice(0, max).map((item) => asStr(item)).filter(Boolean);

const normalizeTripProfile = (data: unknown): Partial<TripProfile> => {
  const record = (data ?? {}) as Record<string, unknown>;
  return {
    destination: asStr(record.destination),
    month: asStr(record.month),
    durationDays: asNum(record.durationDays),
    travelers: asNum(record.travelers ?? record.travelerCount),
    travelerNote: asStr(record.travelerNote || record.travelersNote),
    budgetPerPerson: asNum(record.budgetPerPerson),
    interests: asStrArray(record.interests),
    occasion: asStr(record.occasion),
    pace: asStr(record.pace),
    style: asStr(record.style),
    needs: asStrArray(record.needs),
  };
};

const mergeProfile = (base: Partial<TripProfile>, extra: Partial<TripProfile>): Partial<TripProfile> => ({
  destination: extra.destination || base.destination || "",
  month: extra.month || base.month || "",
  durationDays: extra.durationDays ?? base.durationDays,
  travelers: extra.travelers ?? base.travelers,
  travelerNote: extra.travelerNote || base.travelerNote || "",
  budgetPerPerson: extra.budgetPerPerson ?? base.budgetPerPerson,
  interests: extra.interests.length ? extra.interests : base.interests,
  occasion: extra.occasion || base.occasion || "",
  pace: extra.pace || base.pace || "",
  style: extra.style || base.style || "",
  needs: extra.needs.length ? extra.needs : base.needs,
});

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

const INTEREST_KEYWORDS: Record<string, boolean> = {
  adventure: true, trekking: true, hiking: true, rafting: true, mountaineering: true,
  heritage: true, forts: true, history: true, palaces: true, culture: true,
  beaches: true, backwaters: true, beach: true,
  spiritual: true, temples: true, yoga: true, meditation: true, pilgrimage: true,
  wildlife: true, safari: true, birds: true,
  luxury: true, honeymoon: true, food: true, cuisine: true, shopping: true,
  photography: true, snow: true, houseboat: true, camping: true, desert: true,
};

export const extractProfileFromTranscript = (messages: ChatMessage[]): Partial<TripProfile> => {
  const text = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  const profile: Partial<TripProfile> = {
    destination: "",
    month: "",
    travelerNote: "",
    interests: [],
    occasion: "",
    pace: "",
    style: "",
    needs: [],
  };

  const destinationKeywords = [
    "kashmir", "rajasthan", "kerala", "goa", "himachal", "manali", "ladakh",
    "uttarakhand", "rishikesh", "amritsar", "golden temple", "tamil nadu",
    "south india", "ooty", "munnar", "sikkim", "darjeeling", "andaman",
  ];
  const hit = destinationKeywords.find((k) => text.includes(k));
  if (hit) {
    profile.destination = hit
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const month = MONTHS.find((m) => text.includes(m));
  if (month) {
    profile.month = month.charAt(0).toUpperCase() + month.slice(1);
  }

  const durationMatch = /(\d+)\s*(?:day|night)s?\b/.exec(text);
  if (durationMatch) {
    profile.durationDays = Number(durationMatch[1]);
  }

  const travelersMatch = /(\d+)\s*(?:travelers|travellers|people|adults|pax|persons)/.exec(text);
  if (travelersMatch) {
    profile.travelers = Number(travelersMatch[1]);
  } else if (/couple\b|honeymoon/i.test(text)) {
    profile.travelers = 2;
    profile.occasion = profile.occasion || "Honeymoon";
  } else if (/family\b/i.test(text)) {
    profile.travelerNote = profile.travelerNote || "Family";
  }

  const budgetMatch = /(?:rs\.?\s?|inr\s?|₹)([\d,.]+)/i.exec(text);
  if (budgetMatch) {
    profile.budgetPerPerson = Number(budgetMatch[1].replace(/[^\d]/g, ""));
  }

  const occasionMatch = /(honeymoon|anniversary|birthday|family reunion|babymoon|proposal)/.exec(text);
  if (occasionMatch) {
    profile.occasion = occasionMatch[1].charAt(0).toUpperCase() + occasionMatch[1].slice(1);
  }

  if (/slow|relaxed|leisurely|peaceful/.test(text)) {
    profile.pace = "Relaxed";
  } else if (/packed|hectic|jam.?packed|action/.test(text)) {
    profile.pace = "Packed";
  } else if (/moderate|balanced/.test(text)) {
    profile.pace = "Balanced";
  }

  if (/luxury|five-star|5-star|premium|heritage hotel|boutique/.test(text)) {
    profile.style = "Luxury";
  }

  profile.interests = Object.keys(INTEREST_KEYWORDS).filter((kw) => text.includes(kw));

  const dietMatch = /(vegetarian|vegan|jain|no.?beef|halal|gluten|wheelchair|accessible|senior|elderly)/.exec(text);
  if (dietMatch) {
    profile.needs = [dietMatch[1].charAt(0).toUpperCase() + dietMatch[1].slice(1)];
  }

  return profile;
};

const tripProfileMessage = (profile: Partial<TripProfile>, refineHint?: string): string => {
  const parts: string[] = [];
  if (profile.destination) parts.push(`destinations: ${profile.destination}`);
  if (profile.month) parts.push(`month/season: ${profile.month}`);
  if (profile.durationDays) parts.push(`duration: ${profile.durationDays} days`);
  if (profile.travelers) parts.push(`travelers: ${profile.travelers}${profile.travelerNote ? ` (${profile.travelerNote})` : ""}`);
  if (profile.budgetPerPerson) parts.push(`budget per person: Rs. ${profile.budgetPerPerson}`);
  if (profile.interests.length) parts.push(`interests: ${profile.interests.join(", ")}`);
  if (profile.occasion) parts.push(`occasion: ${profile.occasion}`);
  if (profile.pace) parts.push(`pace: ${profile.pace}`);
  if (profile.style) parts.push(`style: ${profile.style}`);
  if (profile.needs.length) parts.push(`special needs: ${profile.needs.join(", ")}`);
  const body = parts.length ? parts.join("; ") : "details are still emerging from the conversation";
  return refineHint ? `${body}\n\nAlso refine the plan with this request from the traveler: ${refineHint}` : body;
};

const isReadyForItinerary = (profile: Partial<TripProfile>): boolean =>
  Boolean(profile.destination && profile.durationDays && profile.travelers);

const TRIP_CHAT_SYSTEM_PROMPT = `You are Aria, the senior trip designer at SNAV Tourism, a premium Indian travel agency (Kashmir, Rajasthan, Kerala, Golden Temple, Goa, Ladakh, Uttarakhand, Tamil Nadu and more).

You are chatting one-on-one with a traveler building a custom India trip. Greet warmly, be concise, and never overwhelm. Ask about ONE thing at a time, in a natural, friendly tone, choosing the next most important unknown from this order: destination(s), time of year/season, number of days, travelers (who is coming), budget per person, special occasion or interests, pace, style of stays, and any special needs (diet, accessibility).

When the traveler mentions something, acknowledge it briefly with a touch of enthusiasm. Never invent costs, hotels, or flights; availability is confirmed later by human experts.

Respond with ONLY valid JSON - no markdown, no code fences. Exact schema:
{"reply":"your conversational message, 1-3 sentences, one question maximum","profile":{"destination":"","month":"","durationDays":0,"travelers":0,"travelerNote":"","budgetPerPerson":0,"interests":[],"occasion":"","pace":"","style":"","needs":[]},"readyForItinerary":false}

Rules for profile:
- Fill only fields actually confirmed by the traveler; leave strings empty, numbers as 0, and arrays empty when unknown.
- destination: the place(s), as a short phrase; never fabricate a destination.
- readyForItinerary: true only when the traveler has told us destination, number of days, and number of travelers.
- If readyForItinerary is true, close by inviting them to press the "Generate my itinerary" button.
- Keep the conversation flowing naturally - do not dump a checklist.`;

const normalizeTripChatTurn = (data: unknown, hint: Partial<TripProfile>): TripChatTurn => {
  const record = (data ?? {}) as Record<string, unknown>;
  const reply = asStr(record.reply, "");
  if (!reply) {
    throw new Error("Trip chat returned no reply");
  }
  const profile = mergeProfile(normalizeTripProfile(record.profile), hint);
  const ready = Boolean(record.readyForItinerary) || isReadyForItinerary(profile);
  return { reply, profile, readyForItinerary: ready };
};

export const tripChat = async (messages: ChatMessage[]): Promise<TripChatTurn> => {
  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  if (!apiKey) {
    throw new Error("NVIDIA_NIM_API_KEY is not configured");
  }
  const hint = extractProfileFromTranscript(messages);
  const payload: ChatMessage[] = [
    { role: "system", content: TRIP_CHAT_SYSTEM_PROMPT },
    ...messages.slice(-10),
    {
      role: "user",
      content: `(Trailing context captured from the conversation - gently correct or confirm in your reply rather than asking about these again: ${tripProfileMessage(hint)})`,
    },
  ];

  let lastError: unknown;
  for (let attempt = 1; attempt <= PRIMARY_ATTEMPTS; attempt += 1) {
    try {
      const content = await chatComplete(NIM_MODEL, PRIMARY_TIMEOUT_MS, apiKey, payload, {
        temperature: 0.7,
        maxTokens: 700,
      });
      return normalizeTripChatTurn(JSON.parse(stripCodeFences(content)), hint);
    } catch (error) {
      lastError = error;
      if (attempt < PRIMARY_ATTEMPTS) {
        await sleep(1500);
      }
    }
  }

  try {
    const content = await chatComplete(NIM_FALLBACK_MODEL, FALLBACK_TIMEOUT_MS, apiKey, payload, {
      temperature: 0.7,
      maxTokens: 700,
    });
    return normalizeTripChatTurn(JSON.parse(stripCodeFences(content)), hint);
  } catch (error) {
    throw lastError instanceof Error ? lastError : error;
  }
};

const ITINERARY_SYSTEM_PROMPT = `You are Aria, the senior trip designer at SNAV Tourism, a premium Indian travel agency.

Create a personalized day-by-day itinerary for a custom India trip. It must feel bespoke and honor the traveler's interests, occasion, pace, and style. India only. On-brand, warm, vivid but not exaggerated.

Respond with ONLY valid JSON - no markdown, no code fences. Exact schema:
{"title":"short evocative name (max 6 words)","vibe":"one memorable line about the feel of the trip","overview":"2-3 sentence summary","seasonNote":"seasonal/best-time tip if we know the month, otherwise empty string","days":[{"day":1,"title":"short day title","highlights":["one concrete experience","one concrete experience","one concrete experience"],"stay":"suggested area/stay type"}],"budgetEstimate":"one line, e.g. 'Roughly Rs. X per person for stays, travel and experiences'","notes":["assertion or assumption made (e.g. dates flexible)","one more practical note","another practical note"]}

Requirements:
- days: one per travel day. If the requested duration is very long (more than 12), still cap at 12 days and say so in notes.
- 2-5 highlights per day, specific and local (not generic).
- No fabricated flight times, hotel names, or hard prices - use stay areas and price bands.
- The human SNAV experts will confirm availability and exact bookings.`;

const normalizeTripItinerary = (data: unknown, profile: Partial<TripProfile>): TripItinerary => {
  const record = (data ?? {}) as Record<string, unknown>;
  const requested = Math.max(2, profile.durationDays ?? 5);
  const maxDays = Math.min(requested, 12);

  let days: TripDay[] = Array.isArray(record.days)
    ? (record.days as unknown[])
        .slice(0, maxDays)
        .map((day, index) => ({
          day: asNum((day as Record<string, unknown>)?.day) ?? index + 1,
          title: asStr((day as Record<string, unknown>)?.title, `Day ${index + 1}`),
          highlights: asStrArray((day as Record<string, unknown>)?.highlights, 5),
          stay: asStr((day as Record<string, unknown>)?.stay),
        }))
        .filter((day) => day.highlights.length > 0)
    : [];
  if (days.length === 0) {
    days = Array.from({ length: maxDays }, (_, index) => ({
      day: index + 1,
      title: `Day ${index + 1}`,
      highlights: ["Explore the local highlights"],
    }));
  }

  return {
    title: asStr(record.title, "Your Custom India Getaway"),
    vibe: asStr(record.vibe),
    overview: asStr(record.overview),
    seasonNote: asStr(record.seasonNote),
    days,
    budgetEstimate: asStr(record.budgetEstimate),
    notes: asStrArray(record.notes, 6),
  };
};

export const buildTripItinerary = async (profile: Partial<TripProfile>, refineHint?: string): Promise<TripItinerary> => {
  const apiKey = process.env.NVIDIA_NIM_API_KEY;
  if (!apiKey) {
    return fallbackTripItinerary(profile, refineHint);
  }
  const payload: ChatMessage[] = [
    { role: "system", content: ITINERARY_SYSTEM_PROMPT },
    { role: "user", content: `Traveler profile: ${tripProfileMessage(profile, refineHint)}. Create the itinerary now.` },
  ];

  let lastError: unknown;
  for (let attempt = 1; attempt <= PRIMARY_ATTEMPTS; attempt += 1) {
    try {
      const content = await chatComplete(NIM_MODEL, PRIMARY_TIMEOUT_MS, apiKey, payload, {
        temperature: 0.7,
        maxTokens: 2400,
      });
      return normalizeTripItinerary(JSON.parse(stripCodeFences(content)), profile);
    } catch (error) {
      lastError = error;
      if (attempt < PRIMARY_ATTEMPTS) {
        await sleep(1500);
      }
    }
  }

  try {
    const content = await chatComplete(NIM_FALLBACK_MODEL, FALLBACK_TIMEOUT_MS, apiKey, payload, {
      temperature: 0.7,
      maxTokens: 2400,
    });
    return normalizeTripItinerary(JSON.parse(stripCodeFences(content)), profile);
  } catch {
    return fallbackTripItinerary(profile, refineHint);
  }
};

export const fallbackTripItinerary = (profile: Partial<TripProfile>, refineHint?: string): TripItinerary => {
  const destination = profile.destination || "India";
  const month = profile.month ? ` in ${profile.month}` : "";
  const travelers = profile.travelers ? ` for ${profile.travelers} traveler(s)` : "";
  const occasion = profile.occasion ? ` celebrating ${profile.occasion}` : "";
  const duration = profile.durationDays ?? 5;
  const maxDays = Math.min(duration, 12);

  const days: TripDay[] = [
    {
      day: 1,
      title: "Arrival & First Impressions",
      highlights: [
        `Arrive in ${destination}${month} and settle into your stay area`,
        "Unwind with a gentle local welcome experience",
        `Evening orientation walk; a first taste of local food${occasion}`,
      ],
      stay: "Charming central stay area selected by SNAV experts",
    },
  ];

  for (let index = 2; index < maxDays; index += 1) {
    days.push({
      day: index,
      title: index % 2 === 0 ? "Immersive Exploration" : "Culture, Food & Local Life",
      highlights: [
        index % 2 === 0
          ? `${profile.pace === "Relaxed" ? "Half-day" : "A full day of"} sightseeing with a local guide`
          : `Explore a heritage quarter or landmark with its stories`,
        profile.interests.length
          ? `${profile.interests.slice(0, 2).join(" & ")} experiences woven into the day`
          : `A hands-on cultural experience (crafts, cooking, or a market walk)`,
        travelers && profile.travelers && profile.travelers > 1 ? "Meal shared at a recommended local favourite" : "Dinner at a recommended local favourite",
      ],
      stay: "Stay area confirmed by SNAV experts",
    });
  }

  days.push({
    day: maxDays,
    title: "Golden Hours & Farewell",
    highlights: [
      "A slow morning, last-minute picks from a wishlist",
      "Sunset or scenic drive to close the trip on a high note",
      "Departure with memories (and plenty of photos)",
    ],
    stay: "Optional pre-departure evening stay",
  });

  const notes = [
    `Itinerary built around ${destination}${month || ", dates flexible"}`,
    profile.budgetPerPerson ? `Budget kept near Rs. ${profile.budgetPerPerson.toLocaleString("en-IN")} per person` : "Budget to be fine-tuned with our experts",
    refineHint ? `Refinement applied: ${refineHint}` : "Realistic pace—shuffle days freely, we can reorder on your word",
    "Availability and exact bookings to be confirmed by the SNAV team",
  ];

  return {
    title: `${destination} Escape`,
    vibe: occasion ? `Warm, private and moment-worthy` : "Balanced, comfortable and memorable",
    overview: `A ${maxDays}-day journey through ${destination}${month}${travelers}. It weaves the best of the region with a pace that feels right for you.`,
    seasonNote: profile.month ? `Peak local conditions in ${profile.month}—best booked 4–6 weeks ahead.` : "",
    days,
    budgetEstimate: "Rough per-person band to be confirmed after the experts review availability",
    notes,
  };
};

export const fallbackTripChat = (messages: ChatMessage[], hint: Partial<TripProfile>): TripChatTurn => {
  const askOrder: { missing: (p: Partial<TripProfile>) => boolean; question: string }[] = [
    { missing: (p) => !p.destination, question: "So, where in India are we dreaming about? A state, a town, or even a rough vibe is a great start." },
    { missing: (p) => !p.month, question: "Around what time would you like to go? A month or season works perfectly." },
    { missing: (p) => !p.durationDays, question: "How many days would you like to spend on the road?" },
    { missing: (p) => !p.travelers, question: "Who's coming along — just you two, friends, or the whole family?" },
    { missing: (p) => !p.budgetPerPerson, question: "Do you have a budget per person in mind? It helps us match the right stays and experiences." },
    { missing: (p) => !p.occasion && p.interests.length === 0, question: "And what would make this trip special — an occasion, or a few things you love doing?" },
    { missing: (p) => !p.pace, question: "Should we keep this relaxed and slow, or squeeze in as much as possible?" },
    { missing: () => false, question: "You're all set for a preview! Press 'Generate my itinerary' and I'll put a first draft together." },
  ];

  const next = askOrder.find((item) => item.missing(hint));
  const ready = isReadyForItinerary(hint);
  const reply = ready
    ? "Wonderful — that's everything I need for a first draft! Press 'Generate my itinerary' and I'll put something special together."
    : (next?.question ?? "Anything else you'd like to share about this trip?");

  return { reply, profile: hint, readyForItinerary: ready };
};