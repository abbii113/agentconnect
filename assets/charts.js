/* AgentConnect Pro — hand-rolled SVG charts (no dependencies) */
window.CHART = (function () {
  let uid = 0;
  const id = (p) => `${p}${++uid}`;
  const max = (a) => Math.max.apply(null, a);
  const min = (a) => Math.min.apply(null, a);

  function area(data, opts) {
    opts = opts || {};
    const W = 600, H = opts.h || 220, pad = { l: 8, r: 8, t: 14, b: 22 };
    const lo = opts.zero ? 0 : min(data) * 0.96;
    const hi = max(data) * 1.04;
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const x = (i) => pad.l + (i / (data.length - 1)) * iw;
    const y = (v) => pad.t + ih - ((v - lo) / (hi - lo)) * ih;
    const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
    const fill = `${line} L${x(data.length - 1).toFixed(1)} ${pad.t + ih} L${pad.l} ${pad.t + ih} Z`;
    const g = id("g"), labels = opts.labels || [];
    const grid = [0.25, 0.5, 0.75].map(t => {
      const gy = pad.t + ih * t;
      return `<line x1="${pad.l}" y1="${gy}" x2="${W - pad.r}" y2="${gy}" stroke="var(--grid)" stroke-width="1"/>`;
    }).join("");
    const dots = opts.dots ? data.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3" fill="hsl(var(--emerald))"/>`).join("") : "";
    const last = data.length - 1;
    const xlabels = labels.length ? labels.map((l, i) =>
      (i % Math.ceil(labels.length / 6) === 0 || i === last)
        ? `<text x="${x(i)}" y="${H - 4}" fill="hsl(var(--faint))" font-size="11" text-anchor="middle">${l}</text>` : "").join("") : "";
    return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}" role="img">
      <defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(var(--emerald))" stop-opacity=".35"/>
        <stop offset="1" stop-color="hsl(var(--emerald))" stop-opacity="0"/></linearGradient></defs>
      ${grid}
      <path d="${fill}" fill="url(#${g})"/>
      <path d="${line}" fill="none" stroke="hsl(var(--emerald))" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}
      <circle cx="${x(last)}" cy="${y(data[last])}" r="4.5" fill="hsl(var(--emerald))" stroke="hsl(var(--bg))" stroke-width="2"/>
      ${xlabels}
    </svg></div>`;
  }

  function bars(data, opts) {
    opts = opts || {};
    const W = 600, H = opts.h || 220, pad = { l: 8, r: 8, t: 14, b: 24 };
    const vals = data.map(d => d.value);
    const hi = max(vals) * 1.08;
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const bw = iw / data.length;
    const bars = data.map((d, i) => {
      const bh = (d.value / hi) * ih;
      const bx = pad.l + i * bw + bw * 0.18;
      const by = pad.t + ih - bh;
      const w = bw * 0.64;
      const c = d.color || "hsl(var(--emerald))";
      return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${w.toFixed(1)}" height="${bh.toFixed(1)}" rx="5" fill="${c}" opacity="${d.dim ? .4 : .92}"/>
        <text x="${(bx + w / 2).toFixed(1)}" y="${H - 6}" fill="hsl(var(--faint))" font-size="11" text-anchor="middle">${d.label}</text>`;
    }).join("");
    return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}">${bars}</svg></div>`;
  }

  function groupedBars(groups, series, opts) {
    // groups: [labels], series: [{name,color,data:[]}]
    opts = opts || {};
    const W = 640, H = opts.h || 260, pad = { l: 8, r: 8, t: 14, b: 26 };
    const all = series.flatMap(s => s.data);
    const hi = max(all) * 1.1;
    const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
    const gw = iw / groups.length;
    const bw = (gw * 0.7) / series.length;
    let out = "";
    groups.forEach((g, gi) => {
      series.forEach((s, si) => {
        const bh = (s.data[gi] / hi) * ih;
        const bx = pad.l + gi * gw + gw * 0.15 + si * bw;
        const by = pad.t + ih - bh;
        out += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${(bw * 0.86).toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="${s.color}" opacity=".9"/>`;
      });
      out += `<text x="${(pad.l + gi * gw + gw / 2).toFixed(1)}" y="${H - 7}" fill="hsl(var(--faint))" font-size="10.5" text-anchor="middle">${g}</text>`;
    });
    return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}">${out}</svg></div>`;
  }

  function donut(segs, opts) {
    opts = opts || {};
    const sz = 180, r = 70, cx = sz / 2, cy = sz / 2, sw = 26;
    const total = segs.reduce((a, b) => a + b.value, 0);
    const C = 2 * Math.PI * r;
    let off = 0;
    const arcs = segs.map(s => {
      const frac = s.value / total;
      const dash = `${(frac * C).toFixed(2)} ${(C - frac * C).toFixed(2)}`;
      const el = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${sw}" stroke-dasharray="${dash}" stroke-dashoffset="${(-off * C).toFixed(2)}" transform="rotate(-90 ${cx} ${cy})" stroke-linecap="round"/>`;
      off += frac;
      return el;
    }).join("");
    const center = opts.center ? `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="26" font-weight="800" fill="hsl(var(--text))" font-family="Inter, system-ui, sans-serif">${opts.center}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="hsl(var(--faint))">${opts.sub || ""}</text>` : "";
    return `<div class="chart-wrap" style="max-width:${sz}px;margin:0 auto"><svg viewBox="0 0 ${sz} ${sz}">${arcs}${center}</svg></div>`;
  }

  function spark(data, opts) {
    opts = opts || {};
    const W = 120, H = 34;
    const lo = min(data), hi = max(data);
    const x = (i) => (i / (data.length - 1)) * W;
    const y = (v) => H - 3 - ((v - lo) / (hi - lo || 1)) * (H - 6);
    const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
    const col = opts.down ? "hsl(0 80% 65%)" : "hsl(var(--emerald))";
    return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="34" preserveAspectRatio="none"><path d="${line}" fill="none" stroke="${col}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function funnel(data, opts) {
    const W = 600, rowH = 46, gap = 10;
    const H = data.length * (rowH + gap);
    const hi = data[0].value;
    let y = 0, out = "";
    data.forEach((d, i) => {
      const w = (d.value / hi) * (W - 120);
      const x = (W - 120 - w) / 2 + 60;
      const pct = i ? Math.round((d.value / data[i - 1].value) * 100) : 100;
      out += `<rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${rowH}" rx="8" fill="hsl(var(--emerald))" opacity="${1 - i * 0.13}"/>
        <text x="${W / 2}" y="${y + rowH / 2 + 1}" text-anchor="middle" font-size="13" font-weight="700" fill="#022" font-family="Inter, system-ui, sans-serif">${d.value}</text>
        <text x="6" y="${y + rowH / 2 + 4}" font-size="12" fill="hsl(var(--muted))" font-weight="600">${d.label}</text>
        <text x="${W - 6}" y="${y + rowH / 2 + 4}" text-anchor="end" font-size="12" fill="hsl(var(--faint))">${pct}%</text>`;
      y += rowH + gap;
    });
    return `<div class="chart-wrap"><svg viewBox="0 0 ${W} ${H}">${out}</svg></div>`;
  }

  return { area, bars, groupedBars, donut, spark, funnel };
})();
