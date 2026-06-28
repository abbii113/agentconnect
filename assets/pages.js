/* AgentConnect — page renderers + per-page init */
window.PAGES = (function () {
  const D = window.DATA, C = window.CHART, U = window.UI;

  /* ---------- integration connection store (woven into workflow) ---------- */
  function conns() {
    if (!localStorage.getItem("ac-conns")) localStorage.setItem("ac-conns", JSON.stringify(["whatsapp", "gcal"]));
    try { return JSON.parse(localStorage.getItem("ac-conns")); } catch (e) { return []; }
  }
  function isConn(id) { return conns().includes(id); }
  function toggleConn(id) {
    const c = conns(); const i = c.indexOf(id);
    if (i >= 0) c.splice(i, 1); else c.push(id);
    localStorage.setItem("ac-conns", JSON.stringify(c));
  }

  const curLabel = (t, m) => t._usd ? "USD" : (m ? m.currency : "AED");

  /* ============================ LANDING (international) ============================ */
  function skyline() {
    return `<svg class="skyline" viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(var(--emerald))" stop-opacity=".22"/>
        <stop offset="1" stop-color="hsl(var(--emerald))" stop-opacity="0"/></linearGradient></defs>
      <g fill="url(#sky)" stroke="hsl(var(--emerald)/.35)" stroke-width="1">
        <rect x="40" y="150" width="46" height="70"/><rect x="96" y="120" width="40" height="100"/>
        <rect x="150" y="160" width="54" height="60"/><rect x="220" y="100" width="44" height="120"/>
        <rect x="280" y="140" width="38" height="80"/><rect x="330" y="90" width="50" height="130"/>
        <path d="M700 220 L700 60 L712 20 L724 60 L724 220 Z"/>
        <rect x="430" y="130" width="42" height="90"/><rect x="486" y="105" width="48" height="115"/>
        <rect x="546" y="150" width="40" height="70"/><rect x="600" y="118" width="44" height="102"/>
        <rect x="650" y="95" width="38" height="125"/>
        <rect x="760" y="110" width="46" height="110"/><rect x="820" y="145" width="40" height="75"/>
        <rect x="872" y="92" width="52" height="128"/><rect x="936" y="135" width="42" height="85"/>
        <rect x="990" y="115" width="46" height="105"/><rect x="1050" y="150" width="38" height="70"/>
        <rect x="1100" y="100" width="50" height="120"/><rect x="1162" y="140" width="44" height="80"/>
        <rect x="1220" y="120" width="40" height="100"/><rect x="1276" y="155" width="48" height="65"/>
        <rect x="1340" y="125" width="44" height="95"/>
      </g></svg>`;
  }

  function landing() {
    const stars = () => Array.from({ length: 5 }).map(() => icon("star", 15)).join("");
    const marketStrip = D.markets.map(m => `
      <a href="#/market/${m.id}" class="card glass hover" style="padding:18px;display:flex;flex-direction:column;gap:8px">
        <div class="row between"><span style="font-size:28px">${m.flag}</span><span class="badge ${m.sentiment.label==='Bullish'?'green':m.sentiment.label==='Neutral'?'gold':'red'}">${m.sentiment.label}</span></div>
        <div style="font-weight:700;font-size:16px">${m.name}</div>
        <div class="faint" style="font-size:12.5px;line-height:1.45">${m.positioning.split(" · ").slice(0,2).join(" · ")}</div>
        <div class="row gap-4" style="margin-top:6px">
          <div><div class="faint" style="font-size:10.5px">YIELD</div><div style="font-weight:700;font-size:13px">${m.headline.yield}%</div></div>
          <div><div class="faint" style="font-size:10.5px">GROWTH</div><div style="font-weight:700;font-size:13px;color:hsl(var(--emerald))">+${m.headline.yoy}%</div></div>
        </div>
      </a>`).join("");

    return U.marketingNav() + `
    <section class="hero">
      <div class="hero-grid-bg"></div><div class="glow1"></div><div class="glow2"></div>${skyline()}
      <div class="container" style="position:relative;z-index:2">
        <div class="chip" style="margin:0 auto 26px"><span class="dot live"></span>4 markets live · Dubai · Bali · Georgia · Oman</div>
        <h1>Close <span class="grad-text">international real estate</span> from anywhere</h1>
        <div class="hero-rotator"><span id="heroRot" class="grad-text">Study any market like a local analyst</span></div>
        <p class="sub">AgentConnect is the global operating system for property agents, brokerages, developers and investors — one platform to access every market, study it like an analyst, compare opportunities, generate proposals, and close the deal. Whether you're in London, Lahore, Paris or Riyadh.</p>
        <div class="cta">
          <a href="#/markets" class="btn btn-primary btn-lg">Explore the markets ${icon("arrowRight",18)}</a>
          <a href="#/dashboard" class="btn btn-ghost btn-lg">Launch the app</a>
        </div>
        <div style="margin-top:54px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1000px;margin-left:auto;margin-right:auto">${marketStrip}</div>
      </div>
    </section>

    <section class="section" style="padding-top:60px">
      <div class="container">
        <div class="section-head reveal"><h2>Six things at once — not a listings portal</h2><p>Market access · agent education · investment comparison · proposal generation · developer connection · deal execution.</p></div>
        <div class="feat-grid">
          ${[
            ["globe","Multi-market access","Browse every project across Dubai, Bali, Georgia & Oman — with KSA, Qatar, Türkiye, Cyprus, UK & Europe next."],
            ["chart","AI Market Intelligence","An analyst working 24/7: sentiment, infrastructure impact, land-department transactions, growth zones — for any market you choose."],
            ["layers","Cross-market comparison","Model the same client across markets and recommend where their money works hardest."],
            ["file","Branded proposals","Investor-ready, client-branded decks in two minutes, in the client's own currency and language."],
            ["briefcase","Developer connection","Verified developers, live inventory, and qualified leads routed to certified agents."],
            ["users","Deal execution + CRM","Your own pipeline, WhatsApp lead capture, e-signature and closing-team handoff — separate from market data."],
          ].map(f => `<div class="card glass hover feat reveal"><div class="ico">${icon(f[0],26)}</div><h3>${f[1]}</h3><p>${f[2]}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section" style="background:hsl(var(--bg-2)/.4)">
      <div class="container">
        <div class="section-head reveal"><h2>How an agent in France closes a Dubai deal</h2><p>The workflow that turns "I don't know that market" into a signed reservation.</p></div>
        <div class="steps">
          ${[
            ["01","Study the market","Open Dubai. The AI analyst hands you sentiment, infrastructure impact, recent DLD transactions and growth zones — instant local expertise."],
            ["02","Match & compare","Filter 1,600+ projects, compare ROI across markets for your client's profile, and check live unit availability."],
            ["03","Propose & close","Generate a branded proposal in the client's currency, capture them in your CRM, e-sign the reservation, and hand off to the closing team."],
          ].map(s => `<div class="card glass step reveal"><div class="num">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head reveal"><h2>Agents are closing across borders</h2></div>
        <div class="testi-grid">
          ${D.testimonials.map(t => `<div class="card glass testi reveal"><div class="stars">${stars()}</div><p>“${t.quote}”</p>
            <div class="who">${U.avatarInitials(t.name,t.color)}<div><div style="font-weight:600;font-size:14px">${t.name}</div><div class="faint" style="font-size:12.5px">${t.role}</div></div></div></div>`).join("")}
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container"><div class="cta-band reveal">
        <h2 style="font-size:clamp(28px,4vw,44px)">Your global desk is one login away</h2>
        <p class="muted" style="font-size:18px;max-width:52ch;margin:14px auto 28px">Free to browse every market and project. Upgrade when you have a live client — Pro pays for itself in a single closing.</p>
        <div class="row gap-3" style="justify-content:center;flex-wrap:wrap">
          <a href="#/dashboard" class="btn btn-primary btn-lg">Launch the app ${icon("rocket",18)}</a>
          <a href="#/pricing" class="btn btn-outline btn-lg">See pricing</a>
        </div>
      </div></div>
    </section>` + U.footer();
  }

  /* ============================ MARKETS (grid → study) ============================ */
  function markets() {
    const live = D.markets.map(m => {
      const sc = m.sentiment.label === "Bullish" ? "green" : m.sentiment.label === "Neutral" ? "gold" : "red";
      return `<a href="#/market/${m.id}" class="card glass hover market-tile reveal">
        <div class="head" style="background-image:linear-gradient(0deg,hsl(var(--bg-2)),transparent),radial-gradient(circle at 70% 20%,hsl(var(--emerald)/.3),transparent)">
          <span class="flag">${m.flag}</span>
          <span class="badge ${sc}" style="position:absolute;top:14px;right:14px">${m.sentiment.label}</span>
        </div>
        <div style="padding:18px">
          <div class="row between"><h3 style="font-size:18px">${m.name}</h3><span class="chip"><span class="dot live"></span>Live</span></div>
          <p class="faint" style="font-size:12.5px;margin:6px 0 14px;line-height:1.5">${m.positioning}</p>
          <div class="row gap-4 wrap">
            <div><div class="faint up">Avg /sqft</div><div style="font-weight:700">$${m.headline.ppsfUSD}</div></div>
            <div><div class="faint up">Yield</div><div style="font-weight:700">${m.headline.yield}%</div></div>
            <div><div class="faint up">YoY</div><div style="font-weight:700;color:hsl(var(--emerald))">+${m.headline.yoy}%</div></div>
            <div><div class="faint up">Appr.</div><div style="font-weight:700">${m.headline.appreciation}%</div></div>
          </div>
          <div class="btn btn-ghost btn-sm btn-block" style="margin-top:16px">Open market study ${icon("arrowRight",15)}</div>
        </div>
      </a>`;
    }).join("");

    const future = D.futureMarkets.map(f => `<div class="card glass" style="padding:16px;text-align:center;opacity:.75">
      <div style="font-size:26px">${f.flag}</div><div style="font-weight:600;font-size:14px;margin-top:6px">${f.name}</div>
      <div class="faint" style="font-size:11.5px">${f.note}</div><span class="badge gray" style="margin-top:8px">Coming</span></div>`).join("");

    return U.shell("markets", `
      <div class="page-head"><h1>Markets</h1><p>Choose a market and the AI analyst hands you a full, living study. <b>Market intelligence is outward</b> — your own pipeline lives in the <a href="#/crm" style="color:hsl(var(--emerald))">CRM</a>.</p></div>
      <div class="cards-grid" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr));margin-bottom:30px">${live}</div>
      <div class="section-title"><h3>Expanding next</h3></div>
      <div class="cards-grid" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr))">${future}</div>
    `);
  }

  /* ============================ MARKET STUDY (the heart) ============================ */
  function marketStudy(id) {
    const study = MI.getStudy(id);
    if (!study) return U.shell("markets", `<div class="card" style="padding:40px;text-align:center"><p class="muted">Market not found.</p><a href="#/markets" class="btn btn-ghost btn-sm" style="margin-top:14px">Back to markets</a></div>`);
    const m = study.market, s = study.sentiment, cls = s.label.toLowerCase();
    const h = study.headline;

    const headerBar = `<div class="row between wrap gap-3" style="margin-bottom:8px">
      <a href="#/markets" class="row gap-2 muted" style="font-size:13px">${icon("arrowRight",15)}<span style="transform:scaleX(-1);display:inline-block">${icon("arrowRight",15)}</span>Back to markets</a>
      <div class="row gap-2 faint" style="font-size:12px">
        ${study.sources.map(src => `<span class="badge gray" title="mock now → live API later">${src.label}${src.live?'':' · mock'}</span>`).join("")}
      </div></div>`;

    const sentiment = `<div class="sentiment ${cls} reveal">
      ${U.sentimentGauge(s.score, cls)}
      <div><div class="row gap-2"><span class="sent-label">${s.label}</span><span class="faint" style="font-size:12px">AI analyst · sentiment ${s.score}/100</span></div>
      <p class="muted" style="font-size:14px;margin-top:6px;max-width:70ch">${s.rationale}</p></div>
    </div>`;

    const headline = `<div class="headline-grid">
      ${[["$"+h.ppsfUSD,"Avg / sqft (USD)"],["+"+h.yoy+"%","YoY price"],[h.yield+"%","Avg gross yield"],[h.appreciation+"%","Capital appr."],["+"+h.txnYoY+"%","Txn volume YoY"]]
        .map(x => `<div class="card hmetric reveal"><div class="v mono">${x[0]}</div><div class="k">${x[1]}</div></div>`).join("")}
    </div>`;

    const charts = `<div class="grid" style="grid-template-columns:2fr 1fr">
      <div class="card" style="padding:22px"><div class="section-title"><h3>Price / sqft — 12 months</h3><span class="badge green">+${h.yoy}%</span></div>${C.area(study.priceTrend,{h:220,labels:D.months})}</div>
      <div class="card" style="padding:22px"><div class="section-title"><h3>Transaction volume</h3></div>${C.bars(study.volumeTrend.map((v,i)=>({label:D.months[i],value:v})),{h:220})}</div>
    </div>`;

    const infra = `<div class="card" style="padding:22px">
      <div class="section-title"><h3>Infrastructure tracker</h3><span class="faint" style="font-size:12px">via Roads & Transport feed · what it does to prices</span></div>
      ${study.infrastructure.map(p => `<div class="infra-item">
        <div class="infra-ico impact-${p.impact}">${icon(p.type==='Metro'?'layers':p.type==='Airport'?'rocket':p.type==='Road'?'map':'building',20)}</div>
        <div style="flex:1"><div class="row between"><b style="font-size:14px">${p.name}</b><span class="badge ${p.impact==='up'?'green':p.impact==='watch'?'gold':'red'}">${p.impact==='up'?'↑ Price-positive':p.impact==='watch'?'Watch':'↓ Risk'}</span></div>
        <div class="faint" style="font-size:12px;margin:2px 0 5px">${p.type} · ${p.status} · ETA ${p.eta}</div>
        <p class="muted" style="font-size:13px">${p.note}</p></div>
      </div>`).join("")}
    </div>`;

    const txns = `<div class="card" style="padding:22px">
      <div class="section-title"><h3>Recent transactions</h3><span class="badge gray">${icon("db",12)} Land Dept · mock</span></div>
      <table class="table"><thead><tr><th>Date</th><th>Area</th><th>Type</th><th class="tar">Size</th><th class="tar">Price</th></tr></thead>
      <tbody>${study.transactions.map(t => `<tr><td class="faint">${t.date.slice(5)}</td><td style="font-weight:600">${t.area}</td><td class="muted">${t.type}</td><td class="tar mono">${t.size.toLocaleString()} ft²</td><td class="tar mono" style="font-weight:600">${curLabel(t,m)} ${t.price}M</td></tr>`).join("")}</tbody></table>
    </div>`;

    const zones = `<div class="card" style="padding:22px">
      <div class="section-title"><h3>Growth zones</h3><span class="faint" style="font-size:12px">AI-flagged rising areas</span></div>
      <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
        ${study.growthZones.map(z => `<div class="zone"><div class="row between"><b style="font-size:14px">${z.name}</b><span class="score">${z.score}</span></div><p class="muted" style="font-size:12.5px;margin-top:6px">${z.reason}</p></div>`).join("")}
      </div>
    </div>`;

    const mobility = `<div class="card" style="padding:22px">
      <div class="section-title"><h3>Mobility feed</h3><span class="badge gray">${icon("map",12)} RTA · mock</span></div>
      ${study.mobility.map(x => `<div class="feed-row"><div class="infra-ico impact-${x.impact}" style="width:34px;height:34px">${icon('map',16)}</div><div style="flex:1"><b style="font-size:13.5px">${x.name}</b> <span class="faint" style="font-size:12px">· ${x.status}</span><p class="muted" style="font-size:12.5px;margin-top:2px">${x.note}</p></div></div>`).join("")}
    </div>`;

    const legal = `<div class="card" style="padding:22px">
      <div class="section-title"><h3>Legal & buying process</h3></div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:18px">
        <div>${[["Ownership",m.legal.ownership],["Residency",m.legal.residency],["Commission norm",m.legal.commissionNorm]].map(r=>`<div style="margin-bottom:14px"><div class="faint up">${r[0]}</div><div style="font-size:13.5px;margin-top:3px">${r[1]}</div></div>`).join("")}</div>
        <div>
          <div class="faint up" style="margin-bottom:8px">Required documents</div>
          ${m.legal.documents.map(d=>`<div class="row gap-2" style="font-size:13px;margin-bottom:6px">${icon("check",15)}<span>${d}</span></div>`).join("")}
        </div>
      </div>
      <div class="faint up" style="margin:16px 0 10px">Buying steps</div>
      <div class="row gap-2 wrap">${m.legal.steps.map((st,i)=>`<span class="badge gray">${i+1}. ${st}</span>`).join('<span class="faint">→</span>')}</div>
    </div>`;

    // FREE = surface (sentiment + headline). PRO/PLUS = the deep study.
    const deep = ENT.lock(`<div class="stack gap-6">${charts}${infra}${txns}${mobility}${zones}${legal}</div>`,
      "marketStudyFull", { title:"Full Market Study is a Pro feature", sub:"Free shows the sentiment & headline. Pro unlocks the infrastructure tracker, live transactions, RTA road-impact, growth zones, legal process and deep ROI models — the moment you have a real client." });

    return U.shell("markets", `
      ${headerBar}
      <div class="page-head row between wrap gap-3" style="margin-top:4px">
        <div><h1>${m.flag} ${m.name} <span class="faint" style="font-size:16px;font-weight:400">· ${m.country}</span></h1><p>${m.positioning}</p></div>
        <div class="row gap-2"><a href="#/compare" class="btn btn-ghost btn-sm">${icon("layers",16)}Compare</a><a href="#/projects?market=${m.id}" class="btn btn-primary btn-sm">${icon("db",16)}View projects</a></div>
      </div>
      <div class="stack gap-6">${sentiment}${headline}${deep}</div>
    `);
  }

  /* ============================ COMPARE (cross-market) ============================ */
  function compare() {
    const rows = [
      ["Sentiment", m => `<span class="badge ${m.sentiment.label==='Bullish'?'green':m.sentiment.label==='Neutral'?'gold':'red'}">${m.sentiment.label} ${m.sentiment.score}</span>`],
      ["Avg / sqft (USD)", m => `$${m.headline.ppsfUSD}`],
      ["Gross yield", m => `<b style="color:hsl(var(--emerald))">${m.headline.yield}%</b>`],
      ["Capital appreciation", m => `${m.headline.appreciation}%`],
      ["YoY price growth", m => `+${m.headline.yoy}%`],
      ["Ownership", m => `<span style="font-size:12px">${m.legal.ownership.split(";")[0]}</span>`],
      ["Residency", m => `<span style="font-size:12px">${m.legal.residency.split(";")[0]}</span>`],
      ["Best for", m => `<span style="font-size:12px">${m.positioning.split(" · ")[0]}</span>`],
    ];
    const table = `<div class="card" style="padding:0;overflow-x:auto"><table class="table">
      <thead><tr><th>Metric</th>${D.markets.map(m=>`<th>${m.flag} ${m.name}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r=>`<tr><td class="muted">${r[0]}</td>${D.markets.map(m=>`<td>${r[1](m)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div>`;

    const yields = D.markets.map(m=>({label:m.name.split(" ")[0],value:m.headline.yield,color:"#10b981"}));
    const apprec = D.markets.map(m=>({label:m.name.split(" ")[0],value:m.headline.appreciation,color:"#f59e0b"}));

    const deep = ENT.lock(`<div class="card" style="padding:24px">
      <div class="section-title"><h3>Cross-market AI recommendation</h3><span class="badge gold">${icon("sparkles",12)} Plus</span></div>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px">
        <div><label class="lbl">Client budget (USD)</label><input class="input" id="cmpBudget" value="500,000"/></div>
        <div><label class="lbl">Primary goal</label><select class="select" id="cmpGoal"><option>Maximise rental yield</option><option>Capital appreciation</option><option>Lifestyle / second home</option><option>Affordable entry + residency</option></select></div>
      </div>
      <button class="btn btn-primary" id="cmpRun">${icon("sparkles",16)}Recommend a market</button>
      <div id="cmpOut" style="margin-top:18px"></div>
    </div>`, "compareDeep", { title:"Cross-market AI comparison is a Plus feature", sub:"Plus models the same client across Dubai, Bali, Georgia & Oman and recommends where their money works hardest." });

    return U.shell("compare", `
      <div class="page-head"><h1>Compare markets</h1><p>Side-by-side across all live markets. Free sees the matrix; Plus runs the AI recommendation for a specific client.</p></div>
      ${table}
      <div style="height:22px"></div>
      <div class="grid" style="grid-template-columns:1fr 1fr">
        <div class="card" style="padding:22px"><div class="section-title"><h3>Gross yield by market</h3></div>${C.bars(yields,{h:200})}</div>
        <div class="card" style="padding:22px"><div class="section-title"><h3>Capital appreciation</h3></div>${C.bars(apprec,{h:200})}</div>
      </div>
      <div style="height:22px"></div>
      ${deep}
    `);
  }

  /* ============================ PROJECTS (global catalogue) ============================ */
  function projectCard(p) {
    const m = D.marketById(p.market), cur = p.usd ? "USD" : "AED";
    return `<div class="card glass hover pcard reveal" data-project="${p.id}">
      <div class="media" style="background-image:linear-gradient(135deg,hsl(var(--emerald)/.25),hsl(220 40% 18%))">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'"/>
        <div class="tags">
          <div class="row gap-2">${p.featured?`<span class="badge gold">${icon("star",12)} Featured</span>`:""}<span class="badge ${p.status==='Ready'?'green':'gold'}">${p.status}</span></div>
          <span class="fav" data-fav>${icon("heart",17)}</span>
        </div>
        <span class="badge gray" style="position:absolute;bottom:12px;left:12px;background:rgba(0,0,0,.5);color:#fff">${m.flag} ${m.name}</span>
      </div>
      <div class="body">
        <div class="row between"><div class="faint" style="font-size:12px">${D.devById(p.dev).name}</div><span class="badge gray">${p.type}</span></div>
        <div style="font-weight:700;font-size:16px">${p.name}</div>
        <div class="muted row gap-2" style="font-size:13px">${icon("pin",14)}${p.district}</div>
        <div class="row between" style="margin-top:auto;padding-top:8px">
          <div><div class="faint" style="font-size:11px">From</div><div class="price">${cur} ${p.from}M</div></div>
          <div class="tar"><div class="faint" style="font-size:11px">ROI</div><div style="font-weight:700;color:hsl(var(--emerald))">${p.roi}%</div></div>
        </div>
      </div>
    </div>`;
  }
  function projects(param, query) {
    const marketSel = (query && query.market) || "";
    return U.shell("projects", `
      <div class="page-head row between wrap gap-3">
        <div><h1>Projects</h1><p>The full global catalogue — free to browse, always. <span id="pcount" class="muted"></span></p></div>
        ${window.DATA._live ? `<span class="badge green"><span class="dot live"></span> Live from Supabase</span>` : `<span class="badge green">${icon("eye",12)} Free: browse everything</span>`}
      </div>
      <div class="card" style="padding:16px;margin-bottom:22px"><div class="row gap-3 wrap">
        <div class="field-icon" style="flex:1;min-width:200px">${icon("search",17)}<input class="input" id="pq" placeholder="Search project or developer…"/></div>
        <select class="select" id="pmarket" style="width:auto"><option value="">All markets</option>${D.markets.map(m=>`<option value="${m.id}" ${m.id===marketSel?"selected":""}>${m.flag} ${m.name}</option>`).join("")}</select>
        <select class="select" id="pstatus" style="width:auto"><option value="">Any status</option><option>Off-plan</option><option>Ready</option></select>
        <select class="select" id="ptype" style="width:auto"><option value="">Any type</option><option>Apartment</option><option>Villa</option><option>Townhouse</option></select>
        <select class="select" id="psort" style="width:auto"><option value="featured">Sort: Featured</option><option value="roi">ROI</option><option value="price">Price ↑</option></select>
      </div></div>
      <div class="cards-grid" id="pgrid"></div>
    `);
  }
  function renderProjects() {
    const q = (document.getElementById("pq")?.value || "").toLowerCase();
    const mk = document.getElementById("pmarket")?.value || "";
    const st = document.getElementById("pstatus")?.value || "";
    const ty = document.getElementById("ptype")?.value || "";
    const sort = document.getElementById("psort")?.value || "featured";
    let list = D.projects.filter(p => (!q || p.name.toLowerCase().includes(q) || D.devById(p.dev).name.toLowerCase().includes(q)) && (!mk || p.market === mk) && (!st || p.status === st) && (!ty || p.type === ty));
    list.sort((a, b) => sort === "price" ? a.fromUSD - b.fromUSD : sort === "roi" ? b.roi - a.roi : (b.featured - a.featured) || (b.roi - a.roi));
    const grid = document.getElementById("pgrid");
    grid.innerHTML = list.length ? list.map(projectCard).join("") : `<div class="card" style="padding:40px;text-align:center;grid-column:1/-1"><p class="muted">No projects match.</p></div>`;
    document.getElementById("pcount").textContent = `${list.length} shown`;
    grid.querySelectorAll("[data-project]").forEach(card => card.onclick = (e) => {
      if (e.target.closest("[data-fav]")) { e.stopPropagation(); e.target.closest("[data-fav]").style.color = "hsl(0 80% 65%)"; U.toast("Saved to shortlist"); return; }
      openProject(card.getAttribute("data-project"));
    });
    U.observeReveals();
  }

  function openProject(id) {
    const p = D.projects.find(x => x.id === id); if (!p) return;
    const m = D.marketById(p.market), cur = p.usd ? "USD" : "AED";
    const plan = D.paymentPlans[p.plan] || D.paymentPlans.Cash;
    const inv = D.inventory[p.id];
    let invHTML = `<div class="card glass" style="padding:16px"><p class="muted" style="font-size:13px">Live unit inventory isn't published for this project yet.</p></div>`;
    if (inv) {
      const avail = inv.units.filter(u => u.status === "Available").length;
      const countBar = `<div class="row between" style="margin-bottom:10px"><b style="font-size:14px">Live availability</b><span class="badge green">${avail} of ${inv.units.length} available</span></div>`;
      if (ENT.can("inventory3D")) {
        invHTML = countBar + invStack(p.id, true) + `<div class="card glass" style="padding:11px;margin-top:10px;text-align:center"><span class="faint" style="font-size:12.5px">${icon("key",13)} Plus: click any available unit to see details & reserve</span></div><div id="unitPanel" style="margin-top:12px"></div>`;
      } else if (ENT.can("availabilityList")) {
        invHTML = countBar + invStack(p.id, false) + `<div class="card glass" style="padding:12px;margin-top:10px;text-align:center"><span class="faint" style="font-size:12.5px">Interactive pick-your-unit selection is a ${ENT.chipLock("plus")} feature</span></div>`;
      } else {
        invHTML = ENT.lock(countBar + invStack(p.id, false), "availabilityList", { need:"pro", title:"See unit-level availability", sub:"Free shows the headline count. Pro reveals every unit's status; Plus adds the interactive 3D selector." });
      }
    }

    U.openDrawer(`
      <div class="drawer-head"><h3>${p.name}</h3><button class="icon-btn" data-close>${icon("x",18)}</button></div>
      <div style="padding:22px;display:flex;flex-direction:column;gap:18px">
        <div class="media" style="aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,hsl(var(--emerald)/.25),hsl(220 40% 18%))"><img src="${p.img}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'"/></div>
        <div class="row gap-2 wrap">${p.featured?`<span class="badge gold">${icon("star",12)} Featured</span>`:""}<span class="badge ${p.status==='Ready'?'green':'gold'}">${p.status}</span><span class="badge blue">${m.flag} ${m.name}</span><span class="badge gray">${D.devById(p.dev).name}</span></div>
        <div class="row between"><div><div class="faint up">Starting price</div><div style="font-family:var(--font-display);font-size:28px;font-weight:800">${cur} ${p.from}M</div></div>
          <div class="tar"><div class="faint up">Projected ROI</div><div style="font-size:28px;font-weight:800;color:hsl(var(--emerald));font-family:var(--font-display)">${p.roi}%</div></div></div>
        <hr class="divider"/>
        <div class="grid" style="grid-template-columns:1fr 1fr;gap:14px">
          ${[["pin","District",p.district],["bed","Configuration",p.beds],["calendar","Handover",p.handover],["building","Units",p.units]].map(r=>`<div class="row gap-3"><div class="avatar-sm" style="background:hsl(var(--emerald)/.12);color:hsl(var(--emerald))">${icon(r[0],16)}</div><div><div class="faint" style="font-size:11.5px">${r[1]}</div><div style="font-weight:600;font-size:14px">${r[2]}</div></div></div>`).join("")}
        </div>
        <div>
          <div class="faint up" style="margin-bottom:8px">Payment plan · ${plan.label}</div>
          ${plan.schedule.map(s=>`<div class="row between" style="font-size:13px;padding:6px 0;border-bottom:1px solid hsl(var(--border))"><span class="muted">${s[0]}</span><b>${s[1]}</b></div>`).join("")}
        </div>
        ${invHTML}
        <div class="row gap-3">
          <button class="btn btn-primary btn-block" data-gen-proposal>${icon("file",17)}Generate proposal</button>
          <button class="btn btn-ghost" data-close>Close</button>
        </div>
      </div>`);
    const gp = document.querySelector("[data-gen-proposal]");
    if (gp) gp.onclick = () => { U.closeDrawer(); location.hash = "#/proposals"; };
    if (ENT.can("inventory3D") && inv) wireUnits(p.id);
  }

  /* ---------- 3D / stacked inventory ---------- */
  function invStack(projectId, interactive) {
    const inv = D.inventory[projectId]; if (!inv) return "";
    const floors = {};
    inv.units.forEach(u => { (floors[u.floor] = floors[u.floor] || []).push(u); });
    const rows = Object.keys(floors).map(Number).sort((a,b)=>a-b).map(f => `
      <div class="floor"><span class="floor-no">L${f}</span><div class="units">
        ${floors[f].map(u => `<div class="unit ${u.status} ${interactive?'':'noi'}" data-unit="${u.id}" title="${u.no} · ${u.status}">${u.status==="Sold"?"":u.beds+"B"}</div>`).join("")}
      </div></div>`).join("");
    return `<div class="building">${rows}</div>
      <div class="legend-3d"><span><i style="background:hsl(var(--emerald)/.85)"></i>Available</span><span><i style="background:hsl(var(--gold)/.85)"></i>Reserved</span><span><i style="background:hsl(var(--border))"></i>Sold</span></div>`;
  }
  function wireUnits(projectId) {
    const inv = D.inventory[projectId];
    document.querySelectorAll(`[data-unit]`).forEach(el => el.onclick = () => {
      const u = inv.units.find(x => x.id === el.getAttribute("data-unit"));
      if (!u || u.status === "Sold") { if (u && u.status === "Sold") U.toast("That unit is sold"); return; }
      document.querySelectorAll("[data-unit]").forEach(x => x.classList.remove("sel"));
      el.classList.add("sel");
      const panel = document.getElementById("unitPanel");
      const cur = (D.projects.find(p=>p.id===projectId).usd) ? "USD" : "AED";
      if (panel) panel.innerHTML = `
        <div class="card glass" style="padding:16px">
          <div class="row between"><b>Unit ${u.no}</b><span class="badge ${u.status==='Available'?'green':'gold'}">${u.status}</span></div>
          <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px;margin:12px 0">
            ${[["Floor","L"+u.floor],["Beds",u.beds+" BR"],["Size",u.size+" ft²"],["View",u.view],["Plan",u.plan],["Price",cur+" "+u.price+"M"]].map(r=>`<div><div class="faint" style="font-size:11px">${r[0]}</div><div style="font-weight:600;font-size:13.5px">${r[1]}</div></div>`).join("")}
          </div>
          <button class="btn btn-primary btn-sm btn-block" onclick="UI.toast('Unit ${u.no} reserved · sent to closing team')">${u.status==='Available'?'Reserve unit':'Request'}</button>
        </div>`;
    });
  }

  /* ============================ DASHBOARD (CRM home — inward) ============================ */
  function dashboard() {
    const nextViewing = isConn("gcal")
      ? `<div class="card glass" style="padding:16px;background:hsl(var(--emerald)/.08)"><div class="row gap-2" style="color:hsl(var(--emerald));margin-bottom:6px">${icon("calendar",16)}<b style="font-size:13px">Next viewing · Google Calendar</b></div><p style="font-size:13.5px">Tomorrow 11:00 — <b>James Whitfield</b>, Uluwatu villa (Zoom). Your 14:00 in Dubai = his 10:00 in London.</p></div>`
      : `<div class="card glass" style="padding:16px"><p class="muted" style="font-size:13px">Connect your calendar to see upcoming viewings here.</p><a href="#/integrations" class="btn btn-ghost btn-sm" style="margin-top:10px">Connect calendar</a></div>`;

    const kpis = `<div class="kpis">
      ${U.kpi({icon:"dollar",val:{text:"AED 28.5M"},label:"Open pipeline",trend:"+12%",up:true,spark:C.spark(D.myCommission)})}
      ${U.kpi({icon:"users",val:{text:"47",raw:47},label:"Active leads",trend:"+8",up:true,spark:C.spark([20,24,28,31,35,40,43,47])})}
      ${U.kpi({icon:"eye",val:{text:"12",raw:12},label:"Viewings this week",trend:"+3",up:true,spark:C.spark([4,6,5,8,7,10,9,12])})}
      ${U.kpi({icon:"trending",val:{text:"AED 128K"},label:"Commission (MTD)",trend:"+22%",up:true,spark:C.spark(D.myCommission)})}
    </div>`;

    const body = `<div class="grid" style="grid-template-columns:2fr 1fr;align-items:start">
      <div class="stack gap-6">
        <div class="card" style="padding:22px"><div class="section-title"><h3>My commission trend</h3><span class="badge gray">My data · CRM</span></div>${C.area(D.myCommission,{h:220,labels:D.months,zero:true})}</div>
        <div class="card" style="padding:22px"><div class="section-title"><h3>My conversion funnel</h3><span class="badge green">6.8% close rate</span></div>${C.funnel(D.myFunnel)}</div>
      </div>
      <div class="stack gap-6">
        ${nextViewing}
        <div class="card" style="padding:22px;background:linear-gradient(160deg,hsl(var(--emerald)/.12),hsl(var(--surface)))">
          <div class="row gap-2" style="color:hsl(var(--emerald));margin-bottom:10px">${icon("sparkles",18)}<b style="font-size:14px">AI nudge</b></div>
          <p style="font-size:14px;line-height:1.55">3 warm leads went quiet for 48h. Your <b>Bali</b> enquiries convert 2.3× better than average — want me to draft WhatsApp follow-ups?</p>
          <button class="btn btn-primary btn-sm" style="margin-top:14px" onclick="location.hash='#/ai'">Draft follow-ups</button>
        </div>
        <div class="card" style="padding:22px"><div class="section-title"><h3>Today's tasks</h3><a href="#/crm" class="badge gray">CRM</a></div>
          ${D.tasks.map(t=>`<div class="list-row"><div class="avatar-sm" style="background:hsl(var(--emerald)/.15);color:hsl(var(--emerald))">${icon(t.type==="call"?"phone":t.type==="whatsapp"?"whatsapp":t.type==="file"?"file":"calendar",16)}</div><div style="flex:1"><div style="font-weight:600;font-size:13.5px;${t.done?'text-decoration:line-through;opacity:.5':''}">${t.title}</div><div class="faint" style="font-size:12px">${t.sub}</div></div><div class="faint" style="font-size:11.5px;text-align:right">${t.due}</div></div>`).join("")}
        </div>
      </div>
    </div>`;

    return U.shell("dashboard", `
      <div class="page-head"><h1>Good evening, Abbii 👋</h1><p>Your business — leads, pipeline & commissions. <span class="muted">(Market intelligence lives in <a href="#/markets" style="color:hsl(var(--emerald))">Markets</a>.)</span></p></div>
      ${kpis}<div style="height:22px"></div>${body}
    `);
  }
  function stageColor(s){return ({"New Lead":"blue","Contacted":"violet","Viewing":"gold","Negotiation":"green","Closed Won":"green"})[s]||"gray";}

  /* ============================ CRM ============================ */
  function crm() {
    if (!ENT.can("crm")) {
      return U.shell("crm", `<div class="page-head"><h1>CRM & Leads</h1><p>Your personal pipeline — separate from market intelligence.</p></div>
        ${ENT.lock(`<div class="card" style="padding:30px">${crmInner()}</div>`, "crm", { need:"pro", title:"The CRM is where you operate", sub:"Free is for seeing & learning. The pipeline, lead scoring, WhatsApp capture and commission tracking are Pro — the moment you have live clients." })}`);
    }
    return U.shell("crm", `<div class="page-head row between wrap gap-3"><div><h1>CRM & Leads</h1><p>Your own deals — <b>not</b> market data. WhatsApp, calendar & e-sign woven in.</p></div><button class="btn btn-primary btn-sm">${icon("plus",16)}New lead</button></div>${crmInner()}`);
  }
  function crmInner() {
    const kpis = `<div class="kpis" style="margin-bottom:22px">
      ${U.kpi({icon:"dollar",val:{text:"AED 28.5M"},label:"Open pipeline",trend:"+12%",up:true})}
      ${U.kpi({icon:"target",val:{text:"6.8%",raw:6.8},suffix:"%",label:"Win rate",trend:"+1.2%",up:true})}
      ${U.kpi({icon:"briefcase",val:{text:"AED 3.6M"},label:"Avg deal",trend:"+5%",up:true})}
      ${U.kpi({icon:"award",val:{text:"23",raw:23},label:"Closed YTD",trend:"+9",up:true})}
    </div>`;
    const cols = Object.entries(D.pipeline).map(([stage,cards])=>`<div class="kcol"><div class="kcol-head"><b style="font-size:14px">${stage}</b><span class="count">${cards.length}</span></div>
      ${cards.map(c=>`<div class="kcard"><div class="row between"><div class="name">${c.name}</div><span class="badge ${c.score>=85?'green':c.score>=70?'gold':'gray'}">${c.score}</span></div>
        <div class="sub">${c.interest}</div>
        <div class="foot"><span class="mono" style="font-weight:700;font-size:12.5px">${c.budget}</span><span class="row gap-2">${isConn("whatsapp")?`<span title="WhatsApp connected" style="color:hsl(var(--emerald))">${icon("whatsapp",15)}</span>`:""}<span class="badge gray">${c.source}</span></span></div></div>`).join("")}
      <button class="btn btn-ghost btn-sm btn-block" style="margin-top:6px">${icon("plus",15)}Add</button></div>`).join("");
    const lead = isConn("whatsapp") ? `<div class="card glass" style="padding:14px;margin-bottom:18px;background:hsl(var(--emerald)/.07)"><div class="row gap-2" style="font-size:13px"><span style="color:hsl(var(--emerald))">${icon("whatsapp",16)}</span><b>WhatsApp connected</b><span class="muted">— new chats auto-create leads. Last: Omar Al Farsi, 2h ago.</span></div></div>` : "";
    const table = `<div class="card" style="padding:22px"><div class="section-title"><h3>All clients</h3><div class="field-icon" style="width:240px">${icon("search",16)}<input class="input" placeholder="Filter…" id="cq"/></div></div>
      <div style="overflow-x:auto"><table class="table" id="ctable"><thead><tr><th>Client</th><th>Market</th><th>Channel</th><th>Stage</th><th class="tar">Value</th><th class="tar">Last</th></tr></thead>
      <tbody>${D.clients.map(c=>`<tr><td><div class="row gap-3">${U.avatarInitials(c.name,c.color)}<div><div style="font-weight:600">${c.name}</div><div class="faint" style="font-size:12px">${c.email}</div></div></div></td><td class="muted">${c.market}</td><td>${c.wa&&isConn("whatsapp")?`<span style="color:hsl(var(--emerald))" title="WhatsApp">${icon("whatsapp",16)}</span>`:`<span class="faint">${icon("phone",15)}</span>`}</td><td><span class="badge ${stageColor(c.stage)}">${c.stage}</span></td><td class="tar mono" style="font-weight:600">${U.fmtCur(c.value,"")}</td><td class="tar faint">${c.last}</td></tr>`).join("")}</tbody></table></div></div>`;
    return `${kpis}${lead}<div class="section-title"><h3>Pipeline</h3><span class="faint" style="font-size:13px">Drag cards between stages</span></div><div class="kanban" style="margin-bottom:24px">${cols}</div>${table}`;
  }

  /* ============================ PROPOSALS ============================ */
  function proposals() {
    const used = parseInt(localStorage.getItem("ac-proposals") || "0", 10);
    const cap = ENT.value("proposalsPerMonth");
    const capped = cap !== Infinity && used >= cap;
    const meter = cap === Infinity ? `<span class="badge green">Unlimited</span>` : `<span class="badge ${capped?'red':'gold'}">${used}/${cap} this month</span>`;
    const gen = capped
      ? ENT.lock(`<div class="card" style="padding:24px">${proposalForm()}</div>`, "proposalsUnlimited", { need:"pro", title:"You've used your free proposals", sub:"Free includes 2 branded proposals a month. Pro is unlimited — generate as many client-ready decks as you close." })
      : `<div class="card" style="padding:24px">${proposalForm()}</div>`;
    return U.shell("proposals", `
      <div class="page-head row between wrap gap-3"><div><h1>Proposals</h1><p>Branded, client-ready decks in two minutes — in the client's currency & language.</p></div>${meter}</div>
      <div class="grid" style="grid-template-columns:1fr 1fr;align-items:start">${gen}<div id="propPreview" class="card glass" style="padding:24px;min-height:300px"><p class="muted" style="font-size:13px">Fill the form and generate to preview a branded proposal here.</p></div></div>
    `);
  }
  function proposalForm() {
    return `<h3 style="margin-bottom:16px">New proposal</h3>
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:14px">
        <div><label class="lbl">Client name</label><input class="input" id="prClient" value="James Whitfield"/></div>
        <div><label class="lbl">Market</label><select class="select" id="prMarket">${D.markets.map(m=>`<option value="${m.id}">${m.flag} ${m.name}</option>`).join("")}</select></div>
        <div><label class="lbl">Project</label><select class="select" id="prProject">${D.projects.map(p=>`<option value="${p.id}">${p.name}</option>`).join("")}</select></div>
        <div><label class="lbl">Client currency</label><select class="select" id="prCur"><option>USD</option><option>GBP</option><option>EUR</option><option>AED</option></select></div>
      </div>
      <button class="btn btn-primary btn-block" id="prGen" style="margin-top:18px">${icon("sparkles",16)}Generate proposal</button>`;
  }
  function genProposal() {
    const client = document.getElementById("prClient").value || "Client";
    const pid = document.getElementById("prProject").value;
    const cur = document.getElementById("prCur").value;
    const p = D.projects.find(x => x.id === pid), m = D.marketById(p.market);
    const used = parseInt(localStorage.getItem("ac-proposals") || "0", 10);
    localStorage.setItem("ac-proposals", String(used + 1));
    document.getElementById("propPreview").innerHTML = `
      <div class="row between" style="margin-bottom:14px"><div class="brand" style="padding:0">${UI.logoMark()}<span class="name" style="font-size:15px"><b>Agent</b>Connect</span></div><span class="badge gold">${icon("star",12)} Branded</span></div>
      <div class="faint up">Investment proposal prepared for</div>
      <h2 style="font-size:24px;margin:4px 0 14px">${client}</h2>
      <div class="card" style="padding:16px;margin-bottom:14px"><div style="font-weight:700;font-size:16px">${p.name}</div><div class="muted" style="font-size:13px">${m.flag} ${m.name} · ${p.district} · ${D.devById(p.dev).name}</div>
        <div class="grid" style="grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:12px">
          ${[["From",cur+" "+p.from+"M"],["Proj. ROI",p.roi+"%"],["Handover",p.handover]].map(r=>`<div><div class="faint" style="font-size:11px">${r[0]}</div><div style="font-weight:700">${r[1]}</div></div>`).join("")}
        </div></div>
      <div class="card glass" style="padding:14px;margin-bottom:14px"><div class="row gap-2" style="color:hsl(var(--emerald));font-size:13px;margin-bottom:4px">${icon("sparkles",15)}<b>Why this market</b></div><p style="font-size:13px">${m.name} sentiment is <b>${m.sentiment.label}</b> (${m.sentiment.score}/100). ${m.sentiment.rationale}</p></div>
      <button class="btn btn-primary btn-block" onclick="UI.toast('Proposal exported as branded PDF')">${icon("download",16)}Export PDF</button>`;
    UI.toast("Proposal generated");
    // refresh meter
    if (window.__rerender) {/* keep preview; meter updates on next visit */}
  }

  /* ============================ AI STUDIO ============================ */
  function ai() {
    const tools = [
      ["message","AI Chat Assistant","Ask anything about any market, project or strategy.","green","chat"],
      ["whatsapp","WhatsApp Concierge","24/7 auto-qualification & viewing booking.","green","toast"],
      ["phone","Cold-Calling Voice Bot","AI voice agent books warm leads.","gold","toast"],
      ["file","Proposal Generator","Branded decks in 2 minutes.","violet","prop"],
      ["send","Campaign Manager","Multi-channel, multi-market blasts.","blue","toast"],
      ["globe","Market Briefing","Daily AI digest across your markets.","green","toast"],
    ];
    const cards = tools.map(t => `<div class="card glass hover feat" data-tool="${t[4]}" style="cursor:pointer;padding:22px"><div class="row between"><div class="ico" style="width:46px;height:46px;margin-bottom:14px">${icon(t[0],22)}</div><span class="badge ${t[3]}">${t[3]==='gold'?'Gold':t[3]==='violet'?'Pro':'Live'}</span></div><h3 style="font-size:16px">${t[1]}</h3><p style="font-size:13.5px">${t[2]}</p><div class="row gap-2" style="color:hsl(var(--emerald));font-size:13px;font-weight:600;margin-top:14px">Open ${icon("arrowRight",15)}</div></div>`).join("");
    const chat = `<div class="card" style="padding:0;overflow:hidden"><div class="drawer-head" style="position:static"><div class="row gap-3"><div class="avatar" style="width:36px;height:36px;border-radius:10px">${icon("bot",18)}</div><div><b style="font-size:14px">Connect AI</b><div class="faint" style="font-size:12px;display:flex;align-items:center;gap:6px"><span class="dot live"></span>Online · multi-market analyst</div></div></div></div>
      <div class="chat"><div class="chat-log" id="chatLog"><div class="msg bot">Hi Abbii 👋 I'm your AI analyst across Dubai, Bali, Georgia & Oman. Ask me to compare markets, find ROI, or draft a client message.</div></div>
        <div class="row gap-2 wrap" style="padding:0 14px 4px" id="chips">${["Best yield: Bali vs Dubai?","Where for a $500k client wanting yield?","Draft a WhatsApp follow-up","Is now a good time for Oman?"].map(s=>`<button class="badge gray" style="cursor:pointer" data-chip>${s}</button>`).join("")}</div>
        <div class="chat-input"><input class="input" id="chatInput" placeholder="Ask Connect AI anything…"/><button class="btn btn-primary" id="chatSend">${icon("send",17)}</button></div></div></div>`;
    return U.shell("ai", `<div class="page-head"><h1>AI Studio</h1><p>Your automation crew — analyst, chat, voice, WhatsApp & content across every market.</p></div>
      <div class="grid" style="grid-template-columns:1.1fr 1fr;align-items:start"><div class="cards-grid" style="grid-template-columns:1fr 1fr">${cards}</div>${chat}</div>`);
  }
  const AI_REPLIES = {
    yield: "**Bali** leads on raw yield (~11.5% gross, up to 13% in Canggu) thanks to short-let tourism. **Dubai** is ~6.4% but with stronger liquidity, capital growth (+14% YoY) and freehold security. Yield play → Bali; balanced growth + safety → Dubai.",
    client: "For a **$500k yield-focused** client: **Bali (Uluwatu/Canggu villas)** — ~12% returns, but leasehold (25–30y) so factor exit. Runner-up: **Georgia (Batumi)** at ~11% with full freehold and a residency angle at $100k+. Want a cross-market proposal?",
    draft: "Draft:\n\n“Hi {name}, quick follow-up on the ${'{project}'} you liked 👋 The developer just opened a new payment plan and I've held a unit for you. Free for a 10-min call tomorrow? Happy to work around your timezone.”",
    oman: "**Oman** sentiment is Neutral (62/100) — emerging, lifestyle-led, thinner liquidity than Dubai but real upside: new ITC freehold zones, tax-free rent, and the Sultan Haitham City master plan. Good for patient appreciation, not quick flips.",
    default: "Across your four markets I'd weigh yield vs. growth vs. liquidity for the client's goal. I can run a cross-market comparison, pull projects, or draft the client message — which helps most?",
  };
  function aiReply(t) { t = t.toLowerCase();
    if (t.includes("yield") && (t.includes("bali") || t.includes("dubai") || t.includes("vs"))) return AI_REPLIES.yield;
    if (t.includes("500k") || t.includes("client") || t.includes("where for")) return AI_REPLIES.client;
    if (t.includes("draft") || t.includes("follow")) return AI_REPLIES.draft;
    if (t.includes("oman")) return AI_REPLIES.oman;
    return AI_REPLIES.default;
  }

  /* ============================ ACADEMY ============================ */
  function academy() {
    const cards = D.academy.map(a => {
      const locked = !a.free && !ENT.can("academyFull");
      return `<div class="card glass hover pcard reveal"><div class="media"><img src="${a.img}" loading="lazy" onerror="this.style.display='none'"/>
        <div class="tags"><span class="badge ${a.cat==='Sales'?'green':a.cat==='Automation'?'violet':a.cat==='Certification'?'gold':'blue'}">${a.cat}</span>${locked?ENT.chipLock("pro"):`<span class="fav" style="background:hsl(var(--emerald));color:#022;border:none">${icon("play",16)}</span>`}</div></div>
        <div class="body"><div class="row between faint" style="font-size:12px">${a.dur} · ${a.level}</div><div style="font-weight:600;font-size:15px">${a.title}</div>
        ${a.prog>0?`<div style="margin-top:auto;padding-top:8px"><div class="progress"><span style="width:${a.prog}%"></span></div><div class="faint" style="font-size:11.5px;margin-top:6px">${a.prog}% complete</div></div>`:`<button class="btn ${locked?'btn-outline':'btn-ghost'} btn-sm" style="margin-top:auto" ${locked?'onclick="location.hash=\'#/pricing\'"':''}>${locked?'Unlock with Pro':'Start course'}</button>`}</div></div>`;
    }).join("");
    const cert = `<div class="card" style="padding:0;overflow:hidden;margin-bottom:24px;display:grid;grid-template-columns:1.2fr 1fr">
      <div style="padding:32px;display:flex;flex-direction:column;justify-content:center"><span class="badge gold" style="width:max-content;margin-bottom:14px">${icon("award",13)} Certification</span>
        <h2 style="font-size:26px;margin-bottom:10px">Become an AgentConnect Certified Agent</h2>
        <p class="muted" style="font-size:14.5px;max-width:48ch">Certified agents get <b>preferred lead routing</b> from developers. Complete a market track, pass the assessment, earn the badge — and rank higher in lead distribution.</p>
        <div class="row gap-2" style="margin:18px 0"><span class="badge green">Dubai</span><span class="badge gray">Bali</span><span class="badge gray">Georgia</span><span class="badge gray">Oman</span></div>
        <button class="btn btn-primary" style="width:max-content" onclick="${ENT.can('academyFull')?"UI.toast('Starting Dubai certification…')":"location.hash='#/pricing'"}">${ENT.can('academyFull')?'Start certification':'Unlock with Pro'}</button>
      </div>
      <div style="background:linear-gradient(135deg,hsl(var(--gold)/.25),hsl(220 40% 18%))"></div></div>`;
    return U.shell("academy", `<div class="page-head"><h1>Academy</h1><p>Cross-border closing tactics, market playbooks & certification.</p></div>${cert}<div class="section-title"><h3>Courses</h3></div><div class="cards-grid">${cards}</div>`);
  }

  /* ============================ INTEGRATIONS HUB ============================ */
  function integrations() {
    const cats = [...new Set(D.connectors.map(c => c.cat))];
    const catIcon = { Communication:"message", Calendar:"calendar", Documents:"file", "Lead sources":"target", Finance:"dollar", Automation:"zap" };
    const sections = cats.map(cat => {
      const items = D.connectors.filter(c => c.cat === cat).map(c => {
        const allowed = c.tier === "plus" ? ENT.can("integrationsAll") : ENT.can("integrationsEveryday");
        const connected = isConn(c.id);
        const need = c.tier === "plus" ? "plus" : "pro";
        return `<div class="card glass int-card">
          <div class="top"><div class="int-logo">${icon(c.id==='whatsapp'?'whatsapp':c.id==='stripe'?'dollar':c.id==='maps'?'pin':c.cat==='Calendar'?'calendar':c.cat==='Documents'?'file':c.cat==='Lead sources'?'target':c.cat==='Automation'?'zap':'message',20)}</div>
            ${allowed?`<span class="row gap-2" style="font-size:11.5px;color:${connected?'hsl(var(--emerald))':'hsl(var(--faint))'}"><span class="conn-dot ${connected?'on':'off'}"></span>${connected?'Connected':'Not connected'}</span>`:ENT.chipLock(need)}</div>
          <div><div style="font-weight:600;font-size:14.5px">${c.name}</div><p class="faint" style="font-size:12.5px;margin-top:3px;line-height:1.45">${c.desc}</p></div>
          ${allowed
            ? `<button class="btn ${connected?'btn-ghost':'btn-outline'} btn-sm" data-conn="${c.id}">${connected?'Disconnect':(c.oauth?'Connect':'Enable')}</button>`
            : `<a href="#/pricing" class="btn btn-outline btn-sm">Upgrade to ${need==='plus'?'Plus':'Pro'}</a>`}
        </div>`;
      }).join("");
      return `<div class="int-cat"><h3>${icon(catIcon[cat]||"zap",16)} ${cat}</h3><div class="int-grid">${items}</div></div>`;
    }).join("");
    const connectedCount = D.connectors.filter(c => isConn(c.id)).length;
    return U.shell("integrations", `
      <div class="page-head row between wrap gap-3"><div><h1>Integrations</h1><p>Run your whole business without leaving AgentConnect. One connector framework, many tools — woven into the workflow.</p></div><span class="badge green">${connectedCount} connected</span></div>
      <div class="card glass" style="padding:16px;margin-bottom:8px"><div class="row gap-2 muted" style="font-size:13px">${icon("shield",16)}<span>Free: none · <b>Pro</b>: the everyday operating set · <b>Plus</b>: the full hub incl. payments, video, translation & Zapier/API.</span></div></div>
      ${sections}
    `);
  }

  /* ============================ DEVELOPER PORTAL ============================ */
  function developer() {
    const dev = D.developers[0];
    const myProjects = D.projects.filter(p => D.devById(p.dev).market === "dubai").slice(0, 5);
    const kpis = `<div class="metric-row" style="margin-bottom:22px">
      ${U.kpi({icon:"eye",val:{text:"24.6k",},label:"Project views (30d)",trend:"+18%",up:true})}
      ${U.kpi({icon:"target",val:{text:"312",raw:312},label:"Qualified leads",trend:"+41",up:true})}
      ${U.kpi({icon:"star",val:{text:"3",raw:3},label:"Featured slots",trend:null})}
      ${U.kpi({icon:"dollar",val:{text:"AED 1.2M"},label:"Lead-routing spend",trend:null})}
    </div>`;
    const projRows = myProjects.map(p => `<tr><td style="font-weight:600">${p.name}</td><td class="muted">${p.district}</td><td><span class="badge ${p.status==='Ready'?'green':'gold'}">${p.status}</span></td><td>${p.sold}% sold</td>
      <td class="tar"><button class="btn ${p.featured?'btn-primary':'btn-outline'} btn-sm" data-feature="${p.id}">${p.featured?'★ Featured':'Boost'}</button></td></tr>`).join("");
    return U.shell("developer", `
      <div class="page-head row between wrap gap-3"><div><h1>Developer Portal <span class="badge green" style="vertical-align:middle">${icon("shield",12)} Verified</span></h1><p>${dev.name} — manage your profile, projects, featured placement & incoming leads.</p></div><button class="btn btn-primary btn-sm">${icon("plus",16)}Add project</button></div>
      ${kpis}
      <div class="grid" style="grid-template-columns:2fr 1fr;align-items:start">
        <div class="card" style="padding:22px"><div class="section-title"><h3>My projects</h3><span class="faint" style="font-size:12px">Boost = sponsored placement in search & market pages</span></div>
          <table class="table"><thead><tr><th>Project</th><th>District</th><th>Status</th><th>Sales</th><th class="tar">Placement</th></tr></thead><tbody>${projRows}</tbody></table></div>
        <div class="card" style="padding:22px"><div class="section-title"><h3>Incoming leads</h3></div>
          ${D.leadRouting.map(l=>`<div class="list-row"><div class="avatar-sm" style="background:hsl(var(--emerald)/.14);color:hsl(var(--emerald))">${icon("user",16)}</div><div style="flex:1"><div style="font-weight:600;font-size:13.5px">${l.lead}</div><div class="faint" style="font-size:12px">${l.market} · ${l.reason}</div></div><span class="badge ${l.status==='Accepted'?'green':'gold'}">${l.status}</span></div>`).join("")}
          <div class="card glass" style="padding:14px;margin-top:14px;background:hsl(var(--emerald)/.07)"><p style="font-size:12.5px" class="muted">Leads route to <b>certified</b> agents first — the certification flywheel that tightens the network.</p></div>
        </div>
      </div>`);
  }

  /* ============================ INVENTORY DESK (back-office) ============================ */
  function inventory() {
    const projs = Object.keys(D.inventory).map(id => D.projects.find(p => p.id === id)).filter(Boolean);
    const opts = projs.map(p => `<option value="${p.id}">${p.name} (${D.marketById(p.market).name})</option>`).join("");
    return U.shell("inventory", `
      <div class="page-head"><h1>Inventory Desk</h1><p>Back-office role — the Inventory Team (and later developers) keep unit availability live across the platform.</p></div>
      <div class="card" style="padding:16px;margin-bottom:18px"><div class="row gap-3 wrap center"><label class="lbl" style="margin:0">Project</label><select class="select" id="invProj" style="width:auto">${opts}</select><span class="faint" style="font-size:12.5px">Click a status cell to cycle Available → Reserved → Sold</span></div></div>
      <div id="invTableWrap"></div>
    `);
  }
  function renderInvTable() {
    const id = document.getElementById("invProj").value;
    const inv = D.inventory[id]; const p = D.projects.find(x => x.id === id);
    const cur = p.usd ? "USD" : "AED";
    const counts = { Available:0, Reserved:0, Sold:0 };
    inv.units.forEach(u => counts[u.status]++);
    const rows = inv.units.slice().sort((a,b)=>b.floor-a.floor||a.no.localeCompare(b.no)).map(u => `<tr>
      <td style="font-weight:600">${u.no}</td><td class="muted">L${u.floor}</td><td>${u.beds} BR</td><td class="mono">${u.size} ft²</td><td class="muted">${u.view}</td><td class="mono">${cur} ${u.price}M</td>
      <td class="tar"><button class="badge ${u.status==='Available'?'green':u.status==='Reserved'?'gold':'gray'}" data-cycle="${u.id}" style="cursor:pointer">${u.status}</button></td></tr>`).join("");
    document.getElementById("invTableWrap").innerHTML = `
      <div class="row gap-3 wrap" style="margin-bottom:14px">
        <span class="badge green">${counts.Available} Available</span><span class="badge gold">${counts.Reserved} Reserved</span><span class="badge gray">${counts.Sold} Sold</span></div>
      <div class="card" style="padding:0;overflow-x:auto"><table class="table"><thead><tr><th>Unit</th><th>Floor</th><th>Beds</th><th>Size</th><th>View</th><th>Price</th><th class="tar">Status</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    document.querySelectorAll("[data-cycle]").forEach(b => b.onclick = () => {
      const u = inv.units.find(x => x.id === b.getAttribute("data-cycle"));
      const order = ["Available","Reserved","Sold"]; u.status = order[(order.indexOf(u.status)+1)%3];
      renderInvTable(); UI.toast(`Unit ${u.no} → ${u.status} (live across platform)`);
    });
  }

  /* ============================ ADMIN & LEDGER ============================ */
  function admin() {
    const ledgerRows = D.commissionLedger.map(l => `<tr><td class="faint">${l.date.slice(5)}</td><td style="font-weight:600">${l.deal}</td><td class="muted">${l.agent}</td><td class="mono">${l.cur} ${l.gross}M</td><td>${l.rate}%</td><td class="mono" style="font-weight:600">${l.cur} ${l.fee}M</td><td><span class="badge ${l.status==='Cleared'?'green':'gold'}">${l.status}</span></td></tr>`).join("");
    return U.shell("admin", `
      <div class="page-head"><h1>Admin & Commission Ledger</h1><p>The three revenue rails: agent subscriptions, developer/featured/lead money, and the deal-commission ledger.</p></div>
      <div class="metric-row" style="margin-bottom:22px">
        ${U.kpi({icon:"users",val:{text:"4,210",},label:"Agents (Pro+Plus)",trend:"+312",up:true})}
        ${U.kpi({icon:"briefcase",val:{text:"38",raw:38},label:"Verified developers",trend:"+5",up:true})}
        ${U.kpi({icon:"star",val:{text:"12",raw:12},label:"Featured slots sold",trend:null})}
        ${U.kpi({icon:"dollar",val:{text:"AED 0.12M"},label:"Commission (MTD)",trend:"+18%",up:true})}
      </div>
      <div class="grid" style="grid-template-columns:1fr 1fr;align-items:start">
        <div class="card" style="padding:22px"><div class="section-title"><h3>Revenue mix</h3></div>${C.donut([{label:"Subscriptions",value:46,color:"hsl(var(--chart-1))"},{label:"Developer / featured",value:38,color:"hsl(var(--chart-3))"},{label:"Deal commission",value:16,color:"hsl(var(--chart-4))"}],{center:"3",sub:"rails"})}<div class="legend" style="justify-content:center;margin-top:12px"><span><i style="background:hsl(var(--chart-1))"></i>Subscriptions 46%</span><span><i style="background:hsl(var(--chart-3))"></i>Developer 38%</span><span><i style="background:hsl(var(--chart-4))"></i>Commission 16%</span></div></div>
        <div class="card" style="padding:22px"><div class="section-title"><h3>Lead routing</h3></div>${D.leadRouting.map(l=>`<div class="list-row"><div style="flex:1"><div style="font-weight:600;font-size:13.5px">${l.lead} → ${l.routedTo}</div><div class="faint" style="font-size:12px">${l.market} · ${l.reason}</div></div><span class="badge ${l.status==='Accepted'?'green':'gold'}">${l.status}</span></div>`).join("")}</div>
      </div>
      <div style="height:22px"></div>
      <div class="card" style="padding:22px"><div class="section-title"><h3>Commission ledger</h3><span class="badge gray">~10% on platform deals</span></div>
        <div style="overflow-x:auto"><table class="table"><thead><tr><th>Date</th><th>Deal</th><th>Agent</th><th>Gross</th><th>Rate</th><th>Fee</th><th>Status</th></tr></thead><tbody>${ledgerRows}</tbody></table></div></div>
    `);
  }

  /* ============================ PRICING ============================ */
  function pricing() {
    const cur = ENT.tier();
    const planCards = D.plans.map(p => `<div class="card glass plan ${p.popular?"popular":""} reveal">
      ${p.popular?'<span class="pop">Most popular</span>':''}
      <div class="row gap-3" style="margin-bottom:6px"><div class="ico" style="width:42px;height:42px;border-radius:11px;display:grid;place-content:center;background:${p.id==='plus'?'hsl(var(--gold)/.14)':'hsl(var(--emerald)/.12)'};color:${p.id==='plus'?'hsl(var(--gold))':'hsl(var(--emerald))'}">${icon(p.icon,20)}</div><div><div class="pname">${p.name}</div><div class="faint" style="font-size:12.5px">${p.blurb}</div></div></div>
      <div class="pprice">${p.price===0?"Free":"$"+p.price}<span class="faint" style="font-size:14px;font-weight:400">${p.price?"/mo":""}</span></div>
      ${p.id==='pro'?'<div class="badge green" style="margin-bottom:8px">Pays for itself in one closing</div>':'<div style="height:8px"></div>'}
      <ul>${p.features.map(f=>`<li>${icon("check",17)}<span>${f}</span></li>`).join("")}</ul>
      <button class="btn ${p.popular?'btn-primary':'btn-outline'} btn-block" data-pick="${p.id}">${cur===p.id?'Current plan':(p.price?'Start free trial':'Get started')}</button>
    </div>`).join("");
    const faqs = [
      ["Why is Analytics about the market, not me?","Market Intelligence is an outward study of a market — sentiment, infrastructure, transactions, growth zones. Your own leads, pipeline and commissions live separately in the CRM."],
      ["Do you really cover multiple countries?","Yes — Dubai, Bali, Georgia and Oman are live today, with Saudi Arabia, Qatar, Türkiye, Cyprus, the UK and Europe rolling out next."],
      ["What's gated vs free?","Free lets you see & learn — browse every market and project. Pro & Plus let you operate & win: full market studies, CRM, unlimited proposals, integrations and (Plus) the 3D inventory selector."],
      ["I'm a developer, not an agent.","See the Developer Portal — verified profiles, featured placement and qualified-lead routing. Contact us for supply-side plans."],
    ];
    return U.marketingNav() + `<section class="section" style="padding-top:140px"><div class="container">
      <div class="section-head reveal"><div class="chip" style="margin:0 auto 18px"><span class="dot live"></span>7-day free trial · no card</div><h2>Free to learn. Pay to win.</h2><p>The paywall sits at the moment of money — when you have a live client and need to act.</p></div>
      <div class="price-grid" style="margin-bottom:30px">${planCards}</div>
      <div class="card glass" style="padding:18px;text-align:center;max-width:760px;margin:0 auto 64px"><span class="muted" style="font-size:13.5px">${icon("briefcase",15)} Developers & brokerages: verified profiles, featured placement, lead routing & multi-seat — <a href="#/developer" style="color:hsl(var(--emerald))">see the Developer Portal</a> or contact sales.</span></div>
      <div class="section-head reveal" style="margin-bottom:28px"><h2 style="font-size:32px">Questions</h2></div>
      <div class="grid" style="max-width:760px;margin:0 auto;gap:14px">${faqs.map(f=>`<div class="card glass reveal" style="padding:22px"><h3 style="font-size:16px;margin-bottom:8px">${f[0]}</h3><p class="muted" style="font-size:14px">${f[1]}</p></div>`).join("")}</div>
    </div></section>` + U.footer();
  }

  /* ============================ SETTINGS ============================ */
  function settings() {
    return U.shell("settings", `
      <div class="page-head"><h1>Settings</h1><p>Profile, plan, preferences & connected tools.</p></div>
      <div class="grid" style="grid-template-columns:1fr 1fr;align-items:start">
        <div class="card" style="padding:24px"><h3 style="margin-bottom:18px">Profile</h3>
          <div class="row gap-3" style="margin-bottom:20px"><div class="avatar" style="width:56px;height:56px;border-radius:16px;font-size:18px">AB</div><button class="btn btn-ghost btn-sm">Change photo</button></div>
          <div class="grid" style="grid-template-columns:1fr 1fr">
            <div><label class="lbl">Full name</label><input class="input" value="Abbii Farooq"/></div>
            <div><label class="lbl">Role</label><input class="input" value="International Broker"/></div>
            <div><label class="lbl">Email</label><input class="input" value="abbiifarooq@gmail.com"/></div>
            <div><label class="lbl">Home market</label><select class="select"><option>🇬🇧 United Kingdom</option><option>🇦🇪 UAE</option><option>🇵🇰 Pakistan</option><option>🇫🇷 France</option></select></div>
          </div>
          <button class="btn btn-primary" style="margin-top:18px" onclick="UI.toast('Profile saved')">Save changes</button>
        </div>
        <div class="stack gap-6">
          <div class="card" style="padding:24px"><h3 style="margin-bottom:18px">Plan & preferences</h3>
            <div class="row between" style="margin-bottom:16px"><div><div style="font-weight:600;font-size:14px">Current plan</div><div class="faint" style="font-size:12.5px">Switch any time</div></div>${ENT.tierSwitcher()}</div>
            <div class="row between" style="margin-bottom:16px"><div><div style="font-weight:600;font-size:14px">Theme</div><div class="faint" style="font-size:12.5px">Dark or light</div></div><div class="seg"><button data-set-theme="dark" class="active">Dark</button><button data-set-theme="light">Light</button></div></div>
            <hr class="divider" style="margin:8px 0 16px"/>
            ${toggleRow("New-lead alerts","Instant pings from connected channels",true)}
            ${toggleRow("Weekly market digest","Top movers across your markets",true)}
          </div>
          <div class="card" style="padding:24px"><div class="row between" style="margin-bottom:6px"><h3>Connected tools</h3><a href="#/integrations" class="badge gray">Manage</a></div>
            <p class="faint" style="font-size:13px;margin-bottom:14px">Integrations are managed in the hub and woven through your workflow.</p>
            ${D.connectors.filter(c=>isConn(c.id)).map(c=>`<div class="list-row"><div class="avatar-sm" style="background:hsl(var(--emerald)/.12);color:hsl(var(--emerald))">${icon("check",16)}</div><div style="flex:1;font-weight:600;font-size:14px">${c.name}</div><span class="badge green">Connected</span></div>`).join("") || '<p class="muted" style="font-size:13px">Nothing connected yet.</p>'}
          </div>
        </div>
      </div>`);
  }
  function toggleRow(t, s, on) {
    return `<div class="row between" style="margin-bottom:14px"><div><div style="font-weight:600;font-size:14px">${t}</div><div class="faint" style="font-size:12.5px">${s}</div></div>
      <button class="tog ${on?"on":""}" data-toggle style="width:46px;height:26px;border-radius:99px;background:${on?"hsl(var(--emerald))":"hsl(var(--border))"};position:relative;transition:.2s"><span style="position:absolute;top:3px;left:${on?"23px":"3px"};width:20px;height:20px;border-radius:99px;background:#fff;transition:.2s"></span></button></div>`;
  }

  /* ============================ INITS ============================ */
  function initLanding() {
    const el = document.getElementById("heroRot"); if (!el) return;
    const phrases = [
      "Study any market like a local analyst",
      "Compare Dubai, Bali, Georgia & Oman in seconds",
      "Send a branded proposal in two minutes",
      "Capture & qualify leads while you sleep",
      "One desk for every market on earth",
    ];
    let i = 0;
    if (window.__heroRotTimer) clearInterval(window.__heroRotTimer);   // avoid stacking intervals across renders
    window.__heroRotTimer = setInterval(() => {
      i = (i + 1) % phrases.length;
      el.style.opacity = "0"; el.style.transform = "translateY(8px)";
      setTimeout(() => { el.textContent = phrases[i]; el.style.opacity = "1"; el.style.transform = "none"; }, 380);
    }, 2800);
  }
  function initProjects() {
    ["pq","pmarket","pstatus","ptype","psort"].forEach(id => { const e=document.getElementById(id); if(e) e.oninput = renderProjects; });
    renderProjects();
  }
  function initCRM() {
    if (!ENT.can("crm")) return;
    const cq = document.getElementById("cq");
    if (cq) cq.oninput = () => { const q=cq.value.toLowerCase(); document.querySelectorAll("#ctable tbody tr").forEach(tr=>tr.style.display=tr.textContent.toLowerCase().includes(q)?"":"none"); };
    let dragged=null;
    document.querySelectorAll(".kcard").forEach(c => { c.setAttribute("draggable","true");
      c.addEventListener("dragstart",()=>{dragged=c;setTimeout(()=>c.style.opacity=".4",0);});
      c.addEventListener("dragend",()=>c.style.opacity="1"); });
    document.querySelectorAll(".kcol").forEach(col => {
      col.addEventListener("dragover",e=>{e.preventDefault();col.style.background="hsl(var(--emerald)/.06)";});
      col.addEventListener("dragleave",()=>col.style.background="");
      col.addEventListener("drop",e=>{e.preventDefault();col.style.background="";if(dragged){col.insertBefore(dragged,col.querySelector("button"));UI.toast("Lead moved · pipeline updated");}});
    });
  }
  function initAI() {
    const log=document.getElementById("chatLog"),input=document.getElementById("chatInput"),send=document.getElementById("chatSend");
    function add(text,who){const m=document.createElement("div");m.className="msg "+who;m.innerHTML=text.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\n/g,"<br>");log.appendChild(m);log.scrollTop=log.scrollHeight;}
    function ask(text){if(!text.trim())return;add(text,"me");input.value="";const t=document.createElement("div");t.className="msg bot typing";t.innerHTML="<span></span><span></span><span></span>";log.appendChild(t);log.scrollTop=log.scrollHeight;setTimeout(()=>{t.remove();add(aiReply(text),"bot");},800);}
    if(send)send.onclick=()=>ask(input.value);
    if(input)input.onkeydown=e=>{if(e.key==="Enter")ask(input.value);};
    document.querySelectorAll("[data-chip]").forEach(c=>c.onclick=()=>ask(c.textContent));
    document.querySelectorAll("[data-tool]").forEach(card=>card.onclick=()=>{const k=card.getAttribute("data-tool");if(k==="chat")input.focus();else if(k==="prop")location.hash="#/proposals";else UI.toast(card.querySelector("h3").textContent+" — opening…");});
  }
  function initProposals() { const b=document.getElementById("prGen"); if(b) b.onclick=genProposal; }
  function initCompare() {
    const run=document.getElementById("cmpRun");
    if(run) run.onclick=()=>{
      const goal=document.getElementById("cmpGoal").value;
      let pick, why;
      if(goal.includes("yield")){pick=D.marketById("bali");why="highest gross yields (~11.5%) from short-let tourism demand. Note leasehold structure.";}
      else if(goal.includes("appreciation")){pick=D.marketById("dubai");why="strongest liquidity and +14% YoY capital growth with freehold security.";}
      else if(goal.includes("Lifestyle")){pick=D.marketById("oman");why="emerging waterfront ITC living with long-term upside and residency.";}
      else {pick=D.marketById("georgia");why="lowest entry, ~11% yields and residency eligibility at $100k+.";}
      document.getElementById("cmpOut").innerHTML=`<div class="card glass" style="padding:16px;background:hsl(var(--emerald)/.07)"><div class="row gap-2" style="color:hsl(var(--emerald));margin-bottom:6px">${icon("sparkles",16)}<b style="font-size:14px">Recommendation: ${pick.flag} ${pick.name}</b></div><p style="font-size:13.5px">For this client, <b>${pick.name}</b> fits best — ${why} Sentiment ${pick.sentiment.label} (${pick.sentiment.score}/100).</p><a href="#/market/${pick.id}" class="btn btn-ghost btn-sm" style="margin-top:12px">Open ${pick.name} study ${icon("arrowRight",15)}</a></div>`;
    };
  }
  function initIntegrations() {
    document.querySelectorAll("[data-conn]").forEach(b => b.onclick = () => { const id=b.getAttribute("data-conn"); toggleConn(id); UI.toast((isConn(id)?"Connected ":"Disconnected ")+(D.connectors.find(c=>c.id===id).name)); if(window.__rerender)window.__rerender(); });
  }
  function initDeveloper() {
    document.querySelectorAll("[data-feature]").forEach(b => b.onclick = () => { const p=D.projects.find(x=>x.id===b.getAttribute("data-feature")); p.featured=!p.featured; UI.toast(p.featured?"Boosted — now featured in search":"Featured placement removed"); if(window.__rerender)window.__rerender(); });
  }
  function initInventory() { const sel=document.getElementById("invProj"); if(sel){sel.onchange=renderInvTable;renderInvTable();} }
  function initSettings() {
    document.querySelectorAll("[data-set-theme]").forEach(b=>b.onclick=()=>{const th=b.getAttribute("data-set-theme");document.documentElement.setAttribute("data-theme",th);localStorage.setItem("ac-theme",th);document.querySelectorAll("[data-set-theme]").forEach(x=>x.classList.toggle("active",x===b));UI.syncThemeIcons();});
    document.querySelectorAll("[data-toggle]").forEach(t=>t.onclick=()=>{const on=!t.classList.contains("on");t.classList.toggle("on",on);t.style.background=on?"hsl(var(--emerald))":"hsl(var(--border))";t.querySelector("span").style.left=on?"23px":"3px";});
  }

  return {
    "":         { marketing:true, render:landing, init:initLanding },
    home:       { marketing:true, render:landing, init:initLanding },
    markets:    { render:markets },
    market:     { render:marketStudy },           // #/market/:id
    compare:    { render:compare, init:initCompare },
    projects:   { render:projects, init:initProjects },
    dashboard:  { render:dashboard },
    crm:        { render:crm, init:initCRM },
    proposals:  { render:proposals, init:initProposals },
    ai:         { render:ai, init:initAI },
    academy:    { render:academy },
    integrations:{ render:integrations, init:initIntegrations },
    developer:  { render:developer, init:initDeveloper },
    inventory:  { render:inventory, init:initInventory },
    admin:      { render:admin },
    pricing:    { marketing:true, render:pricing },
    settings:   { render:settings, init:initSettings },
  };
})();
