/* AgentConnect — global dataset (4 launch markets). Realistic mock, real-API-ready. */
window.DATA = (function () {
  const img = (id) => `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

  /* ===================== MARKETS (the world / outward) =====================
     Each market carries everything the Market Intelligence Engine surfaces.
     Feeds (transactions/mobility) are shaped exactly like the live DLD/RTA
     adapters will return them, so swapping mock→live needs no UI change.      */
  const markets = [
    {
      id: "dubai", name: "Dubai", country: "United Arab Emirates", flag: "🇦🇪",
      status: "live", currency: "AED", fxToUSD: 0.272,
      positioning: "Global investment · off-plan · luxury · high rental yield · capital appreciation",
      sentiment: { label: "Bullish", score: 78, rationale: "Record DLD transaction volumes, sustained foreign inflows, and metro/road expansion continue to push prime-area prices. Supply is rising but absorption stays strong." },
      headline: { ppsf: 1980, ppsfUSD: 539, yoy: 14.2, yield: 6.4, appreciation: 11.8, txnVolumeBn: 5.9, txnYoY: 18 },
      priceTrend: [1620,1655,1690,1710,1745,1780,1810,1835,1860,1900,1945,1980],
      volumeTrend: [3.1,3.4,3.0,3.8,4.2,3.9,4.6,4.4,5.1,4.8,5.4,5.9],
      districts: [
        { name:"Dubai Marina", ppsf:1980, yield:6.4, growth:14.2, demand:92 },
        { name:"Downtown", ppsf:2650, yield:5.6, growth:11.8, demand:95 },
        { name:"Palm Jumeirah", ppsf:3450, yield:5.1, growth:18.6, demand:97 },
        { name:"Business Bay", ppsf:1820, yield:6.9, growth:13.1, demand:88 },
        { name:"JVC", ppsf:1180, yield:8.2, growth:12.5, demand:84 },
        { name:"Creek Harbour", ppsf:2240, yield:6.1, growth:19.2, demand:90 },
      ],
      infrastructure: [
        { name:"Dubai Metro Blue Line", type:"Metro", status:"Under construction", eta:"2029", impact:"up", note:"Connects Creek Harbour & International City to the network — expect 8–15% uplift along the corridor over 18–24 months." },
        { name:"Al Maktoum Intl. Airport expansion", type:"Airport", status:"Phase 1 funded", eta:"2032", impact:"up", note:"World's largest airport build-out lifts Dubai South & Jebel Ali land values; long-horizon capital play." },
        { name:"Sheikh Zayed Rd widening", type:"Road", status:"Ongoing", eta:"2026", impact:"up", note:"Eases the Marina↔Downtown commute — supports sustained demand in mid-corridor towers." },
        { name:"Dubai Creek Harbour master plan", type:"Community", status:"Active delivery", eta:"2027", impact:"up", note:"New waterfront supply; near-term price discipline, strong medium-term appreciation as amenities complete." },
      ],
      transactions: [ // shaped like DLD adapter output
        { date:"2026-06-24", area:"Dubai Marina", type:"Apartment · 2BR", price:2.35, size:1180, ppsf:1992 },
        { date:"2026-06-24", area:"Palm Jumeirah", type:"Villa · 5BR", price:18.5, size:7200, ppsf:2569 },
        { date:"2026-06-23", area:"JVC", type:"Apartment · 1BR", price:0.78, size:650, ppsf:1200 },
        { date:"2026-06-23", area:"Business Bay", type:"Studio", price:0.92, size:480, ppsf:1917 },
        { date:"2026-06-22", area:"Creek Harbour", type:"Apartment · 2BR", price:2.60, size:1100, ppsf:2364 },
      ],
      mobility: [ // shaped like RTA adapter output
        { name:"Blue Line station — Creek Harbour", type:"Metro station", status:"Construction", impact:"up", note:"12-min ride to Downtown by 2029 → upward pressure on Creek Harbour rentals." },
        { name:"Infinity Bridge feeder roads", type:"Road", status:"Open", impact:"up", note:"Cuts Bur Dubai↔Deira crossing time; mild uplift for Al Jaddaf." },
      ],
      growthZones: [
        { name:"Dubai South", score:88, reason:"Airport expansion + Expo legacy + affordable entry; early-cycle land appreciation." },
        { name:"Dubai Creek Harbour", score:84, reason:"Metro Blue Line + waterfront master plan maturing; strong 3–5y appreciation." },
        { name:"JVC", score:79, reason:"Highest gross yields in-city (8%+); resilient tenant demand, heavy new supply to watch." },
      ],
      legal: {
        ownership:"Freehold for all nationalities in designated zones; 100% foreign ownership.",
        residency:"Property ≥ AED 750k → 2-yr renewable visa; ≥ AED 2M → 10-yr Golden Visa.",
        documents:["Passport copy","Signed MoU (Form F)","10% deposit cheque","NOC from developer","DLD 4% transfer fee"],
        commissionNorm:"2% of sale price (buyer-side), paid at transfer.",
        steps:["Reserve unit / sign Form F","Pay 10% deposit","Developer NOC","DLD transfer & 4% fee","Title deed issued"],
      },
    },
    {
      id: "bali", name: "Bali", country: "Indonesia", flag: "🇮🇩",
      status: "live", currency: "IDR", fxToUSD: 0.000061,
      positioning: "Lifestyle investment · tourism · villas · short-term rental potential",
      sentiment: { label: "Bullish", score: 71, rationale: "Tourism well past pre-2020 peaks and a structural digital-nomad wave keep villa occupancy and nightly rates high. Leasehold structure and land rules require care." },
      headline: { ppsf: 280, ppsfUSD: 280, yoy: 12.0, yield: 11.5, appreciation: 9.0, txnVolumeBn: 0.9, txnYoY: 22 },
      priceTrend: [232,238,244,247,251,255,260,264,268,271,276,280],
      volumeTrend: [.5,.55,.5,.6,.65,.62,.7,.68,.75,.72,.84,.9],
      districts: [
        { name:"Canggu", ppsf:340, yield:13.0, growth:16.0, demand:95 },
        { name:"Seminyak", ppsf:380, yield:10.5, growth:9.0, demand:90 },
        { name:"Ubud", ppsf:240, yield:11.0, growth:12.0, demand:82 },
        { name:"Uluwatu", ppsf:300, yield:12.0, growth:18.0, demand:88 },
      ],
      infrastructure: [
        { name:"Bali Subway (Phase 1)", type:"Metro", status:"Groundbreaking 2025", eta:"2031", impact:"up", note:"Airport↔Seminyak↔Canggu line targets gridlock — major long-term uplift for connected hubs." },
        { name:"Gilimanuk–Mengwi Toll Road", type:"Road", status:"Under construction", eta:"2028", impact:"up", note:"Opens West Bali; early-cycle land plays as access improves." },
        { name:"North Bali Airport (proposed)", type:"Airport", status:"Planning", eta:"TBD", impact:"watch", note:"Speculative; would transform North Bali values but timeline uncertain." },
      ],
      transactions: [
        { date:"2026-06-23", area:"Canggu", type:"Villa · 3BR (leasehold)", price:0.55, size:2400, ppsf:340, _usd:true },
        { date:"2026-06-22", area:"Uluwatu", type:"Villa · 2BR (leasehold)", price:0.38, size:1800, ppsf:300, _usd:true },
        { date:"2026-06-21", area:"Ubud", type:"Villa · 2BR", price:0.29, size:1600, ppsf:240, _usd:true },
      ],
      mobility: [
        { name:"Canggu Shortcut widening", type:"Road", status:"Open", impact:"up", note:"Reduces beach-club commute; supports nightly-rate premiums in Berawa." },
      ],
      growthZones: [
        { name:"Uluwatu", score:86, reason:"Clifftop scarcity + new luxury supply; strong nightly rates and appreciation." },
        { name:"West Bali (Tabanan)", score:74, reason:"Toll road + airport optionality; early land entry, higher risk/return." },
      ],
      legal: {
        ownership:"Foreigners cannot own freehold land; use leasehold (25–30y, extendable) or PT PMA company / Hak Pakai.",
        residency:"Second-home visa (KITAS) via deposit or property; not tied to title.",
        documents:["Passport","Leasehold agreement (notarised)","Due-diligence (Sertifikat / zoning)","Notary (PPAT) deed"],
        commissionNorm:"5% of price, typically seller-side.",
        steps:["Reserve & due diligence","Notary verifies title/zoning","Sign leasehold/PT PMA","Pay & register deed"],
      },
    },
    {
      id: "georgia", name: "Georgia", country: "Georgia", flag: "🇬🇪",
      status: "live", currency: "GEL", fxToUSD: 0.37,
      positioning: "Affordable entry · growing tourism · residency & investment appeal",
      sentiment: { label: "Neutral", score: 58, rationale: "Low entry prices and strong tourism support yields, but currency and regional geopolitics add volatility. Best as a high-yield, lower-ticket diversification play." },
      headline: { ppsf: 110, ppsfUSD: 110, yoy: 8.5, yield: 9.5, appreciation: 6.5, txnVolumeBn: 0.6, txnYoY: 11 },
      priceTrend: [96,98,99,101,102,104,105,106,107,108,109,110],
      volumeTrend: [.35,.38,.36,.4,.42,.41,.45,.44,.5,.48,.55,.6],
      districts: [
        { name:"Tbilisi (Vake)", ppsf:135, yield:8.0, growth:7.0, demand:84 },
        { name:"Batumi", ppsf:95, yield:11.0, growth:9.0, demand:80 },
        { name:"Gudauri", ppsf:120, yield:10.0, growth:8.0, demand:76 },
      ],
      infrastructure: [
        { name:"East-West Highway upgrade", type:"Road", status:"Under construction", eta:"2027", impact:"up", note:"Tbilisi↔Batumi travel time cut sharply — supports Batumi tourism property demand." },
        { name:"Batumi seafront expansion", type:"Community", status:"Active", eta:"2026", impact:"up", note:"New hospitality supply lifts short-let nightly rates along the coast." },
      ],
      transactions: [
        { date:"2026-06-22", area:"Batumi", type:"Apartment · 1BR", price:0.052, size:550, ppsf:95, _usd:true },
        { date:"2026-06-21", area:"Tbilisi (Vake)", type:"Apartment · 2BR", price:0.135, size:1000, ppsf:135, _usd:true },
      ],
      mobility: [
        { name:"Tbilisi metro extension", type:"Metro", status:"Planning", impact:"watch", note:"Would support outer-district values; early stage." },
      ],
      growthZones: [
        { name:"Batumi seafront", score:77, reason:"Tourism + short-let yields 11%+; currency risk to weigh." },
        { name:"Tbilisi Vake/Saburtalo", score:70, reason:"Stable rental demand from expats & students." },
      ],
      legal: {
        ownership:"Full freehold ownership for foreigners (except agricultural land).",
        residency:"Property ≥ USD 100k → residence permit eligibility.",
        documents:["Passport","Sale-purchase agreement","Extract from public registry"],
        commissionNorm:"2–3%, often split.",
        steps:["Reserve","Notary / public registry check","Sign & pay","Register title (same-day possible)"],
      },
    },
    {
      id: "oman", name: "Oman", country: "Oman", flag: "🇴🇲",
      status: "live", currency: "OMR", fxToUSD: 2.60,
      positioning: "Emerging luxury · waterfront · lifestyle · long-term regional growth",
      sentiment: { label: "Neutral", score: 62, rationale: "New freehold ITC zones and tax-free rental income are drawing GCC and European buyers. Liquidity is thinner than Dubai — a patient, lifestyle-led appreciation market." },
      headline: { ppsf: 620, ppsfUSD: 1612, yoy: 9.0, yield: 6.0, appreciation: 8.0, txnVolumeBn: 0.4, txnYoY: 29 },
      priceTrend: [540,548,556,562,570,578,585,592,600,608,614,620],
      volumeTrend: [.22,.24,.23,.26,.28,.27,.3,.29,.33,.32,.37,.4],
      districts: [
        { name:"Al Mouj (Muscat)", ppsf:720, yield:6.0, growth:9.0, demand:88 },
        { name:"Muscat Bay", ppsf:780, yield:5.5, growth:10.0, demand:85 },
        { name:"Salalah", ppsf:430, yield:7.0, growth:8.0, demand:78 },
      ],
      infrastructure: [
        { name:"Muscat Expressway extension", type:"Road", status:"Open (phased)", eta:"2026", impact:"up", note:"Improves access to coastal ITC communities — supports Al Mouj demand." },
        { name:"Sultan Haitham City", type:"Community", status:"Master planning", eta:"2030+", impact:"up", note:"New 100k-home city west of Muscat; long-horizon land and infrastructure play." },
      ],
      transactions: [
        { date:"2026-06-20", area:"Al Mouj", type:"Apartment · 2BR", price:0.165, size:1150, ppsf:720, _usd:false },
        { date:"2026-06-19", area:"Muscat Bay", type:"Villa · 3BR", price:0.62, size:2600, ppsf:780, _usd:false },
      ],
      mobility: [
        { name:"Muscat Intl. Airport road upgrades", type:"Road", status:"Open", impact:"up", note:"Smoother airport↔ITC access; supports holiday-home demand." },
      ],
      growthZones: [
        { name:"Al Mouj", score:80, reason:"Established ITC, marina lifestyle, steady GCC demand." },
        { name:"Yiti / Sultan Haitham City corridor", score:72, reason:"Master-plan optionality; early, long-horizon." },
      ],
      legal: {
        ownership:"Freehold for foreigners within Integrated Tourism Complexes (ITCs).",
        residency:"Property in ITC ≥ OMR threshold → renewable residency for owner & family.",
        documents:["Passport","Sale agreement","ITC developer approval","Ministry registration"],
        commissionNorm:"2–3%.",
        steps:["Reserve in ITC","Developer approval","Sign & pay","Ministry of Housing registration"],
      },
    },
  ];

  const futureMarkets = [
    { name:"Saudi Arabia", flag:"🇸🇦", note:"Vision 2030 giga-projects" },
    { name:"Qatar", flag:"🇶🇦", note:"Post-World-Cup freehold zones" },
    { name:"Türkiye", flag:"🇹🇷", note:"Citizenship-by-investment" },
    { name:"Cyprus", flag:"🇨🇾", note:"EU residency appeal" },
    { name:"United Kingdom", flag:"🇬🇧", note:"Prime London & BTL" },
    { name:"Europe", flag:"🇪🇺", note:"Portugal, Spain, Greece" },
  ];

  /* ===================== DEVELOPERS (supply side) ===================== */
  const developers = [
    { id:"emaar", name:"Emaar", market:"dubai", verified:true, projects:42, tier:"Premium" },
    { id:"damac", name:"DAMAC", market:"dubai", verified:true, projects:38, tier:"Premium" },
    { id:"sobha", name:"Sobha Realty", market:"dubai", verified:true, projects:14, tier:"Premium" },
    { id:"nakheel", name:"Nakheel", market:"dubai", verified:true, projects:11, tier:"Standard" },
    { id:"binghatti", name:"Binghatti", market:"dubai", verified:true, projects:22, tier:"Standard" },
    { id:"ellington", name:"Ellington", market:"dubai", verified:true, projects:9, tier:"Standard" },
    { id:"penida", name:"Penida Estates", market:"bali", verified:true, projects:6, tier:"Standard" },
    { id:"orbi", name:"Orbi Group", market:"georgia", verified:true, projects:5, tier:"Standard" },
    { id:"almouj", name:"Al Mouj Muscat", market:"oman", verified:true, projects:7, tier:"Premium" },
  ];

  /* ===================== PROJECTS (global catalogue, free to browse) ===================== */
  const projects = [
    { id:"p1", name:"Burj Crown", dev:"emaar", market:"dubai", district:"Downtown", type:"Apartment", from:1.85, fromUSD:0.50, beds:"1–3 BR", roi:6.2, handover:"Q4 2026", status:"Off-plan", plan:"60/40", units:312, sold:74, featured:true, hasInventory:true, img:img("photo-1512453979798-5ea266f8880c") },
    { id:"p2", name:"DAMAC Bay by Cavalli", dev:"damac", market:"dubai", district:"Dubai Marina", type:"Apartment", from:2.10, fromUSD:0.57, beds:"1–5 BR", roi:6.8, handover:"Q2 2027", status:"Off-plan", plan:"70/30", units:480, sold:61, featured:true, hasInventory:true, img:img("photo-1545324418-cc1a3fa10c00") },
    { id:"p3", name:"Sobha Hartland II", dev:"sobha", market:"dubai", district:"Creek Harbour", type:"Villa", from:6.40, fromUSD:1.74, beds:"4–6 BR", roi:5.4, handover:"Q1 2027", status:"Off-plan", plan:"60/40", units:210, sold:48, featured:false, hasInventory:false, img:img("photo-1613977257363-707ba9348227") },
    { id:"p5", name:"Binghatti Skyrise", dev:"binghatti", market:"dubai", district:"Business Bay", type:"Apartment", from:0.95, fromUSD:0.26, beds:"Studio–3 BR", roi:8.1, handover:"Q3 2026", status:"Off-plan", plan:"70/30", units:920, sold:82, featured:true, hasInventory:true, img:img("photo-1486406146926-c627a92ad1ab") },
    { id:"p6", name:"Ellington Belgravia", dev:"ellington", market:"dubai", district:"JVC", type:"Apartment", from:0.78, fromUSD:0.21, beds:"Studio–2 BR", roi:8.4, handover:"Ready", status:"Ready", plan:"Cash", units:340, sold:88, featured:false, hasInventory:false, img:img("photo-1480714378408-67cf0d13bc1b") },
    { id:"p10", name:"Marina Shores", dev:"emaar", market:"dubai", district:"Dubai Marina", type:"Apartment", from:1.95, fromUSD:0.53, beds:"1–4 BR", roi:6.5, handover:"Q1 2026", status:"Off-plan", plan:"70/30", units:520, sold:85, featured:false, hasInventory:false, img:img("photo-1567496898669-ee935f5f647a") },
    { id:"b1", name:"Canggu Cliff Villas", dev:"penida", market:"bali", district:"Uluwatu", type:"Villa", from:0.45, fromUSD:0.45, beds:"2–3 BR", roi:12.5, handover:"Q4 2026", status:"Off-plan", plan:"50/50", units:24, sold:58, featured:true, hasInventory:true, usd:true, img:img("photo-1582610116397-edb318620f90") },
    { id:"b2", name:"Berawa Garden Residences", dev:"penida", market:"bali", district:"Canggu", type:"Villa", from:0.32, fromUSD:0.32, beds:"1–2 BR", roi:13.2, handover:"Ready", status:"Ready", plan:"Cash", units:18, sold:90, featured:false, hasInventory:false, usd:true, img:img("photo-1505693416388-ac5ce068fe85") },
    { id:"g1", name:"Batumi Sea Towers", dev:"orbi", market:"georgia", district:"Batumi", type:"Apartment", from:0.058, fromUSD:0.058, beds:"Studio–2 BR", roi:11.0, handover:"Q2 2026", status:"Off-plan", plan:"Installments", units:600, sold:64, featured:true, hasInventory:false, usd:true, img:img("photo-1542314831-068cd1dbfeeb") },
    { id:"o1", name:"Al Mouj Marina Residences", dev:"almouj", market:"oman", district:"Al Mouj (Muscat)", type:"Apartment", from:0.18, fromUSD:0.47, beds:"1–3 BR", roi:6.0, handover:"Q3 2027", status:"Off-plan", plan:"50/50", units:180, sold:42, featured:true, hasInventory:true, img:img("photo-1600585154340-be6161a56a0c") },
  ];

  /* ===================== LIVE INVENTORY (Project→Building→Floor→Unit) ===================== */
  // generated per project that hasInventory; Available/Reserved/Sold
  function buildInventory(projectId, floors, perFloor, base, plans) {
    const views = ["Sea view","Marina view","City view","Pool view","Garden view"];
    const units = [];
    for (let f = floors; f >= 1; f--) {
      for (let u = 1; u <= perFloor; u++) {
        const r = (f * 7 + u * 13) % 10;
        const status = r < 5 ? "Available" : r < 8 ? "Reserved" : "Sold";
        const size = 600 + ((u + f) % 4) * 220;
        const price = +(base * (1 + f * 0.018) * (1 + ((u % 3) * 0.06))).toFixed(2);
        units.push({ id:`${projectId}-${f}-${u}`, floor:f, no:`${f}${String(u).padStart(2,"0")}`,
          status, size, view: views[(f + u) % views.length], price,
          beds:(u % 3) + 1, plan: plans[(f+u)%plans.length] });
      }
    }
    return { projectId, floors, perFloor, units };
  }
  const inventory = {
    p1: buildInventory("p1", 12, 6, 1.85, ["60/40","70/30"]),
    p2: buildInventory("p2", 14, 6, 2.10, ["70/30","80/20"]),
    p5: buildInventory("p5", 16, 6, 0.95, ["70/30","65/35"]),
    b1: buildInventory("b1", 4, 6, 0.45, ["50/50"]),
    o1: buildInventory("o1", 10, 6, 0.18, ["50/50"]),
  };

  const paymentPlans = {
    "60/40": { label:"60/40", schedule:[["On booking","10%"],["During construction","50%"],["On handover","40%"]] },
    "70/30": { label:"70/30", schedule:[["On booking","20%"],["During construction","50%"],["On handover","30%"]] },
    "80/20": { label:"80/20", schedule:[["On booking","20%"],["During construction","60%"],["On handover","20%"]] },
    "50/50": { label:"50/50", schedule:[["On booking","10%"],["During construction","40%"],["On handover","50%"]] },
    "65/35": { label:"65/35", schedule:[["On booking","15%"],["During construction","50%"],["On handover","35%"]] },
    "Cash": { label:"Cash / Ready", schedule:[["On transfer","100%"]] },
    "Installments": { label:"Installments", schedule:[["On booking","30%"],["Monthly","60%"],["On handover","10%"]] },
  };

  /* ===================== CRM (the agent's OWN data — inward) ===================== */
  const pipeline = {
    "New Lead":   [
      { id:"d1", name:"Omar Al Farsi", budget:"AED 2.5M", interest:"Dubai · Marina · 2BR", source:"WhatsApp", score:82, color:"#10b981" },
      { id:"d2", name:"Priya Nair", budget:"AED 1.2M", interest:"Dubai · JVC · Studio", source:"Website", score:64, color:"#3b82f6" },
    ],
    "Contacted":  [
      { id:"d3", name:"James Whitfield", budget:"USD 0.6M", interest:"Bali · Uluwatu · Villa", source:"Meta Ads", score:91, color:"#f59e0b" },
      { id:"d4", name:"Lena Müller", budget:"AED 3.2M", interest:"Dubai · Downtown · 2BR", source:"Instagram", score:70, color:"#8b5cf6" },
    ],
    "Viewing":    [
      { id:"d5", name:"Chen Wei", budget:"AED 4.5M", interest:"Dubai · Beachfront · 3BR", source:"Cold call", score:88, color:"#ec4899" },
    ],
    "Negotiation":[
      { id:"d6", name:"Aisha Rahman", budget:"OMR 0.2M", interest:"Oman · Al Mouj · 2BR", source:"WhatsApp", score:94, color:"#14b8a6" },
    ],
    "Closed Won": [
      { id:"d7", name:"Viktor Petrov", budget:"USD 0.06M", interest:"Georgia · Batumi · 1BR", source:"Referral", score:100, color:"#10b981" },
    ],
  };
  const clients = [
    { name:"Omar Al Farsi", email:"omar@mail.com", phone:"+971 50 123 4567", stage:"New Lead", market:"Dubai", value:2.5, last:"2h ago", color:"#10b981", wa:true },
    { name:"James Whitfield", email:"jw@mail.com", phone:"+44 7700 900123", stage:"Contacted", market:"Bali", value:0.6, last:"1d ago", color:"#f59e0b", wa:true },
    { name:"Aisha Rahman", email:"aisha@mail.com", phone:"+968 9123 4567", stage:"Negotiation", market:"Oman", value:0.43, last:"3h ago", color:"#14b8a6", wa:true },
    { name:"Chen Wei", email:"chen@mail.com", phone:"+65 8123 4567", stage:"Viewing", market:"Dubai", value:4.5, last:"5h ago", color:"#ec4899", wa:false },
    { name:"Lena Müller", email:"lena@mail.com", phone:"+49 151 2345678", stage:"Contacted", market:"Dubai", value:3.2, last:"2d ago", color:"#8b5cf6", wa:true },
    { name:"Viktor Petrov", email:"viktor@mail.com", phone:"+7 916 123 4567", stage:"Closed Won", market:"Georgia", value:0.06, last:"4d ago", color:"#10b981", wa:false },
    { name:"Priya Nair", email:"priya@mail.com", phone:"+91 98200 12345", stage:"New Lead", market:"Dubai", value:1.2, last:"6h ago", color:"#3b82f6", wa:true },
  ];
  const tasks = [
    { title:"Follow up — Aisha Rahman", sub:"Send Al Mouj payment plan", due:"Today 4:00 PM", type:"call", done:false },
    { title:"Virtual viewing — James Whitfield", sub:"Uluwatu villa · Zoom (London time)", due:"Tomorrow 11:00 AM", type:"calendar", done:false },
    { title:"Proposal — Chen Wei", sub:"Beachfront 3BR comparison deck", due:"Today 6:30 PM", type:"file", done:false },
    { title:"WhatsApp blast — new Bali launch", sub:"148 warm leads segmented", due:"Scheduled 9:00 AM", type:"whatsapp", done:true },
  ];
  const activity = [
    { who:"AI Concierge", what:"qualified 3 leads from Meta Ads overnight", when:"32m ago", color:"#10b981" },
    { who:"Viktor Petrov", what:"signed reservation — Batumi 1BR via DocuSign", when:"4h ago", color:"#f59e0b" },
    { who:"Cold-call bot", what:"booked a viewing with Chen Wei", when:"5h ago", color:"#ec4899" },
    { who:"Market alert", what:"Dubai Creek Harbour flagged a rising growth zone", when:"1d ago", color:"#3b82f6" },
  ];
  // personal performance (CRM, inward only)
  const myCommission = [42,55,48,61,73,69,84,79,96,91,112,128];
  const myFunnel = [{label:"Leads",value:340},{label:"Contacted",value:212},{label:"Viewings",value:96},{label:"Offers",value:41},{label:"Closed",value:23}];
  const leadSources = [
    { label:"WhatsApp", value:38, color:"hsl(var(--chart-1))" },
    { label:"Meta Ads", value:22, color:"hsl(var(--chart-2))" },
    { label:"Referral", value:18, color:"hsl(var(--chart-3))" },
    { label:"Portals", value:14, color:"hsl(var(--chart-4))" },
    { label:"Cold call", value:8, color:"hsl(var(--chart-5))" },
  ];

  /* ===================== BUSINESS-MODEL RAILS ===================== */
  const commissionLedger = [
    { date:"2026-06-18", deal:"Batumi Sea Towers · 1BR", agent:"You", gross:0.058, rate:10, fee:0.0058, status:"Cleared", cur:"USD" },
    { date:"2026-06-10", deal:"Al Mouj Marina · 2BR", agent:"You", gross:0.18, rate:10, fee:0.018, status:"Pending", cur:"OMR" },
    { date:"2026-05-28", deal:"Binghatti Skyrise · Studio", agent:"S. Khan", gross:0.95, rate:10, fee:0.095, status:"Cleared", cur:"AED" },
  ];
  const leadRouting = [
    { lead:"James Whitfield", market:"Bali", routedTo:"Penida Estates", reason:"Certified agent · Plus tier", status:"Accepted" },
    { lead:"Aisha Rahman", market:"Oman", routedTo:"Al Mouj Muscat", reason:"Boosted developer lead", status:"Pending" },
  ];

  /* ===================== ACADEMY + CERTIFICATION ===================== */
  const academy = [
    { title:"Closing Off-Plan Across Borders", dur:"42 min", level:"Intermediate", cat:"Sales", prog:100, free:true, img:img("photo-1560518883-ce09059eeffa") },
    { title:"Market Intelligence: Reading a Study", dur:"31 min", level:"Beginner", cat:"Markets", prog:60, free:true, img:img("photo-1454165804606-c3d57bc86b40") },
    { title:"AgentConnect Certified: Dubai", dur:"2h 10m", level:"Certification", cat:"Certification", prog:25, free:false, img:img("photo-1582268611958-ebfd161ef9cf") },
    { title:"WhatsApp Lead Nurturing Funnels", dur:"35 min", level:"Advanced", cat:"Automation", prog:0, free:false, img:img("photo-1611162617474-5b21e879e113") },
    { title:"Cross-Market Investment Modelling", dur:"48 min", level:"Advanced", cat:"Markets", prog:0, free:false, img:img("photo-1559526324-4b87b5e36e44") },
    { title:"Selling Bali Leasehold the Right Way", dur:"27 min", level:"Intermediate", cat:"Sales", prog:0, free:false, img:img("photo-1582610116397-edb318620f90") },
  ];

  /* ===================== INTEGRATIONS (connector registry) ===================== */
  const connectors = [
    { id:"whatsapp", name:"WhatsApp Business", cat:"Communication", desc:"Lead capture + 2-way client chat inside the CRM.", tier:"pro", oauth:true, core:true },
    { id:"gmail", name:"Gmail", cat:"Communication", desc:"Send proposals, track opens & replies, log to timeline.", tier:"pro", oauth:true },
    { id:"outlook", name:"Outlook Mail", cat:"Communication", desc:"Email send + tracking for Microsoft accounts.", tier:"pro", oauth:true },
    { id:"sms", name:"SMS", cat:"Communication", desc:"Reminders & confirmations via SMS.", tier:"pro" },
    { id:"telegram", name:"Telegram", cat:"Communication", desc:"Reach Georgia / CIS / Russian-speaking buyers.", tier:"pro", oauth:true },
    { id:"zoom", name:"Zoom", cat:"Communication", desc:"Virtual viewings for remote international clients.", tier:"plus", oauth:true },
    { id:"meet", name:"Google Meet", cat:"Communication", desc:"Virtual viewings inside your calendar.", tier:"plus", oauth:true },
    { id:"gcal", name:"Google Calendar", cat:"Calendar", desc:"Time-zone-aware viewings, calls & follow-ups.", tier:"pro", oauth:true, core:true },
    { id:"ocal", name:"Outlook Calendar", cat:"Calendar", desc:"Sync scheduling for Microsoft accounts.", tier:"pro", oauth:true },
    { id:"booking", name:"Booking Link", cat:"Calendar", desc:"Calendly-style self-booking → auto-creates lead + event.", tier:"pro" },
    { id:"docusign", name:"DocuSign", cat:"Documents", desc:"Reservation forms, NCND, SPA, commission agreements.", tier:"pro", oauth:true },
    { id:"gdrive", name:"Google Drive", cat:"Documents", desc:"Brochures, floor plans & client docs on each lead.", tier:"pro", oauth:true },
    { id:"dropbox", name:"Dropbox", cat:"Documents", desc:"Cloud storage for project & client files.", tier:"pro", oauth:true },
    { id:"meta", name:"Meta Lead Ads", cat:"Lead sources", desc:"Facebook & Instagram form leads into your pipeline.", tier:"pro", oauth:true },
    { id:"tiktok", name:"TikTok Lead Gen", cat:"Lead sources", desc:"TikTok form leads straight to the CRM.", tier:"pro", oauth:true },
    { id:"googleads", name:"Google Lead Forms", cat:"Lead sources", desc:"Google Ads lead forms into the pipeline.", tier:"pro", oauth:true },
    { id:"portals", name:"Property Portals", cat:"Lead sources", desc:"Bayut, Property Finder, Dubizzle & local equivalents.", tier:"pro" },
    { id:"stripe", name:"Stripe Payment Links", cat:"Finance", desc:"Collect booking deposits & reservation fees.", tier:"plus", oauth:true },
    { id:"fx", name:"Currency Converter", cat:"Finance", desc:"Live FX so proposals show the client's home currency.", tier:"pro" },
    { id:"maps", name:"Google Maps", cat:"Finance", desc:"Area views + proximity to flagged infrastructure.", tier:"pro", oauth:true },
    { id:"translate", name:"Translation", cat:"Finance", desc:"Translate chats & proposals across languages.", tier:"plus" },
    { id:"zapier", name:"Zapier / Make", cat:"Automation", desc:"Wire AgentConnect into your own stack.", tier:"plus", oauth:true },
    { id:"webhooks", name:"Webhooks & API", cat:"Automation", desc:"Open webhooks + public API for power users.", tier:"plus" },
  ];

  /* ===================== TIERS ===================== */
  const plans = [
    { id:"free", name:"Free", icon:"sparkles", price:0, blurb:"See & learn", popular:false,
      features:["Browse every market & project","Surface market overview + 4-market compare","2 client proposals / month","A few academy intro lessons","Save a limited shortlist"] },
    { id:"pro", name:"Pro", icon:"flame", price:49, blurb:"The working agent", popular:true,
      features:["Full AI Market Study (infra, transactions, growth zones)","Unlimited branded proposals","CRM + Lead Dashboard","WhatsApp + everyday integrations","Full Academy + certification","Direct developer / closing-team connection"] },
    { id:"plus", name:"Plus", icon:"crown", price:99, blurb:"Power & premium", popular:false,
      features:["3D live-inventory unit selector","Cross-market AI comparison engine","On-call deal support line","All integrations + Zapier/API","First access to new markets & launches","Multi-seat team / brokerage tools"] },
  ];

  const testimonials = [
    { quote:"I'm sitting in Paris and I know the Dubai market better than agents who live there. The Market Study is unreal.", name:"Camille Laurent", role:"Cross-border Advisor · France", color:"#10b981" },
    { quote:"One platform for Dubai, Bali and Georgia. I compare markets for a client in five minutes and send a branded proposal.", name:"Sara Khan", role:"International Broker · UK", color:"#f59e0b" },
    { quote:"Pro paid for itself on my first reservation. The CRM + WhatsApp combo means no lead ever goes cold.", name:"Daniel Roy", role:"Investment Advisor · Canada", color:"#8b5cf6" },
  ];

  const months = ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"];

  /* ---- predictive layer: AI price forecast + liquidity (cumulative % over horizon) ---- */
  const _forecast = { dubai:{y1:8,y3:26,y5:46}, bali:{y1:9,y3:28,y5:50}, georgia:{y1:6,y3:19,y5:33}, oman:{y1:8,y3:25,y5:44} };
  const _liquidity = { dubai:{score:88,label:"High"}, bali:{score:64,label:"Moderate"}, georgia:{score:55,label:"Moderate"}, oman:{score:48,label:"Emerging"} };
  markets.forEach(m => { m.forecast = _forecast[m.id]; m.liquidity = _liquidity[m.id]; });

  /* ---- developer reliability ratings (AI-scored on delivery & track record) ---- */
  const _rel = { emaar:96, damac:90, sobha:93, nakheel:88, binghatti:84, ellington:86, penida:80, orbi:78, almouj:89 };
  developers.forEach(d => d.reliability = _rel[d.id] || 80);

  /* ---- example deals (illustrative social proof) ---- */
  const dealExamples = [
    { project:"Palm Jumeirah Penthouse", market:"Dubai", value:"$9.83M", earned:"$297K" },
    { project:"Marina 2BR Apartment",    market:"Dubai", value:"$2.35M", earned:"$72K" },
    { project:"Uluwatu Cliff Villa",     market:"Bali",  value:"$1.95M", earned:"$65K" },
  ];

  const marketById = (id) => markets.find(m => m.id === id);
  const devById = (id) => developers.find(d => d.id === id);

  return { img, months, markets, futureMarkets, developers, projects, inventory, paymentPlans,
           pipeline, clients, tasks, activity, myCommission, myFunnel, leadSources,
           commissionLedger, leadRouting, academy, connectors, plans, testimonials, dealExamples,
           marketById, devById };
})();
