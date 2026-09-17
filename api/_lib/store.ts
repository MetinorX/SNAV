import { createClient } from "@supabase/supabase-js";

type Database = {
  public: {
    Tables: {
      subscribers: {
        Row: { email: string; created_at: string };
        Insert: { email: string };
        Update: Partial<{ email: string }>;
        Relationships: [];
      };
      last_digest_week: {
        Row: { key: string; value: string; updated_at: string };
        Insert: { key: string; value: string };
        Update: Partial<{ key: string; value: string }>;
        Relationships: [];
      };
      custom_trips: {
        Row: { id: string; name: string; email: string; phone: string; status: string; payload: unknown; created_at: string };
        Insert: { name: string; email: string; phone: string; status: string; payload: unknown };
        Update: Partial<{ status: string }>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
};

const SUBSCRIBERS_TABLE = "subscribers";
const LAST_DIGEST_TABLE = "last_digest_week";
const LAST_DIGEST_KEY = "digest_week";
const CUSTOM_TRIPS_TABLE = "custom_trips";

let client: ReturnType<typeof createClient<Database>> | null = null;

const getEnv = (names: string[]): string | undefined => {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  return undefined;
};

const getClient = () => {
  const url = getEnv(["SUPABASE_URL", "VITE_SUPABASE_URL"]);
  const key = getEnv([
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_PUBLISHABLE_KEY",
    "VITE_SUPABASE_PUBLISHABLE_KEY",
    "SUPABASE_ANON_KEY",
    "VITE_SUPABASE_ANON_KEY",
  ]);
  if (!url || !key) {
    throw new Error("Supabase env vars are not configured");
  }
  if (!client) {
    client = createClient<Database>(url, key);
  }
  return client;
};

export const addSubscriber = async (email: string): Promise<boolean> => {
  const { error } = await getClient()
    .from(SUBSCRIBERS_TABLE)
    .insert({ email })
    .select("email")
    .single();
  if (error) {
    if (error.code === "23505") {
      return false;
    }
    throw error;
  }
  return true;
};

export const getSubscribers = async (): Promise<string[]> => {
  const { data, error } = await getClient()
    .from(SUBSCRIBERS_TABLE)
    .select("email");
  if (error) {
    throw error;
  }
  return (data ?? []).map((row) => row.email as string);
};

export const getLastDigestWeek = async (): Promise<string | null> => {
  const { data, error } = await getClient()
    .from(LAST_DIGEST_TABLE)
    .select("value")
    .eq("key", LAST_DIGEST_KEY)
    .single();
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }
  return (data?.value as string | undefined) ?? null;
};

export const setLastDigestWeek = async (week: string): Promise<void> => {
  const { error } = await getClient()
    .from(LAST_DIGEST_TABLE)
    .upsert({ key: LAST_DIGEST_KEY, value: week }, { onConflict: "key" });
  if (error) {
    throw error;
  }
};

export interface CustomTripRow {
  name: string;
  email: string;
  phone: string;
  status: string;
  payload: unknown;
}

export const storeCustomTrip = async (row: CustomTripRow): Promise<string> => {
  const { data, error } = await getClient()
    .from(CUSTOM_TRIPS_TABLE)
    .insert({ name: row.name, email: row.email, phone: row.phone, status: row.status, payload: row.payload })
    .select("id")
    .single();
  if (error) {
    throw error;
  }
  return (data?.id as string | undefined) ?? "";
};

export const getISOWeek = (date: Date): string => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
};