/* AgentConnect — hash router & bootstrap */
(function () {
  UI.initTheme();
  const root = document.getElementById("app");

  function parse() {
    const raw = location.hash.replace(/^#\/?/, "");
    const [path, qs] = raw.split("?");
    const parts = path.split("/").filter(Boolean);
    const route = parts[0] || "";
    const param = parts[1] || null;
    const query = {};
    if (qs) qs.split("&").forEach(kv => { const [k, v] = kv.split("="); query[decodeURIComponent(k)] = decodeURIComponent(v || ""); });
    return { route, param, query };
  }

  function render() {
    const { route, param, query } = parse();
    const page = PAGES[route] || PAGES[""];
    try {
      root.innerHTML = page.render(param, query);
    } catch (e) {
      console.error("render error:", e);
      root.innerHTML = `<div style="padding:60px;text-align:center"><h2>Something went wrong</h2><p style="color:#888">${e.message}</p><a href="#/" style="color:#10b981">Go home</a></div>`;
    }
    window.scrollTo(0, 0);
    const t = route.charAt(0).toUpperCase() + route.slice(1);
    document.title = route ? `AgentConnect — ${t}` : "AgentConnect — Close international real estate from anywhere";
    UI.hydrate();
    if (page.init) try { page.init(param, query); } catch (e) { console.error("init error:", e); }
    wireMobileNav();
  }

  function wireMobileNav() {
    const btn = document.querySelector("[data-mobile-nav]");
    if (btn) btn.onclick = () => {
      const overlay = document.createElement("div");
      overlay.className = "scrim";
      overlay.innerHTML = `<div style="position:fixed;top:0;left:0;bottom:0;width:80vw;max-width:320px;background:hsl(var(--bg-2));border-right:1px solid hsl(var(--border));padding:18px;overflow-y:auto" onclick="event.stopPropagation()">
        ${UI.NAV.map(g => `<div class="nav-group">${g.group}</div>${g.items.map(it => `<a class="nav-item" href="#/${it.route}">${icon(it.icon,18)}<span>${it.label}</span></a>`).join("")}`).join("")}
      </div>`;
      overlay.onclick = () => overlay.remove();
      overlay.querySelectorAll("a").forEach(a => a.onclick = () => overlay.remove());
      document.body.appendChild(overlay);
    };
  }

  async function boot() {
    try { if (window.loadFromSupabase) await window.loadFromSupabase(); } catch (e) { /* fall back to demo data */ }
    render();
  }
  window.__rerender = render;            // used by tier switcher / integration toggles
  window.addEventListener("hashchange", render);
  window.addEventListener("DOMContentLoaded", boot);
  if (document.readyState !== "loading") boot();
})();
