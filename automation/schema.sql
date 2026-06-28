-- AgentConnect — Supabase/Postgres schema
-- Paste this whole file into Supabase → SQL Editor → Run.
-- Powers the website today and the mobile app later (same API).

-- ---------- enums ----------
create type user_role   as enum ('agent','brokerage_admin','developer','inventory_team','admin');
create type user_tier   as enum ('free','pro','plus');
create type market_status as enum ('live','coming_soon');
create type project_status as enum ('off_plan','ready');
create type unit_status as enum ('available','reserved','sold');
create type lead_stage  as enum ('new','contacted','viewing','negotiation','won','lost');
create type study_status as enum ('draft','live');

-- ---------- core ----------
create table app_user (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role user_role not null default 'agent',
  tier user_tier not null default 'free',
  certification_status text default 'none',   -- none | in_progress | certified
  home_market text,
  created_at timestamptz default now()
);

create table market (
  id text primary key,                         -- 'dubai','bali',...
  name text not null,
  country text,
  flag text,
  currency text,
  fx_to_usd numeric,
  status market_status default 'coming_soon',
  positioning text
);

create table developer (
  id text primary key,
  name text not null,
  market_id text references market(id),
  verified boolean default false,
  tier text default 'Standard',                -- Standard | Premium (placement)
  contact_email text,
  created_at timestamptz default now()
);

create table payment_plan (
  id text primary key,                         -- '60/40','70/30','cash'
  label text,
  schedule jsonb                               -- [["On booking","10%"],...]
);

create table project (
  id uuid primary key default gen_random_uuid(),
  external_id text,                            -- source/portal id for dedupe
  name text not null,
  developer_id text references developer(id),
  market_id text references market(id),
  district text,
  type text,                                   -- Apartment | Villa | Townhouse | Penthouse
  status project_status default 'off_plan',
  price_from numeric,
  currency text,
  beds text,
  roi numeric,
  handover text,
  payment_plan_id text references payment_plan(id),
  featured boolean default false,             -- supply-side revenue: boosted placement
  source_url text,
  hero_image text,
  raw jsonb,                                   -- original scraped payload
  updated_at timestamptz default now(),
  unique (market_id, name, developer_id)
);

create table building (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references project(id) on delete cascade,
  name text, floors int
);
create table unit (
  id uuid primary key default gen_random_uuid(),
  building_id uuid references building(id) on delete cascade,
  unit_no text, floor int, beds int, size_sqft numeric, view text,
  price numeric, payment_plan_id text references payment_plan(id),
  status unit_status default 'available',
  updated_at timestamptz default now()
);

create table market_study (
  id uuid primary key default gen_random_uuid(),
  market_id text references market(id),
  status study_status default 'draft',
  sentiment_label text, sentiment_score int, sentiment_rationale text,
  headline jsonb, infrastructure jsonb, transactions jsonb,
  mobility jsonb, growth_zones jsonb, legal jsonb,
  generated_at timestamptz default now()
);

-- ---------- agent's own data (CRM) ----------
create table lead (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references app_user(id),
  name text, email text, phone text,
  market_id text references market(id),
  interest text, budget text, source text,
  score int, stage lead_stage default 'new',
  created_at timestamptz default now(), last_touch timestamptz
);
create table proposal (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references app_user(id),
  lead_id uuid references lead(id), project_id uuid references project(id),
  currency text, created_at timestamptz default now()
);

-- ---------- business-model rails ----------
create table subscription (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_user(id),
  tier user_tier, stripe_id text, status text, current_period_end timestamptz
);
create table featured_slot (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references project(id),
  developer_id text references developer(id),
  starts_at timestamptz, ends_at timestamptz, price numeric, status text
);
create table commission_ledger (
  id uuid primary key default gen_random_uuid(),
  deal text, agent_id uuid references app_user(id),
  gross numeric, rate numeric default 10, fee numeric, currency text,
  status text default 'pending', created_at timestamptz default now()
);
create table lead_routing (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references lead(id), developer_id text references developer(id),
  reason text, status text default 'pending', created_at timestamptz default now()
);

-- ---------- integrations ----------
create table integration (id text primary key, name text, category text, provider text, min_tier user_tier);
create table user_connection (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references app_user(id), integration_id text references integration(id),
  status text default 'connected', tokens jsonb, created_at timestamptz default now()
);

-- ---------- academy ----------
create table academy_course (id uuid primary key default gen_random_uuid(), title text, category text, level text, duration text, is_free boolean default false);
create table certification (id uuid primary key default gen_random_uuid(), user_id uuid references app_user(id), market_id text references market(id), status text, awarded_at timestamptz);

-- ---------- enable Row Level Security (then add policies in the dashboard) ----------
alter table app_user enable row level security;
alter table lead enable row level security;
alter table proposal enable row level security;
alter table subscription enable row level security;
-- NOTE: market/project/developer are public-readable (free browsing); add a "select for all" policy.
-- lead/proposal/subscription: policy = owner_id = auth.uid().
