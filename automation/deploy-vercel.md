# Deploy on GitHub + Vercel (continuous deployment — "keeps going")

**Goal:** code on GitHub → Vercel auto-redeploys on every change. Set up once; runs forever.
Already done for you: the `agentconnect-pro` folder is a committed git repo, and `vercel.json` is in place.

Pick ONE path. **Option A needs no terminal and no token — start there.**

---

## Option A — all in the browser (easiest, no token)

### 1. Create the GitHub repo
1. Go to **github.com** (you're logged in) → top-right **+** → **New repository**.
2. Name it **`agentconnect`** → keep it **Public** (or Private) → **Create repository**.

### 2. Upload your files
1. On the new empty repo page, click **"uploading an existing file"** (or **Add file → Upload files**).
2. In **Finder**, open **Desktop ▸ agentconnect ▸ agentconnect-pro**.
3. Select the **contents** — `index.html`, the `assets` folder, `vercel.json` — and **drag them into the browser** upload area. (Drag the *contents*, not the outer folder, so `index.html` sits at the repo root.)
4. Scroll down → **Commit changes**.

### 3. Connect Vercel (auto-deploy)
1. Go to **vercel.com** → **Add New… → Project**.
2. **Import** your `agentconnect` GitHub repo (authorize Vercel↔GitHub if asked — your click).
3. Framework Preset: **Other** · Build command: **(leave empty)** · Output dir: **(leave empty / `.`)**.
4. **Deploy.** In ~30s you get a permanent URL like `agentconnect.vercel.app`.

✅ **Done.** From now on, any time you change a file in the GitHub repo (drag a new version via *Add file → Upload files*), **Vercel auto-redeploys.** That's "keeps going."

---

## Option B — terminal (enables the AI agent to auto-push later)
Use this when you want code changes (incl. the self-improving growth agent) to deploy automatically.

1. Create the empty repo on GitHub as in Option A, step 1 (don't upload files).
2. Create a **Personal Access Token**: github.com → Settings → Developer settings → **Personal access tokens → Tokens (classic)** → Generate, scope **`repo`**. Copy it. *(You keep this — never share it.)*
3. In **Terminal**, run:
   ```bash
   cd ~/Desktop/agentconnect/agentconnect-pro
   git remote add origin https://github.com/YOUR-USERNAME/agentconnect.git
   git branch -M main
   git push -u origin main
   ```
4. When prompted: **Username** = your GitHub username · **Password** = paste the **token** (not your password). macOS saves it to Keychain, so future pushes are automatic.
5. Connect Vercel as in Option A, step 3.

After this, deploying an update is just:
```bash
git add -A && git commit -m "update" && git push
```
…and Vercel redeploys automatically.

---

## Make it show your real database on the public site
Before uploading/pushing, paste your Supabase **URL + anon key** into `assets/supabase-config.js`
(see that file's comments). Then the deployed site reads your live data.

## Fully hands-off updates (the self-improving loop)
With Option B set up, schedule the growth agent (`/schedule` in Claude Code, using
`prompts/growth-loop.md`) to open changes → you approve/merge → `git push` → Vercel redeploys.
See `keep-running.md` for the always-on picture.

---
### Which to choose
- Just want it live + easy updates → **Option A**.
- Want the AI agent to ship changes automatically → **Option B**.
Both give you Vercel's auto-redeploy. Vercel's free **Hobby** tier is enough to start.
