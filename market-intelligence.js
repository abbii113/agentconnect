/* =====================================================================
   Market Intelligence Engine
   Mirrors the planned /lib/market-intelligence/ TypeScript module.
   Every external source sits behind a clean adapter interface, so a mock
   feed and a live feed are interchangeable — swap mock→live with ZERO
   UI refactor. The sentiment engine is promptable (LLM-ready).
   ===================================================================== */
window.MI = (function () {
  const D = window.DATA;

  /* ---------- SOURCE ADAPTERS (interface: get<X>(market) -> data) ---------- */

  // sources/dld.adapter — Dubai Land Department (recent recorded transactions)
  const dldAdapter = {
    id: "dld",
    label: "Land Department",
    // TODO: swap to live DLD API (https transactions endpoint). Same return shape.
    getRecentTransactions(marketId) {
      const m = D.marketById(marketId);
      return (m && m.transactions) || [];
    },
  };

  // sources/rta.adapter — Roads & Transport Authority (mobility / infrastructure)
  const rtaAdapter = {
    id: "rta",
    label: "Roads & Transport",
    // TODO: swap to live RTA / national transport-authority API. Same return shape.
    getMobility(marketId) {
      const m = D.marketById(marketId);
      return (m && m.mobility) || [];
    },
    getInfrastructure(marketId) {
      const m = D.marketById(marketId);
      return (m && m.infrastructure) || [];
    },
  };

  /* ---------- SENTIMENT ENGINE (the AI analyst) ----------
     Today: returns the curated mock study + sentiment.
     Later: buildPrompt() feeds real adapter data into an LLM call and the
     model returns { label, score, rationale }. The rest of the app is agnostic. */
  const sentimentEngine = {
    // promptable surface — what the live LLM call will receive
    buildPrompt(marketId, feeds) {
      const m = D.marketById(marketId);
      return [
        `You are a senior real-estate market analyst. Assess the ${m.name} (${m.country}) market.`,
        `Headline: avg ${m.headline.ppsf}/sqft, YoY ${m.headline.yoy}%, yield ${m.headline.yield}%, appreciation ${m.headline.appreciation}%.`,
        `Recent transactions: ${JSON.stringify(feeds.transactions).slice(0, 500)}`,
        `Infrastructure: ${JSON.stringify(feeds.infrastructure).slice(0, 500)}`,
        `Return strictly JSON: { "label": "Bullish|Neutral|Bearish", "score": 0-100, "rationale": "2 sentences" }.`,
      ].join("\n");
    },
    analyze(marketId, feeds) {
      // TODO: replace with LLM call over buildPrompt(marketId, feeds).
      const m = D.marketById(marketId);
      return m.sentiment;
    },
  };

  /* ---------- ORCHESTRATOR: marketStudy.service ----------
     Pulls every source into one Market Study object the UI renders. */
  function getStudy(marketId) {
    const m = D.marketById(marketId);
    if (!m) return null;
    const feeds = {
      transactions: dldAdapter.getRecentTransactions(marketId),
      mobility: rtaAdapter.getMobility(marketId),
      infrastructure: rtaAdapter.getInfrastructure(marketId),
    };
    const sentiment = sentimentEngine.analyze(marketId, feeds);
    return {
      market: m,
      generatedAt: new Date().toISOString(),
      sources: [
        { id: dldAdapter.id, label: dldAdapter.label, live: false },
        { id: rtaAdapter.id, label: rtaAdapter.label, live: false },
        { id: "ai", label: "AI Analyst", live: false },
      ],
      sentiment,
      headline: m.headline,
      priceTrend: m.priceTrend,
      volumeTrend: m.volumeTrend,
      districts: m.districts,
      infrastructure: feeds.infrastructure,
      transactions: feeds.transactions,
      mobility: feeds.mobility,
      growthZones: m.growthZones,
      legal: m.legal,
    };
  }

  return { dldAdapter, rtaAdapter, sentimentEngine, getStudy };
})();
