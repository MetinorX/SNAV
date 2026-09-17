-- SNAV Tourism newsletter storage (run once in Supabase SQL editor)
-- Enable RLS + add policies so the publishable (anon) key can insert/read.

-- 1. Subscribers
create table if not exists public.subscribers (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

drop policy if exists "subscribers_insert" on public.subscribers;
create policy "subscribers_insert" on public.subscribers
  for insert to anon, authenticated
  with check (true);

drop policy if exists "subscribers_select" on public.subscribers;
create policy "subscribers_select" on public.subscribers
  for select to anon, authenticated
  using (true);

-- 2. Last digest week tracker
create table if not exists public.last_digest_week (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.last_digest_week enable row level security;

drop policy if exists "last_digest_upsert" on public.last_digest_week;
create policy "last_digest_upsert" on public.last_digest_week
  for insert to anon, authenticated
  with check (true);

drop policy if exists "last_digest_update" on public.last_digest_week;
create policy "last_digest_update" on public.last_digest_week
  for update to anon, authenticated
  using (true);

drop policy if exists "last_digest_select" on public.last_digest_week;
create policy "last_digest_select" on public.last_digest_week
  for select to anon, authenticated
  using (true);