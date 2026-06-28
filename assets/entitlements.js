/* AgentConnect — entitlements: ONE source of truth, keyed by tier (not scattered ifs).
   Gate both UI (here) and API (same map would import server-side in the Next.js port). */
window.ENT = (function () {
  // entitlements[tier] = { feature: bool }
  const entitlements = {
    free: {
      browseCatalogue: true, marketOverview: true, compareBasic: true,
      marketStudyFull: false, compareDeep: false,
      proposalsUnlimited: false, proposalsPerMonth: 2,
      crm: false, academyFull: false,
      integrationsEveryday: false, integrationsAll: false,
      availabilityCount: true, availabilityList: false, inventory3D: false,
      crossMarketAI: false, onCallSupport: false, multiSeat: false,
      developerConnect: false,
    },
    pro: {
      browseCatalogue: true, marketOverview: true, compareBasic: true,
      marketStudyFull: true, compareDeep: false,
      proposalsUnlimited: true, proposalsPerMonth: Infinity,
      crm: true, academyFull: true,
      integrationsEveryday: true, integrationsAll: false,
      availabilityCount: true, availabilityList: true, inventory3D: false,
      crossMarketAI: false, onCallSupport: false, multiSeat: false,
      developerConnect: true,
    },
    plus: {
      browseCatalogue: true, marketOverview: true, compareBasic: true,
      marketStudyFull: true, compareDeep: true,
      proposalsUnlimited: true, proposalsPerMonth: Infinity,
      crm: true, academyFull: true,
      integrationsEveryday: true, integrationsAll: true,
      availabilityCount: true, availabilityList: true, inventory3D: true,
      crossMarketAI: true, onCallSupport: true, multiSeat: true,
      developerConnect: true,
    },
  };

  const TIER_META = {
    free: { label: "Free", color: "var(--muted)" },
    pro:  { label: "Pro",  color: "var(--emerald)" },
    plus: { label: "Plus", color: "var(--gold)" },
  };

  function tier() { return localStorage.getItem("ac-tier") || "free"; }
  function setTier(t) { localStorage.setItem("ac-tier", t); }
  function can(feature) { return !!entitlements[tier()][feature]; }
  function value(feature) { return entitlements[tier()][feature]; }
  // minimum tier that unlocks a feature (for upgrade CTAs)
  function requiredTier(feature) {
    if (entitlements.pro[feature] === true && entitlements.free[feature] !== true) return "pro";
    if (entitlements.plus[feature] === true) return "plus";
    return "pro";
  }

  /* Lock overlay: wrap gated content. Shows a blurred teaser + upgrade CTA. */
  function lock(innerHTML, feature, opts) {
    opts = opts || {};
    if (can(feature)) return innerHTML;
    const need = opts.need || requiredTier(feature);
    const meta = TIER_META[need];
    return `<div class="locked">
      <div class="locked-blur">${innerHTML}</div>
      <div class="locked-veil">
        <div class="lock-badge">${icon("key",16)} ${meta.label} feature</div>
        <div class="lock-title">${opts.title || "Unlock the full picture"}</div>
        <p class="lock-sub">${opts.sub || "This is gated to the " + meta.label + " plan — the moment of money. See & learn is free; operating & winning is " + meta.label + "."}</p>
        <a href="#/pricing" class="btn btn-primary btn-sm">Upgrade to ${meta.label} ${icon("arrowRight",15)}</a>
      </div>
    </div>`;
  }

  /* compact inline lock chip (for list items / buttons) */
  function chipLock(need) {
    const meta = TIER_META[need || "pro"];
    return `<span class="badge ${need === "plus" ? "gold" : "green"}" title="${meta.label} feature">${icon("key",12)} ${meta.label}</span>`;
  }

  function tierSwitcher() {
    const cur = tier();
    return `<div class="tier-switch" title="Demo: switch plan to see gating change live">
      ${["free","pro","plus"].map(t => `<button data-tier="${t}" class="${t === cur ? "active" : ""}">${TIER_META[t].label}</button>`).join("")}
    </div>`;
  }
  function wireTierSwitcher(rerender) {
    document.querySelectorAll("[data-tier]").forEach(b => b.onclick = () => {
      setTier(b.getAttribute("data-tier"));
      if (window.UI) UI.toast("Plan switched to " + TIER_META[tier()].label);
      rerender();
    });
  }

  return { entitlements, TIER_META, tier, setTier, can, value, requiredTier, lock, chipLock, tierSwitcher, wireTierSwitcher };
})();
