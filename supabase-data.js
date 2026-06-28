/* AgentConnect — load live data from Supabase (graceful fallback to demo data).
   Runs once at boot. If SUPA isn't configured or the network/library is unavailable,
   the site silently keeps using the built-in demo dataset in data.js. */
window.loadFromSupabase = async function () {
  try {
    if (!window.SUPA || !SUPA.url || !SUPA.anonKey) return false;          // not configured
    if (!window.supabase || !window.supabase.createClient) return false;   // CDN didn't load (offline)
    const sb = window.supabase.createClient(SUPA.url, SUPA.anonKey);

    const withTimeout = (p, ms) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error("timeout")), ms))]);

    // developers first (so project cards can resolve names even for newly-ingested devs)
    const devRes = await withTimeout(sb.from("developer").select("id,name,market_id,verified,tier"), 4000);
    if (devRes && devRes.data) {
      devRes.data.forEach(d => {
        if (!window.DATA.developers.some(x => x.id === d.id))
          window.DATA.developers.push({ id: d.id, name: d.name, market: d.market_id, verified: d.verified, tier: d.tier, projects: 0 });
      });
    }

    // projects
    const res = await withTimeout(sb.from("project").select(
      "external_id,name,developer_id,market_id,district,type,status,price_from,currency,beds,roi,handover,payment_plan_id,featured,hero_image"), 4000);
    const rows = res && res.data;
    if (!rows || !rows.length) return false;

    const planMap = { cash: "Cash", installments: "Installments" };
    const fallbackImg = window.DATA.img("photo-1545324418-cc1a3fa10c00");

    window.DATA.projects = rows.map(r => {
      const m = window.DATA.marketById(r.market_id);
      const fx = m ? m.fxToUSD : 1;
      const usd = r.currency === "USD";
      const price = Number(r.price_from);
      return {
        id: r.external_id || r.name,
        name: r.name,
        dev: r.developer_id,
        market: r.market_id,
        district: r.district,
        type: r.type,
        from: price,
        fromUSD: usd ? price : +(price * fx).toFixed(2),
        beds: r.beds,
        roi: Number(r.roi),
        handover: r.handover,
        status: r.status === "ready" ? "Ready" : "Off-plan",
        plan: planMap[r.payment_plan_id] || r.payment_plan_id || "Cash",
        units: "—",
        sold: null,
        featured: !!r.featured,
        hasInventory: false,
        usd: usd,
        img: r.hero_image || fallbackImg,
      };
    });
    window.DATA._live = true;
    console.log(`AgentConnect: loaded ${window.DATA.projects.length} projects from Supabase`);
    return true;
  } catch (e) {
    console.warn("Supabase load skipped, using demo data:", e.message);
    return false;
  }
};
