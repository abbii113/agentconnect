# AgentConnect — global real-estate closing engine

A **multi-market** real-estate sales infrastructure platform — one operating system where
agents, brokerages, developers and investors connect across international property markets
(**Dubai · Bali · Georgia · Oman** live; KSA, Qatar, Türkiye, Cyprus, UK & Europe next).

Built from scratch with Claude Code as a **zero-dependency, zero-build** prototype that runs
instantly — and architected to port 1:1 onto the production **Next.js + TypeScript + Prisma +
Supabase + Stripe** stack.

## Run it
- **Just open it:** double-click `index.html` (works from `file://`, no install).
- **Or serve it:** `cd agentconnect-pro && python3 -m http.server 8000` → http://localhost:8000

> Demo tip: use the **Free / Pro / Plus** switch in the top bar to watch the entitlement
> gating change live across every page.

## Two concepts that drive the whole product
1. **Market Intelligence = the world (outward).** Pick a market → the AI analyst returns a
   *Market Study*: sentiment, infrastructure tracker, land-department transactions, road-impact,
   growth zones, legal/process. This is **not** the agent's stats.
2. **CRM / Lead Dashboard = the agent (inward).** Their own leads, pipeline and commissions.
   The two are never merged.

## Architecture (maps onto the Next.js port)
```
assets/
  market-intelligence.js   # adapter pattern: dld.adapter + rta.adapter + sentiment.engine
                           #   + marketStudy.service  (mock now → live API later, ZERO refactor)
  entitlements.js          # ONE source of truth: entitlements[tier] = {feature}; can() + locks
  data.js                  # markets, projects, inventory, connectors, ledger, leads…
  charts.js                # hand-built SVG charts
  ui.js                    # shell, nav (Discover / My Business / Tools / Supply&Admin), theme
  pages.js                 # every page renderer + interactivity
  app.js                   # hash router (#/market/:id, ?query) + re-render hook
```

### Surfaces
Landing · Markets → **Market Study** (gated) · **Compare** (cross-market; deep = Plus) ·
Projects (free browse) + project drawer with **3D live-inventory unit selector** (Plus) ·
Dashboard + **CRM** (Pro) · Proposals (free-limited) · AI Studio · Academy + certification ·
**Integrations Hub** (connector framework) · **Developer Portal** (featured + lead routing) ·
**Inventory Desk** (back-office) · **Admin & commission ledger** · Pricing (Free/Pro/Plus) · Settings.

### Tiers (entitlements.js)
- **Free** — see & learn: browse all markets/projects, surface study, compare, 2 proposals/mo.
- **Pro** — operate: full Market Study, CRM, unlimited proposals, everyday integrations, academy.
- **Plus** — win: 3D inventory selector, cross-market AI, all integrations, on-call support, multi-seat.

### Three revenue rails (in the data model)
Agent subscriptions · developer/featured/lead-routing money · ~10% deal-commission ledger.

## Porting to production
Every mock adapter in `market-intelligence.js` is flagged `// TODO: swap to live API` and returns
the exact shape the live **DLD / RTA** APIs and the **LLM sentiment** call will return. The
`entitlements` map imports unchanged server-side to gate API routes. Page layouts and the design
system in `styles.css` translate directly to React + Tailwind components.
