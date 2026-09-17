import { Redis } from "@upstash/redis";

const SUBSCRIBERS_KEY = "subscribers";
const LAST_DIGEST_KEY = "lastDigestWeek";

let client: Redis | null = null;

const getClient = (): Redis => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error("Upstash Redis env vars are not configured");
  }
  if (!client) {
    client = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return client;
};

export const addSubscriber = async (email: string): Promise<boolean> => {
  const added = await getClient().sadd(SUBSCRIBERS_KEY, email);
  return added > 0;
};

export const getSubscribers = async (): Promise<string[]> => {
  return getClient().smembers(SUBSCRIBERS_KEY);
};

export const getLastDigestWeek = async (): Promise<string | null> => {
  return getClient().get(LAST_DIGEST_KEY);
};

export const setLastDigestWeek = async (week: string): Promise<void> => {
  await getClient().set(LAST_DIGEST_KEY, week);
};

export const getISOWeek = (date: Date): string => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
};