/* AgentConnect — shared UI shell & helpers */
window.UI = (function () {
  const NAV = [
    { group: "Discover", items: [
      { route: "markets", label: "Markets", icon: "globe" },
      { route: "compare", label: "Compare Markets", icon: "layers" },
      { route: "projects", label: "Projects", icon: "db", tag: "1.6k" },
    ]},
    { group: "My Business", items: [
      { route: "dashboard", label: "Dashboard", icon: "grid" },
      { route: "crm", label: "CRM & Leads", icon: "users" },
      { route: "proposals", label: "Proposals", icon: "file" },
    ]},
    { group: "Tools", items: [
      { route: "ai", label: "AI Studio", icon: "sparkles", tag: "New" },
      { route: "academy", label: "Academy", icon: "grad" },
      { route: "integrations", label: "Integrations", icon: "zap" },
    ]},
    { group: "Supply & Admin", items: [
      { route: "developer", label: "Developer Portal", icon: "briefcase" },
      { route: "inventory", label: "Inventory Desk", icon: "building" },
      { route: "admin", label: "Admin & Ledger", icon: "shield" },
    ]},
    { group: "Account", items: [
      { route: "pricing", label: "Plans", icon: "tag" },
      { route: "settings", label: "Settings", icon: "settings" },
    ]},
  ];

  function logoMark() { return `<div class="mark">${icon("globe", 20)}</div>`; }

  function sidebar(active) {
    const groups = NAV.map(g => `
      <div class="nav-group">${g.group}</div>
      ${g.items.map(it => `
        <a class="nav-item ${active === it.route ? "active" : ""}" href="#/${it.route}">
          ${icon(it.icon, 18)}<span>${it.label}</span>
          ${it.tag ? `<span class="tag">${it.tag}</span>` : ""}
        </a>`).join("")}
    `).join("");
    const t = ENT.tier();
    const upsell = t === "plus" ? `
        <div class="upsell" style="background:linear-gradient(160deg,hsl(var(--gold)/.16),transparent);border-color:hsl(var(--gold)/.25)">
          <div class="row gap-2" style="color:hsl(var(--gold));margin-bottom:8px">${icon("crown",18)}<b style="font-size:13px">Plus active</b></div>
          <p class="muted" style="font-size:12.5px;line-height:1.5">Full 3D inventory, cross-market AI & on-call support unlocked.</p>
        </div>`
      : `
        <div class="upsell">
          <div class="row gap-2" style="color:hsl(var(--emerald));margin-bottom:8px">${icon("rocket",18)}<b style="font-size:13px">${t === "pro" ? "Go Plus" : "Upgrade"}</b></div>
          <p class="muted" style="font-size:12.5px;line-height:1.5;margin-bottom:12px">${t === "pro" ? "Unlock 3D inventory + cross-market AI." : "Pro pays for itself in one closing."}</p>
          <a href="#/pricing" class="btn btn-primary btn-sm btn-block">See plans</a>
        </div>`;
    return `<aside class="sidebar">
      <a class="brand" href="#/">${logoMark()}<span class="name"><b>Agent</b>Connect</span></a>
      ${groups}
      <div class="side-foot">${upsell}</div>
    </aside>`;
  }

  function topbar() {
    return `<header class="topbar">
      <div class="row gap-3" style="flex:1">
        <div class="field-icon search" style="max-width:420px;width:100%">
          ${icon("search",17)}
          <input class="input" placeholder="Search markets, projects, leads…" />
        </div>
      </div>
      <div class="row gap-2 hide-sm" title="Demo control">${ENT.tierSwitcher()}</div>
      <button class="icon-btn" data-theme-toggle title="Toggle theme">${icon("moon",18)}</button>
      <button class="icon-btn" title="Notifications" style="position:relative">${icon("bell",18)}
        <span style="position:absolute;top:8px;right:9px;width:7px;height:7px;border-radius:99px;background:hsl(var(--emerald));border:1.5px solid hsl(var(--bg-2))"></span>
      </button>
      <div class="row gap-3" style="padding-left:6px">
        <div class="avatar">AB</div>
        <div style="line-height:1.2" class="hide-sm">
          <div style="font-size:13.5px;font-weight:600">Abbii</div>
          <div class="faint" style="font-size:12px">International Broker</div>
        </div>
      </div>
    </header>`;
  }

  function mobileBar() {
    return `<div class="mobile-bar">
      <a class="brand" href="#/" style="padding:0">${logoMark()}<span class="name"><b>Agent</b>Connect</span></a>
      <div class="row gap-2">${ENT.tierSwitcher()}
        <button class="icon-btn" data-theme-toggle>${icon("moon",18)}</button>
        <button class="icon-btn" data-mobile-nav>${icon("menu",18)}</button>
      </div>
    </div>`;
  }

  function shell(active, content) {
    return `<div class="shell">
      ${sidebar(active)}
      <div class="main">
        ${mobileBar()}
        ${topbar()}
        <main class="page fade-in">${content}</main>
      </div>
    </div>`;
  }

  /* ---------- marketing chrome ---------- */
  function marketingNav() {
    return `<nav class="lp-nav" id="lpNav"><div class="container inner">
      <a class="brand" href="#/" style="padding:0">${logoMark()}<span class="name"><b>Agent</b>Connect</span></a>
      <div class="lp-links">
        <a href="#/markets">Markets</a>
        <a href="#/compare">Compare</a>
        <a href="#/projects">Projects</a>
        <a href="#/pricing">Pricing</a>
        <a href="#/academy">Academy</a>
      </div>
      <div class="row gap-3">
        <button class="icon-btn" data-theme-toggle>${icon("moon",18)}</button>
        <a href="#/dashboard" class="btn btn-ghost btn-sm hide-sm">Sign in</a>
        <a href="#/dashboard" class="btn btn-primary btn-sm">Launch app ${icon("arrowRight",16)}</a>
      </div>
    </div></nav>`;
  }

  function footer() {
    const col = (h, links) => `<div><h5>${h}</h5>${links.map(l => `<a href="${l[1]}">${l[0]}</a>`).join("")}</div>`;
    return `<footer class="footer"><div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="#/" style="padding:0;margin-bottom:14px">${logoMark()}<span class="name"><b>Agent</b>Connect</span></a>
          <p class="muted" style="font-size:14px;max-width:36ch">The global real-estate closing engine. Work every market — Dubai, Bali, Georgia, Oman & beyond — from anywhere.</p>
          <div class="row gap-2" style="margin-top:18px">
            <span class="chip"><span class="dot live"></span>4 markets live · more rolling out</span>
          </div>
        </div>
        ${col("Markets", [["Dubai","#/market/dubai"],["Bali","#/market/bali"],["Georgia","#/market/georgia"],["Oman","#/market/oman"]])}
        ${col("Product", [["Market Intelligence","#/markets"],["Compare","#/compare"],["Integrations","#/integrations"],["Academy","#/academy"]])}
        ${col("Business", [["Pricing","#/pricing"],["For developers","#/developer"],["Certification","#/academy"],["Contact","#/pricing"]])}
      </div>
      <hr class="divider" style="margin:36px 0 20px">
      <div class="row between wrap gap-3 muted" style="font-size:13px">
        <span>© 2026 AgentConnect — global real-estate infrastructure. Built with Claude Code.</span>
        <span>🌍 Close from anywhere</span>
      </div>
    </div></footer>`;
  }

  /* ---------- atoms ---------- */
  function kpi({ icon: ic, val, label, trend, up, spark, suffix }) {
    return `<div class="card kpi hover reveal">
      <div class="ico">${icon(ic, 20)}</div>
      ${trend != null ? `<div class="trend ${up ? "spark-up" : "spark-down"}">${icon("trending", 14)}${trend}</div>` : ""}
      <div class="val mono" data-count="${val.raw != null ? val.raw : ""}" data-suffix="${suffix || ""}">${val.text != null ? val.text : val}</div>
      <div class="lbl">${label}</div>
      ${spark ? `<div class="spark">${spark}</div>` : ""}
    </div>`;
  }
  function avatarInitials(name, color) {
    const i = name.split(" ").map(s => s[0]).slice(0, 2).join("");
    return `<div class="avatar-sm" style="background:${color || "hsl(var(--emerald))"}">${i}</div>`;
  }
  function fmtAED(m) { if (m >= 1) return `AED ${m.toFixed(m % 1 ? 2 : 1)}M`; return `AED ${(m * 1000).toFixed(0)}K`; }
  // generic money formatter by currency code in millions
  function fmtCur(m, cur) {
    cur = cur || "AED";
    if (m >= 1) return `${cur} ${m.toFixed(m % 1 ? 2 : 1)}M`;
    return `${cur} ${(m * 1000).toFixed(0)}K`;
  }
  function sentimentGauge(score, cls) {
    const col = cls === "bullish" ? "hsl(var(--emerald))" : cls === "neutral" ? "hsl(var(--gold))" : "hsl(0 80% 64%)";
    const C = 2 * Math.PI * 32;
    const off = C * (1 - score / 100);
    return `<svg class="gauge" viewBox="0 0 84 84"><circle cx="42" cy="42" r="32" fill="none" stroke="hsl(var(--border))" stroke-width="8"/>
      <circle cx="42" cy="42" r="32" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${off}" transform="rotate(-90 42 42)"/>
      <text x="42" y="47" text-anchor="middle" font-size="20" font-weight="800" fill="hsl(var(--text))" font-family="Inter, system-ui, sans-serif">${score}</text></svg>`;
  }

  /* ---------- behaviour ---------- */
  function initTheme() { document.documentElement.setAttribute("data-theme", localStorage.getItem("ac-theme") || "dark"); }
  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("ac-theme", next); syncThemeIcons();
  }
  function syncThemeIcons() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(b => b.innerHTML = icon(dark ? "moon" : "sun", 18));
  }
  function observeReveals() {
    const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 35, 220)}ms`; io.observe(el); });
  }
  function animateCounters() {
    document.querySelectorAll("[data-count]").forEach(el => {
      const target = parseFloat(el.getAttribute("data-count"));
      if (isNaN(target) || el.getAttribute("data-count") === "") return;
      const dur = 1000, t0 = performance.now(), suffix = el.getAttribute("data-suffix") || "", dec = (target % 1 !== 0) ? 1 : 0;
      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * e).toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }
  function toast(msg) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
    const t = document.createElement("div"); t.className = "toast"; t.innerHTML = `${icon("check", 18)}<span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateX(20px)"; t.style.transition = "all .3s"; }, 2400);
    setTimeout(() => t.remove(), 2750);
  }
  function openDrawer(html) {
    closeDrawer();
    const scrim = document.createElement("div"); scrim.className = "scrim"; scrim.id = "scrim";
    const d = document.createElement("div"); d.className = "drawer"; d.id = "drawer"; d.innerHTML = html;
    scrim.onclick = closeDrawer; document.body.appendChild(scrim); document.body.appendChild(d);
    d.querySelectorAll("[data-close]").forEach(b => b.onclick = closeDrawer);
    return d;
  }
  function closeDrawer() { ["scrim", "drawer"].forEach(i => { const e = document.getElementById(i); if (e) e.remove(); }); }

  function hydrate() {
    syncThemeIcons();
    document.querySelectorAll("[data-theme-toggle]").forEach(b => b.onclick = toggleTheme);
    if (window.ENT && window.__rerender) ENT.wireTierSwitcher(window.__rerender);
    observeReveals(); animateCounters();
    const nav = document.getElementById("lpNav");
    if (nav) { const f = () => nav.classList.toggle("scrolled", window.scrollY > 40); f(); window.addEventListener("scroll", f, { passive: true }); }
  }

  return { NAV, shell, marketingNav, footer, kpi, avatarInitials, fmtAED, fmtCur, sentimentGauge,
           initTheme, toggleTheme, syncThemeIcons, observeReveals, animateCounters, toast,
           openDrawer, closeDrawer, hydrate, logoMark };
})();
