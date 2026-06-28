# AgentConnect — Autonomous Operations Runbook
**Goal:** a self-running system where AI does all the work and *you only sign contracts.*
**Effort for you:** create a few cloud accounts, paste keys into their dashboards, paste the
prompts/configs from this folder. No coding. Nothing runs on your laptop (it can't — no Node).

> ⚖️ Honest rule: AI **proposes** anything that touches money, law, partnerships, or production
> code; **you approve**. Everything else runs on autopilot. That's how it's "fully automated"
> without blowing up.

---

## 0) What you're building — the AI crew
| Agent | Does | Runs on | Auto / Approve |
|---|---|---|---|
| 1. Ingestion | Scrapes projects from portals/developer sites → Claude normalizes → DB | Apify + Make | ✅ auto |
| 2. Inventory sync | Re-checks availability on a schedule → updates unit status | Apify + Make | ✅ auto |
| 3. Market scout | Researches new markets → drafts a Market Study | Make + Claude | 🟡 you decide to launch |
| 4. Developer outreach | Finds developer contacts → drafts + sends sequences → logs to CRM | Apollo/Clay + Make | 🟡 you approve sends; **you sign** |
| 5. Growth/CRO | Reads analytics → proposes copy/layout/A-B + psychology → ships approved changes | Claude Code routine | 🟡 you approve |

---

## 1) The stack (all cloud, all managed, free tiers to start)
Create these accounts in this order. Paste each service's key **into the next service's dashboard** — never paste secrets into chat.

| # | Service | Why | Link | Cost |
|---|---|---|---|---|
| 1 | **Supabase** | Database + auth + API (web **and** future mobile) | supabase.com | Free tier ok |
| 2 | **Vercel** | Hosts the website + API | vercel.com | Free (Hobby) |
| 3 | **Anthropic API** | Claude = the brain (extract, write, decide) | console.anthropic.com | Pay-as-you-go (~cents/run) |
| 4 | **Apify** | Cloud scrapers on a schedule (no server) | apify.com | ~$5/mo credit free |
| 5 | **Make.com** | Visual "when X → do Y" glue (no code) | make.com | Free 1,000 ops/mo |
| 6 | **Apollo.io** (or Clay) | Find developer decision-makers + emails | apollo.io | Free tier |
| 7 | **PostHog** | Analytics that feeds the growth loop | posthog.com | Free tier |

Budget as you grow: ~$50–150/mo total. Free tiers cover your first months.

---

## 2) Setup — do these in order (copy-paste)

### Step A — Database (15 min)
1. Create a Supabase project.
2. Open **SQL Editor** → paste the entire contents of [`schema.sql`](schema.sql) → **Run**.
3. Settings → API → copy your **Project URL** and **anon/service keys** (you'll paste them into Make + Vercel later).

### Step B — Deploy the site (15 min)
1. Push the `agentconnect-pro` folder to a GitHub repo (or upload to Vercel directly).
2. Import it in Vercel → Deploy. You now have a public URL.
3. (Later, for the real backend) add your Supabase keys as Vercel **Environment Variables**.

### Step C — Ingestion agent (the foundation — start here)
1. In Apify, search the Store for a real-estate actor for your portal (e.g. "Bayut", "Property Finder").
2. Use [`apify-input.json`](apify-input.json) as the actor input (edit the URL/market).
3. In Make, build this scenario (see [`make-scenarios.md`](make-scenarios.md) for the click-by-click):
   `Apify (scheduled) → HTTP to Claude API with` [`prompts/extract-project.md`](prompts/extract-project.md) `→ Supabase "insert/upsert Project"`.
4. Set the Apify schedule to **daily**. Done — your catalogue now fills itself.

### Step D — Inventory sync
Same pattern, but the actor checks availability and Make does **update Unit.status** instead of insert. Schedule **every 6–12h**.

### Step E — Market scout
Make scenario on a weekly cron: `Claude API with` [`prompts/market-study.md`](prompts/market-study.md) `for a candidate market → insert MarketStudy (status: draft) → email you`. You read it and flip `status = live` to launch.

### Step F — Developer outreach
1. In Apollo, save a search: *Founders/Heads of Sales at real-estate developers in {market}*.
2. Make scenario: `Apollo new contacts → Claude with` [`prompts/developer-outreach.md`](prompts/developer-outreach.md) `→ draft email/WhatsApp → send to YOU for approval → on approve, send + create Lead in Supabase`.
3. When one replies and wants in → **you take the call and sign.** (That's your only job.)

### Step G — The self-improving growth loop ♻️
This is the "self-learning website."
1. Add **PostHog** to the site (one script tag) so every click/scroll/conversion is tracked.
2. Schedule a **Claude Code routine** (in the Claude Code app, run `/schedule`) — e.g. *every Monday 9am*:
   > "Pull the last 7 days of PostHog metrics for AgentConnect. Using [`prompts/growth-loop.md`],
   > propose the 3 highest-impact changes (copy, layout, CTA, pricing psychology, SEO). Open them
   > as a diff on a branch and post me the summary. Do NOT merge."
3. You skim the diff, click merge → Vercel auto-deploys. The site literally gets better every week, learning from real behavior.

> Why a Claude Code routine and not a "bot rewriting code live"? Because this way every change is
> reviewable + revertable. Same outcome, zero risk of it nuking your site.

---

## 3) The only things that stay human (by design)
Signing developer/partnership contracts · deciding to launch a market · anything with money or
legal · merging code changes. Everything feeding those is automated.

## 4) Mobile app (future)
Because the backend is **Supabase** (a clean API) and entitlements are one shared config, the same
backend powers a React Native / Expo app later with zero rework. Build web first; the mobile app
reuses the exact same data + auth + tiers.

## 5) Caveats (read once)
- **Scraping:** prefer official feeds / developer APIs / Apify's maintained actors; respect each
  portal's terms. Partnerships > scraping long-term (and onboarded developers update their own inventory).
- **Costs:** Apify/Make/Claude charge per use — start on free tiers, set spend caps.
- **Secrets:** paste API keys **into the service dashboards only**, never into chat or the repo.

---

## Where to start tomorrow morning
1. Create **Supabase** → run [`schema.sql`](schema.sql).
2. Create **Apify** + **Make** → wire the **Ingestion agent** (Step C).
That alone makes the catalogue self-fill. Then add the others one per week.
Ping me to generate any piece in detail (the Make scenario JSON, the PostHog snippet, the Expo app, etc.).
