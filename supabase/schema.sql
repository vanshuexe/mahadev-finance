-- Mahadev Group — Supabase schema.
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Access model
--   * Public visitors (anon): can READ site content (loans, properties, app_config)
--     and can INSERT a new enquiry into `applications`. They can never read enquiries.
--   * Admin (authenticated Supabase user): full access to everything.
--     Create the admin under Authentication -> Users, and turn OFF
--     "Allow new users to sign up" (Authentication -> Sign In / Providers),
--     otherwise anyone could register and become an admin.

create table if not exists public.applications (
  id            text primary key,
  type          text not null,
  category      text not null,
  title         text not null,
  customer_name text not null check (char_length(customer_name) <= 200),
  mobile        text not null check (char_length(mobile) <= 30),
  city          text not null default '' check (char_length(city) <= 200),
  status        text not null default 'New',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  details       jsonb not null default '{}'::jsonb,
  notes         jsonb not null default '[]'::jsonb
);

create table if not exists public.loans (
  id       text primary key,
  position int  not null default 0,
  data     jsonb not null
);

create table if not exists public.properties (
  id       text primary key,
  position int  not null default 0,
  data     jsonb not null
);

-- Singleton documents: 'library', 'settings', 'content'
create table if not exists public.app_config (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.applications enable row level security;
alter table public.loans        enable row level security;
alter table public.properties   enable row level security;
alter table public.app_config   enable row level security;

-- applications: anyone may submit (new, untouched enquiries only); only admin reads/edits/deletes
drop policy if exists "public can submit enquiries" on public.applications;
create policy "public can submit enquiries" on public.applications
  for insert to anon, authenticated
  with check (status = 'New' and jsonb_typeof(notes) = 'array');

drop policy if exists "admin manages applications" on public.applications;
create policy "admin manages applications" on public.applications
  for all to authenticated using (true) with check (true);

-- site content: public read, admin write
do $$
declare t text;
begin
  foreach t in array array['loans', 'properties', 'app_config'] loop
    execute format('drop policy if exists "public reads %1$s" on public.%1$I', t);
    execute format('create policy "public reads %1$s" on public.%1$I for select to anon, authenticated using (true)', t);
    execute format('drop policy if exists "admin writes %1$s" on public.%1$I', t);
    execute format('create policy "admin writes %1$s" on public.%1$I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

create index if not exists applications_created_at_idx on public.applications (created_at desc);
