-- AgentConnect — seed data (4 live markets, developers, projects, studies)
-- Run AFTER schema.sql + policies.sql. Paste into Supabase → SQL Editor → Run.
-- Safe to re-run (idempotent).

-- ---------- payment plans ----------
insert into payment_plan (id, label, schedule) values
 ('60/40','60/40','[["On booking","10%"],["During construction","50%"],["On handover","40%"]]'),
 ('70/30','70/30','[["On booking","20%"],["During construction","50%"],["On handover","30%"]]'),
 ('80/20','80/20','[["On booking","20%"],["During construction","60%"],["On handover","20%"]]'),
 ('50/50','50/50','[["On booking","10%"],["During construction","40%"],["On handover","50%"]]'),
 ('65/35','65/35','[["On booking","15%"],["During construction","50%"],["On handover","35%"]]'),
 ('cash','Cash / Ready','[["On transfer","100%"]]'),
 ('installments','Installments','[["On booking","30%"],["Monthly","60%"],["On handover","10%"]]')
on conflict (id) do nothing;

-- ---------- markets ----------
insert into market (id, name, country, flag, currency, fx_to_usd, status, positioning) values
 ('dubai','Dubai','United Arab Emirates','🇦🇪','AED',0.272,'live','Global investment · off-plan · luxury · high rental yield · capital appreciation'),
 ('bali','Bali','Indonesia','🇮🇩','IDR',0.000061,'live','Lifestyle investment · tourism · villas · short-term rental potential'),
 ('georgia','Georgia','Georgia','🇬🇪','GEL',0.37,'live','Affordable entry · growing tourism · residency & investment appeal'),
 ('oman','Oman','Oman','🇴🇲','OMR',2.60,'live','Emerging luxury · waterfront · lifestyle · long-term regional growth')
on conflict (id) do nothing;

-- ---------- developers ----------
insert into developer (id, name, market_id, verified, tier) values
 ('emaar','Emaar','dubai',true,'Premium'),
 ('damac','DAMAC','dubai',true,'Premium'),
 ('sobha','Sobha Realty','dubai',true,'Premium'),
 ('nakheel','Nakheel','dubai',true,'Standard'),
 ('binghatti','Binghatti','dubai',true,'Standard'),
 ('ellington','Ellington','dubai',true,'Standard'),
 ('penida','Penida Estates','bali',true,'Standard'),
 ('orbi','Orbi Group','georgia',true,'Standard'),
 ('almouj','Al Mouj Muscat','oman',true,'Premium')
on conflict (id) do nothing;

-- ---------- projects ----------
insert into project (external_id, name, developer_id, market_id, district, type, status, price_from, currency, beds, roi, handover, payment_plan_id, featured) values
 ('p1','Burj Crown','emaar','dubai','Downtown','Apartment','off_plan',1.85,'AED','1–3 BR',6.2,'Q4 2026','60/40',true),
 ('p2','DAMAC Bay by Cavalli','damac','dubai','Dubai Marina','Apartment','off_plan',2.10,'AED','1–5 BR',6.8,'Q2 2027','70/30',true),
 ('p3','Sobha Hartland II','sobha','dubai','Creek Harbour','Villa','off_plan',6.40,'AED','4–6 BR',5.4,'Q1 2027','60/40',false),
 ('p5','Binghatti Skyrise','binghatti','dubai','Business Bay','Apartment','off_plan',0.95,'AED','Studio–3 BR',8.1,'Q3 2026','70/30',true),
 ('p6','Ellington Belgravia','ellington','dubai','JVC','Apartment','ready',0.78,'AED','Studio–2 BR',8.4,'Ready','cash',false),
 ('p10','Marina Shores','emaar','dubai','Dubai Marina','Apartment','off_plan',1.95,'AED','1–4 BR',6.5,'Q1 2026','70/30',false),
 ('b1','Canggu Cliff Villas','penida','bali','Uluwatu','Villa','off_plan',0.45,'USD','2–3 BR',12.5,'Q4 2026','50/50',true),
 ('b2','Berawa Garden Residences','penida','bali','Canggu','Villa','ready',0.32,'USD','1–2 BR',13.2,'Ready','cash',false),
 ('g1','Batumi Sea Towers','orbi','georgia','Batumi','Apartment','off_plan',0.058,'USD','Studio–2 BR',11.0,'Q2 2026','installments',true),
 ('o1','Al Mouj Marina Residences','almouj','oman','Al Mouj (Muscat)','Apartment','off_plan',0.18,'OMR','1–3 BR',6.0,'Q3 2027','50/50',true)
on conflict (market_id, name, developer_id) do nothing;

-- ---------- market studies (live) ----------
delete from market_study where market_id in ('dubai','bali','georgia','oman');
insert into market_study (market_id, status, sentiment_label, sentiment_score, sentiment_rationale, headline) values
 ('dubai','live','Bullish',78,'Record DLD transaction volumes, sustained foreign inflows, and metro/road expansion continue to push prime-area prices. Supply is rising but absorption stays strong.','{"ppsf_usd":539,"yoy":14.2,"yield":6.4,"appreciation":11.8,"txn_yoy":18}'),
 ('bali','live','Bullish',71,'Tourism well past pre-2020 peaks and a structural digital-nomad wave keep villa occupancy and nightly rates high. Leasehold structure requires care.','{"ppsf_usd":280,"yoy":12,"yield":11.5,"appreciation":9,"txn_yoy":22}'),
 ('georgia','live','Neutral',58,'Low entry prices and strong tourism support yields, but currency and regional geopolitics add volatility. Best as a high-yield, lower-ticket diversification play.','{"ppsf_usd":110,"yoy":8.5,"yield":9.5,"appreciation":6.5,"txn_yoy":11}'),
 ('oman','live','Neutral',62,'New freehold ITC zones and tax-free rental income are drawing GCC and European buyers. Liquidity is thinner than Dubai — a patient, lifestyle-led appreciation market.','{"ppsf_usd":1612,"yoy":9,"yield":6,"appreciation":8,"txn_yoy":29}');
