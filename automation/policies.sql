-- AgentConnect — RLS policies
-- Run AFTER schema.sql. Paste into Supabase → SQL Editor → Run.
-- Enables RLS on every table, then opens public browsing + locks personal data to its owner.
-- Your AI agents use the service_role key, which bypasses RLS — they keep working.

-- ---------- enable RLS everywhere ----------
alter table market            enable row level security;
alter table developer         enable row level security;
alter table payment_plan      enable row level security;
alter table project           enable row level security;
alter table building          enable row level security;
alter table unit              enable row level security;
alter table market_study      enable row level security;
alter table academy_course    enable row level security;
alter table app_user          enable row level security;
alter table lead              enable row level security;
alter table proposal          enable row level security;
alter table subscription      enable row level security;
alter table certification     enable row level security;
alter table user_connection   enable row level security;
alter table featured_slot     enable row level security;
alter table commission_ledger enable row level security;
alter table lead_routing      enable row level security;
alter table integration       enable row level security;

-- ---------- PUBLIC READ (free browsing of the catalogue) ----------
create policy "public read" on market         for select using (true);
create policy "public read" on developer      for select using (true);
create policy "public read" on payment_plan   for select using (true);
create policy "public read" on project        for select using (true);
create policy "public read" on building       for select using (true);
create policy "public read" on unit           for select using (true);
create policy "public read" on academy_course for select using (true);
create policy "public read" on integration    for select using (true);
-- market studies: public can only read LIVE ones (drafts stay private)
create policy "public read live" on market_study for select using (status = 'live');

-- ---------- OWNER-ONLY (personal data) ----------
-- app_user: a user sees/edits only their own row
create policy "own profile" on app_user for select using (id = auth.uid());
create policy "edit profile" on app_user for update using (id = auth.uid());

-- helper pattern: select/insert/update limited to the owner
create policy "own select" on lead for select using (owner_id = auth.uid());
create policy "own insert" on lead for insert with check (owner_id = auth.uid());
create policy "own update" on lead for update using (owner_id = auth.uid());

create policy "own select" on proposal for select using (owner_id = auth.uid());
create policy "own insert" on proposal for insert with check (owner_id = auth.uid());

create policy "own select" on subscription   for select using (user_id = auth.uid());
create policy "own select" on certification  for select using (user_id = auth.uid());
create policy "own select" on user_connection for select using (user_id = auth.uid());
create policy "own insert" on user_connection for insert with check (user_id = auth.uid());
create policy "own update" on user_connection for update using (user_id = auth.uid());

-- featured_slot / commission_ledger / lead_routing: no anon policy on purpose
-- (admin/back-office reads them via the service_role key, which bypasses RLS).
