# Make.com scenarios — click-by-click (no code)
Each scenario = a row of connected modules. Build once, set the schedule, walk away.
Get your keys from each service's dashboard and paste them into Make's "Connections" (never into chat).

---
## Scenario 1 — Ingestion (fills your catalogue)
1. **Apify › Watch Actor Runs** (or **Schedule** trigger, daily) → connect your Apify account, pick the actor from Step C.
2. **Apify › Get Dataset Items** → returns scraped projects.
3. **Iterator** → loop each item.
4. **HTTP › Make a request** → POST `https://api.anthropic.com/v1/messages`
   - Header `x-api-key: {your Anthropic key}`, `anthropic-version: 2023-06-01`
   - Body: model `claude-opus-4-8`, system = contents of `prompts/extract-project.md`, user = the scraped item text.
5. **JSON › Parse JSON** → parse Claude's output.
6. **Supabase › Upsert a Row** (table `project`, conflict on `external_id`) → map the parsed fields.
7. **Filter** before step 6: if `status_flag = needs_review`, route to a "Review" email/Slack instead.
→ Schedule: **daily**.

## Scenario 2 — Inventory sync
Same as 1, but the actor scrapes availability, and the final module is **Supabase › Update Row** on
`unit` (match by `unit_no`+project) setting `status`. Schedule: **every 6–12h**.

## Scenario 3 — Market scout
1. **Schedule** (weekly).
2. **HTTP** → web-search/data source for the candidate market (or a research actor).
3. **HTTP › Anthropic** with `prompts/market-study.md`.
4. **Supabase › Insert Row** into `market_study` (status `draft`).
5. **Email › Send me** the summary + `recommend_launch`. You flip status to `live` to launch.

## Scenario 4 — Developer outreach (drafts → you approve → send)
1. **Apollo › Watch new contacts** from a saved search (developers in {market}).
2. **HTTP › Anthropic** with `prompts/developer-outreach.md`.
3. **Email/Slack › send the draft to YOU** with Approve/Edit buttons (Make has "Approval" via webhook or just reply-to-send).
4. On approve → **Gmail/WhatsApp › Send** + **Supabase › Insert** into `lead`.
5. Reply received → **you** take the call and sign. (Optional: auto-create a `lead_routing` row.)

## Scenario 5 — Growth loop
Not Make — use a **Claude Code routine** (`/schedule` in the Claude Code app), weekly, pointed at
your repo + PostHog, using `prompts/growth-loop.md`. It opens a diff; you merge; Vercel deploys.

---
### Spend safety
In Make: set scenario "max cycles". In Apify: set run limits. In Anthropic: set a monthly budget cap.
Start all on free tiers; turn the schedules on one scenario at a time so you can watch costs.
