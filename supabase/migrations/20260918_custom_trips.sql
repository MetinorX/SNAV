-- SNAV Tourism custom trip requests (run once in Supabase SQL editor)
-- Enable RLS + add an insert policy so the publishable (anon) key can store requests.
-- No select policy: requests contain phone numbers/itineraries and are reviewed by
-- the admin via the Dashboard (service role bypasses RLS) and the admin email.

create table if not exists public.custom_trips (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  status text not null default 'new',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.custom_trips enable row level security;

drop policy if exists "custom_trips_insert" on public.custom_trips;
create policy "custom_trips_insert" on public.custom_trips
  for insert to anon, authenticated
  with check (true);