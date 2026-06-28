# Keep it running — making AgentConnect always-on (no laptop, no chat)

The golden rule: **every always-on piece lives in a cloud service and runs on a schedule.**
Your laptop and this chat are NOT the runtime — they're just where you set things up.

There are two things to make permanent: the **website** and the **agents**.

---

## 1) Keep the WEBSITE online 24/7  →  deploy to Vercel (one time)
`localhost:4178` only exists while your computer is on. To be permanently public:
1. Put the `agentconnect-pro` folder in a **GitHub repo**.
2. In **Vercel** → New Project → import that repo → **Deploy**.
3. You get a permanent URL (e.g. `agentconnect.vercel.app`) that's always up.
4. **Bonus:** every time you (or the growth agent) push code, Vercel **auto-redeploys**. The site updates itself.
5. Add your Supabase URL + anon key as Vercel **Environment Variables** (or in `supabase-config.js`).

✅ Result: the site is online forever, even with every device of yours switched off.

---

## 2) Keep the AGENTS running  →  turn on schedules in their cloud
Each agent runs inside a managed service that has its own scheduler. You flip it on **once**.

| Agent | Lives in | How to keep it running | Frequency |
|---|---|---|---|
| Ingestion (find projects) | **Apify** + **Make** | Apify → **Schedules** → add the actor on a cron; Make scenario → toggle **ON** (scheduling) | daily |
| Inventory sync | **Apify** + **Make** | same pattern; Make scenario **ON** | every 6–12h |
| Market scout | **Make** | scenario → **Scheduling: every 1 week** | weekly |
| Developer outreach | **Make** | scenario **ON**, triggered by Apollo new-contacts or daily; drafts emailed to you | daily |
| Growth / CRO (self-improving) | **Claude Code routine** or **GitHub Action** | see §3 | weekly |

In **Make**: open the scenario → bottom-left clock icon → set the schedule → flip the switch to **ON**. That's it — it now runs on Make's servers forever.
In **Apify**: left menu → **Schedules** → New schedule → pick your actor → cron. Runs in Apify's cloud.

✅ Result: scrapers fetch → Claude normalizes → rows land in Supabase → your Vercel site shows them. All without you.

---

## 3) Keep the SELF-IMPROVING loop running
This is the "website that learns." Two easy options:
- **Claude Code routine (recommended):** in the Claude Code app run `/schedule` → create a weekly cloud routine pointed at your repo + analytics, using `prompts/growth-loop.md`. It runs in the cloud (even with your computer off), opens a diff, and pings you to approve. You merge → Vercel deploys.
- **GitHub Action (cron):** a `.github/workflows/growth.yml` on a weekly `schedule:` that calls the Claude API and opens a PR. (I can generate this file for you.)

---

## 4) Keep it HEALTHY (so it doesn't silently break or overspend)
- **Failure alerts:** in each Make scenario add an **Error handler** → "send me an email/Slack" if a run fails.
- **Spend caps:** Apify → set run/credit limits. Make → free tier = 1,000 ops/mo; watch it. Anthropic → set a **monthly budget cap** in the console. Supabase/Vercel free tiers are generous.
- **A weekly glance:** Make + Apify dashboards show run history (green = ok). 2 minutes a week.

---

## 5) Your only recurring human jobs
The system runs itself; you only ever:
1. **Approve** outreach sends (drafts land in your inbox).
2. **Merge** the growth agent's proposed changes (one click).
3. **Sign** developer contracts and **decide** when to launch a new market.

Everything else — finding projects, normalizing data, updating inventory, researching markets,
drafting outreach, improving the site — keeps working on its own, in the cloud, 24/7.

---

### TL;DR — the 3 switches to flip
1. **Deploy the site to Vercel** (permanently online + auto-redeploys).
2. **Turn ON the Make scenarios + Apify schedules** (agents run on their cloud).
3. **Schedule the growth routine** (`/schedule` in Claude Code, or a GitHub Action).
Set spend caps + error alerts, and you're done.
