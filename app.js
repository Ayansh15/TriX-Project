(() => {
  const initial = {
    price: 599,
    facts: [
      { name: "Monthly plan price", value: "₹599 / month", source: "Pricing page · approved Nov 2", scope: "All channels", status: "Current" },
      { name: "Annual plan price", value: "₹5,990 / year", source: "Pricing page · approved Oct 14", scope: "All channels", status: "Current" },
      { name: "Free trial", value: "14 days", source: "Product terms · approved Oct 28", scope: "Website, paid social", status: "Current" },
      { name: "Core feature", value: "Unlimited projects", source: "Product brief · approved Oct 21", scope: "All channels", status: "Current" },
      { name: "Refund policy", value: "14 day refund window", source: "Policy document · approved Oct 10", scope: "Website, email", status: "Current" },
      { name: "Brand tagline", value: "Make room for good work", source: "Brand guide v3 · approved Sep 30", scope: "All channels", status: "Current" },
      { name: "Product claim", value: "Save up to 35% on annual", source: "Campaign brief · review due", scope: "Paid social", status: "Review due" },
      { name: "Support hours", value: "Mon–Fri, 9 AM–6 PM IST", source: "Support policy · approved Sep 12", scope: "Website, email", status: "Current" }
    ],
    assets: [
      { name: "Summer plan launch · Instagram", type: "JPG", group: "Paid social", uploaded: "Nov 1, 2026", status: "Needs review", finding: "Old price · ₹499 / month", priority: "High", excerpt: "Start your plan today for ₹499/month" },
      { name: "Pricing page · hero copy", type: "TXT", group: "Website", uploaded: "Oct 30, 2026", status: "Needs review", finding: "Old price · ₹499 / month", priority: "High", excerpt: "Plans start at just ₹499 per month." },
      { name: "October newsletter · offer block", type: "PDF", group: "Email", uploaded: "Oct 29, 2026", status: "Needs review", finding: "Old price · ₹499 / month", priority: "High", excerpt: "Get started at only ₹499/month. Offer ends soon." },
      { name: "Brand campaign · carousel 02", type: "JPG", group: "Paid social", uploaded: "Oct 27, 2026", status: "Needs review", finding: "Old price · ₹499 / month", priority: "Medium", excerpt: "All the tools you need for ₹499 a month." },
      { name: "Product overview · brochure", type: "PDF", group: "Sales enablement", uploaded: "Oct 24, 2026", status: "Needs review", finding: "Old price · ₹499 / month", priority: "Medium", excerpt: "The Starter plan is ₹499/month, billed monthly." },
      { name: "Autumn launch · landing page", type: "TXT", group: "Website", uploaded: "Nov 2, 2026", status: "Reviewed", finding: "No open findings", priority: "—", excerpt: "Starter plan, now ₹599 per month." },
      { name: "Brand guide · v3", type: "PDF", group: "Brand guidelines", uploaded: "Sep 30, 2026", status: "Reviewed", finding: "No open findings", priority: "—", excerpt: "Use the approved wordmark and the Northstar palette." },
      { name: "Welcome series · email 1", type: "TXT", group: "Email", uploaded: "Oct 21, 2026", status: "Reviewed", finding: "Claim evidence attached", priority: "—", excerpt: "Get more out of every project, starting today." },
      { name: "Spring refresh · social post", type: "JPG", group: "Paid social", uploaded: "Oct 19, 2026", status: "Reviewed", finding: "No open findings", priority: "—", excerpt: "Make room for good work." }
    ],
    findings: [
      { id: "F-204", title: "Outdated monthly price", type: "price", asset: 0, severity: "High", status: "New", source: "Change impact", time: "9:42 AM", owner: "Unassigned", reason: "This asset still shows the previous approved price after the new price became effective.", suggestion: "Update the creative in its source file, then upload and recheck.", confidence: "High" },
      { id: "F-203", title: "Outdated monthly price", type: "price", asset: 1, severity: "High", status: "New", source: "Change impact", time: "9:42 AM", owner: "Unassigned", reason: "The pricing page copy mentions ₹499 after the approved price changed to ₹599.", suggestion: "Replace the price and recheck the page copy.", confidence: "High" },
      { id: "F-202", title: "Promotional claim needs evidence", type: "claim", asset: 8, severity: "High", status: "Needs Verification", source: "Claim check", time: "Yesterday", owner: "Ayan Sharma", reason: "The phrase “save up to 35%” has no source attached to support the offer scope or calculation.", suggestion: "Attach a current campaign brief or hold the claim for review.", confidence: "Medium" },
      { id: "F-201", title: "Outdated monthly price", type: "price", asset: 2, severity: "Medium", status: "New", source: "Change impact", time: "9:42 AM", owner: "Unassigned", reason: "The offer block includes the prior monthly price. Confirm whether this email remains scheduled.", suggestion: "Check send status, update the price, then recheck.", confidence: "High" },
      { id: "F-200", title: "Brand tone may need review", type: "brand", asset: 3, severity: "Low", status: "New", source: "Brand consistency", time: "Oct 30", owner: "Pragya Sharma", reason: "The wording may not match the direct, conversational tone in Brand Guide v3.", suggestion: "Compare with the guide. A person should decide whether this is an issue.", confidence: "Low" }
    ],
    claims: [
      { claim: "Save up to 35% on annual plans", asset: "Spring refresh · social post", source: "No source attached", date: "Review due Nov 4", status: "Needs Verification", scope: "Annual offer" },
      { claim: "Rated #1 for team productivity", asset: "Q3 paid social · carousel", source: "Industry survey · 2024", date: "Source review due", status: "Source not independently verified", scope: "India · survey basis unclear" },
      { claim: "14-day free trial", asset: "Pricing page · hero copy", source: "Approved product terms v4", date: "Reviewed Oct 28", status: "Evidence attached", scope: "Starter plan" }
    ],
    activity: [
      { icon: "↻", tone: "change", title: "Monthly plan price updated", detail: "₹499 → ₹599 · approved by Ayan Sharma", time: "9:42 AM" },
      { icon: "✓", tone: "review", title: "Brand guide v3 approved", detail: "Rules reviewed by Pragya Sharma", time: "Yesterday" },
      { icon: "↑", tone: "upload", title: "3 campaign assets added", detail: "Social campaign · October launch", time: "Oct 30" }
    ],
    audit: [
      { time: "9:42 AM", icon: "↻", title: "Monthly plan price changed", body: "₹499 → ₹599 / month · effective Nov 2, 2026. Source: Pricing page. Approved by Ayan Sharma.", status: "Fact v2" },
      { time: "9:42 AM", icon: "⌕", title: "Change impact scan completed", body: "9 sample assets checked. 5 potential matches returned for human review.", status: "5 findings" },
      { time: "Yesterday", icon: "✓", title: "Brand guide v3 approved", body: "Logo usage and tone guidance confirmed by Pragya Sharma.", status: "Approved" },
      { time: "Oct 30", icon: "↑", title: "3 assets added to Studio North", body: "Summer plan launch and campaign materials indexed.", status: "Indexed" },
      { time: "Oct 28", icon: "◎", title: "Free trial fact updated", body: "Evidence linked to Product terms, version 4.", status: "Fact v3" }
    ]
  };

  const load = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("brandguard-demo-state"));
      if (!saved) return structuredClone(initial);
      return { ...structuredClone(initial), ...saved };
    } catch { return structuredClone(initial); }
  };
  let state = load();
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const iconFor = (t) => t === "PDF" ? "▤" : t === "JPG" ? "▧" : "▤";
  const fileClass = (t) => `file-${t.toLowerCase()}`;
  const openFindings = () => state.findings.filter(f => !["Approved", "Dismissed"].includes(f.status));
  function persist() { localStorage.setItem("brandguard-demo-state", JSON.stringify(state)); updateBadges(); renderOverview(); }
  function updateBadges() {
    const open = openFindings().length;
    const counts = $$(".alert-count, .kicker-count"); counts.forEach(n => n.textContent = open);
    const reviews = $("#review-count"); if (reviews) reviews.textContent = open;
    const cc = $("#claim-count"); if (cc) cc.textContent = state.claims.filter(c => c.status !== "Evidence attached").length;
    const fc = $("#fact-count"); if (fc) fc.textContent = 12 + Math.max(0, state.facts.length - initial.facts.length);
    const ac = $("#asset-count"); if (ac) ac.textContent = state.assets.length;
  }
  const statusClass = (s) => s === "Reviewed" || s === "Approved" || s === "Evidence attached" ? "status-ok" : s === "Needs Verification" || s === "Source not independently verified" ? "status-verify" : "status-review";
  const sevClass = (s) => `priority-${s.toLowerCase()}`;

  function renderOverview() {
    const list = $("#recent-findings"); if (!list) return;
    const rows = openFindings().slice(0, 4);
    list.innerHTML = rows.length ? rows.map(f => {
      const a = f.asset == null ? null : state.assets[f.asset];
      return `<div class="finding-row" data-open-finding="${esc(f.id)}"><span class="finding-type ${f.type === "price" ? "type-price" : f.type === "claim" ? "type-claim" : "type-brand"}">${f.type === "price" ? "₹" : f.type === "claim" ? "◎" : "✳"}</span><div class="finding-main"><strong>${esc(f.title)}</strong><span>${esc(f.source)} · ${esc(f.time)}</span></div><div class="finding-asset"><strong>${esc(a?.name || "Registered content")}</strong><span>${esc(a?.group || "Campaign")}</span></div><span class="priority ${sevClass(f.severity)}">${esc(f.severity)} priority</span><button class="row-chevron" aria-label="Open finding">›</button></div>`;
    }).join("") : `<div class="empty-state"><strong>Queue is clear</strong>New findings will appear here after a scan.</div>`;
    const act = $("#activity-list"); if (act) act.innerHTML = state.activity.slice(0, 3).map(a => `<div class="activity-row"><span class="activity-marker marker-${a.tone}">${a.icon}</span><div class="activity-copy"><strong>${esc(a.title)}</strong><span>${esc(a.detail)}</span></div><time class="activity-time">${esc(a.time)}</time></div>`).join("");
    const price = $("#current-price"); if (price) price.innerHTML = `₹${Number(state.price).toLocaleString("en-IN")}<span>/mo</span>`;
    updateBadges();
  }

  function heading(eyebrow, title, subtitle, actions = "") {
    return `<div class="page-heading heading-row subpage-heading"><div><div class="eyebrow"><span class="eyebrow-line"></span> ${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></div><div class="page-title-actions">${actions}</div></div>`;
  }
  function assetTable(assets, context = "assets") {
    const rows = assets.map(a => {
      const originalIndex = state.assets.indexOf(a);
      return `<div class="table-row" data-asset-row="${originalIndex}"><div class="asset-cell"><span class="file-icon ${fileClass(a.type)}">${iconFor(a.type)}</span><div class="asset-name"><strong>${esc(a.name)}</strong><span>${esc(a.group)} · ${esc(a.uploaded)}</span></div></div><div class="table-cell">${esc(a.finding)}</div><div class="table-cell"><span class="status-label ${statusClass(a.status)}">${esc(a.status)}</span></div><div class="table-cell"><span class="priority-label ${a.priority === "Medium" ? "priority-medium" : ""}" ${a.priority === "—" ? "hidden" : ""}>${esc(a.priority)}</span></div><button class="table-more" data-asset-detail="${originalIndex}" aria-label="Asset details">···</button></div>`;
    }).join("");
    return `<div class="panel table-panel"><div class="table-head"><span>ASSET</span><span>FINDING</span><span>STATUS</span><span>PRIORITY</span><span></span></div><div id="${context}-rows">${rows || `<div class="empty-state"><strong>No matching assets</strong>Try another filter or search term.</div>`}</div></div>`;
  }
  function impactView() {
    const actions = `<button class="button button-secondary" id="impact-export">↓ Export report</button><button class="button button-dark" id="start-scan">⌕ Run scan</button>`;
    return `${heading("CHANGE IMPACT FINDER", "Potentially affected assets", "A human review queue for content that may still reference an old approved fact.", actions)}
      <div class="subpage-layout"><div class="subpage-main"><div class="toolbar"><label class="search-box"><span>⌕</span><input id="impact-search" placeholder="Search assets or detected content" /></label><select class="filter-select" id="impact-filter"><option value="all">All findings</option><option value="High">High priority</option><option value="Medium">Medium priority</option></select><div class="toolbar-tabs"><button class="active" data-impact-tab="all">All assets</button><button data-impact-tab="price">Price mismatch</button></div></div><div id="impact-table"></div></div>
      <aside class="subpage-side"><div class="side-card"><div class="section-kicker">CHANGE EVENT · NOV 2, 2026</div><h3>Monthly plan price</h3><div class="price-change" style="margin-top:8px"><div class="price-line"><span>Previous</span><strong>₹499<span>/mo</span></strong></div><div class="change-arrow">→</div><div class="price-line current"><span>Approved</span><strong>₹${Number(state.price).toLocaleString("en-IN")}<span>/mo</span></strong></div></div><div class="scan-meta"><span>Source · Pricing page</span><span>Version 2</span></div><div class="divider"></div><div class="side-list"><div>Indexed assets <strong>${state.assets.length}</strong></div><div>Potential matches <strong>${state.findings.filter(f => f.type === "price" && !["Approved", "Dismissed"].includes(f.status)).length}</strong></div><div>Scan coverage <strong>Uploaded assets</strong></div></div></div><div class="side-card"><h3>How this finding was made</h3><p>The scan checks registered or uploaded content against the current approved fact. Matches are suggestions for a reviewer, not confirmed errors.</p><div class="mini-fact"><span>MATCH METHOD</span><strong>Exact and normalized price match</strong><span class="fact-meta">Price matched near plan or product terms.</span></div><div class="divider"></div><div class="mini-fact"><span>LIMITS</span><strong>${state.assets.length} indexed demo assets</strong><span>Live websites, ad accounts, and email systems are not connected.</span></div></div></aside></div>`;
  }
  function renderImpactTable() {
    const target = $("#impact-table"); if (!target) return;
    let assets = state.assets.filter(a => a.status === "Needs review");
    const q = ($("#impact-search")?.value || "").toLowerCase();
    if (q) assets = assets.filter(a => `${a.name} ${a.finding} ${a.excerpt}`.toLowerCase().includes(q));
    const sev = $("#impact-filter")?.value || "all";
    if (sev !== "all") assets = assets.filter(a => a.priority === sev);
    if (window.impactTab === "price") assets = assets.filter(a => a.finding.toLowerCase().includes("price"));
    target.innerHTML = assetTable(assets, "impact");
  }
  function reviewsView() {
    return `${heading("SMART REVIEW QUEUE", "Review findings", "Prioritized checks with the evidence and next action in one place.", `<button class="button button-secondary" id="review-help">About priorities</button>`)}<div class="toolbar"><label class="search-box"><span>⌕</span><input id="review-search" placeholder="Search findings, assets, or owners" /></label><select class="filter-select" id="review-filter"><option value="open">Open items</option><option value="all">All statuses</option><option value="Needs Verification">Needs verification</option><option value="Approved">Approved</option><option value="Dismissed">Dismissed</option></select><select class="filter-select" id="review-sort"><option value="priority">Priority: high to low</option><option value="newest">Most recent</option></select></div><div class="subpage-layout"><div class="subpage-main"><div class="panel table-panel queue-card" id="queue-list"></div></div><aside class="subpage-side"><div class="side-card"><div class="section-kicker">REVIEW GUIDE</div><h3>People make the call</h3><p>Every finding is a prompt to check the asset and its source. A high priority means the effective date has passed or evidence is missing, not that a claim is false.</p><div class="side-list"><div>New <strong>Awaiting review</strong></div><div>Needs verification <strong>Evidence missing</strong></div><div>Sent for correction <strong>Owner updating</strong></div><div>Approved <strong>Human decision</strong></div></div></div><div class="side-card"><h3>Current scan</h3><p>Pricing change · completed Nov 2 at 9:42 AM</p><div class="side-list"><div>Files checked <strong>${state.assets.length}</strong></div><div>Findings returned <strong>${state.findings.length}</strong></div><div>Unsupported files <strong>0</strong></div></div></div></aside></div>`;
  }
  function renderQueue() {
    const target = $("#queue-list"); if (!target) return;
    let fs = [...state.findings]; const filter = $("#review-filter")?.value || "open";
    if (filter === "open") fs = fs.filter(f => !["Approved", "Dismissed"].includes(f.status)); else if (filter !== "all") fs = fs.filter(f => f.status === filter);
    const q = ($("#review-search")?.value || "").toLowerCase();
    if (q) fs = fs.filter(f => `${f.title} ${state.assets[f.asset]?.name || ""} ${f.owner} ${f.id}`.toLowerCase().includes(q));
    if (($("#review-sort")?.value || "priority") === "priority") fs.sort((a,b) => ({High:0,Medium:1,Low:2}[a.severity] - {High:0,Medium:1,Low:2}[b.severity]));
    target.innerHTML = fs.length ? fs.map(f => {
      const a = f.asset == null ? null : state.assets[f.asset];
      const quote = a?.excerpt || f.title;
      const old = quote.match(/₹\s?\d[\d,]*/)?.[0] || "";
      const cleaned = old ? quote.replace(old, `<del>${esc(old)}</del>`) : esc(quote);
      const snippet = f.type === "price" ? `${cleaned.replace(/<del>.*?<\/del>/, `<del>${esc(old || "₹499")}</del>`)} <em>→ ₹${Number(state.price).toLocaleString("en-IN")}/month</em>` : esc(quote);
      return `<article class="queue-item"><div class="queue-priority-bar ${f.severity.toLowerCase()}"></div><div class="queue-content"><div class="queue-title-row"><strong>${esc(f.title)}</strong><span class="priority ${sevClass(f.severity)}">${esc(f.severity)}</span><span class="status-label ${statusClass(f.status)}">${esc(f.status)}</span></div><p>${esc(a?.name || "Registered claim")} · ${esc(f.reason)}</p><div class="queue-evidence"><span class="evidence-label">${f.type === "price" ? "ASSET EXCERPT · CURRENT APPROVED FACT" : f.type === "claim" ? "CLAIM · SOURCE STATUS" : "BRAND GUIDANCE · REVIEW NOTE"}</span><span class="evidence-quote">${snippet}</span></div><div class="queue-meta"><span>${esc(f.id)}</span><span>Confidence: ${esc(f.confidence)}</span><span>Owner: ${esc(f.owner)}</span></div></div><div class="queue-actions">${f.status === "Needs Verification" ? `<button class="tiny-action" data-finding-action="${f.id}" data-action="attach">Attach evidence</button>` : `<button class="tiny-action primary" data-finding-action="${f.id}" data-action="confirm">Confirm issue</button>`}<button class="tiny-action" data-finding-action="${f.id}" data-action="correction">Send for correction</button><button class="tiny-action" data-finding-action="${f.id}" data-action="dismiss">Dismiss</button></div></article>`;
    }).join("") : `<div class="empty-state"><strong>Nothing in this view</strong>Try the all statuses filter to review completed decisions.</div>`;
  }
  function assetsView() {
    const actions = `<button class="button button-secondary" id="asset-register">＋ Register content</button><button class="button button-dark" id="add-assets">↑ Upload assets</button>`;
    return `${heading("ASSET LIBRARY", "Indexed content", "Uploaded assets and manually registered campaign copy available for review.", actions)}<div class="toolbar"><label class="search-box"><span>⌕</span><input id="asset-search" placeholder="Search the asset library" /></label><select class="filter-select" id="asset-group"><option value="all">All channels</option><option>Paid social</option><option>Website</option><option>Email</option><option>Sales enablement</option><option>Brand guidelines</option></select><select class="filter-select" id="asset-state"><option value="all">All statuses</option><option>Needs review</option><option>Reviewed</option></select></div><div id="asset-table"></div><div class="footnote" style="margin-top:12px"><span class="footnote-dot"></span> Supported demo inputs: text, CSV/JSON, PNG/JPG, and text-based PDFs. Images are represented by sample extracted text.</div>`;
  }
  function renderAssetTable() {
    const target = $("#asset-table"); if (!target) return;
    let assets = [...state.assets]; const q = ($("#asset-search")?.value || "").toLowerCase(); const group = $("#asset-group")?.value || "all"; const stat = $("#asset-state")?.value || "all";
    if (q) assets = assets.filter(a => `${a.name} ${a.group} ${a.finding}`.toLowerCase().includes(q));
    if (group !== "all") assets = assets.filter(a => a.group === group);
    if (stat !== "all") assets = assets.filter(a => a.status === stat);
    target.innerHTML = assetTable(assets, "assets");
  }
  function factsView() {
    return `${heading("BRAND KNOWLEDGE HUB", "Approved facts", "A versioned source of truth for the information your content should use.", `<button class="button button-secondary" id="update-price">↻ Update plan price</button><button class="button button-dark" id="add-fact">＋ Add approved fact</button>`)}<div class="subpage-layout"><div class="subpage-main"><div class="toolbar"><label class="search-box"><span>⌕</span><input id="fact-search" placeholder="Search approved facts" /></label><select class="filter-select" id="fact-filter"><option value="all">All fact types</option><option value="Review due">Review due</option></select></div><div class="panel table-panel"><div class="fact-table-head"><span>FACT</span><span>APPROVED VALUE</span><span>SCOPE</span><span>STATUS</span></div><div id="fact-list"></div></div></div><aside class="subpage-side"><div class="side-card"><div class="section-kicker">SOURCE OF TRUTH</div><h3>Keep a clear record</h3><p>Each fact can include its source, scope, effective date, reviewer, and version. A change creates a new version and can trigger an impact scan.</p><div class="mini-fact"><span>PRICING FACT · VERSION 2</span><strong>₹${Number(state.price).toLocaleString("en-IN")} / month</strong><span class="fact-meta">Effective Nov 2, 2026 · approved by Ayan</span></div><div class="divider"></div><div class="side-list"><div>Facts in this workspace <strong>${state.facts.length}</strong></div><div>Sources needing review <strong>1</strong></div></div></div><div class="side-card"><h3>Approval and evidence</h3><p>Company approval records who accepted a fact. It does not independently prove an external promotional claim.</p></div></aside></div>`;
  }
  function renderFacts() {
    const target = $("#fact-list"); if (!target) return;
    let facts = [...state.facts]; const q = ($("#fact-search")?.value || "").toLowerCase(); const filter = $("#fact-filter")?.value || "all";
    if (q) facts = facts.filter(f => `${f.name} ${f.value} ${f.source}`.toLowerCase().includes(q));
    if (filter !== "all") facts = facts.filter(f => f.status === filter);
    target.innerHTML = facts.map(f => `<div class="fact-row"><div><strong>${esc(f.name)}</strong><br><span>${esc(f.source)}</span></div><div class="fact-value">${esc(f.value)}</div><span>${esc(f.scope)}</span><span class="status-label ${f.status === "Current" ? "status-ok" : "status-verify"}">${esc(f.status)}</span></div>`).join("") || `<div class="empty-state">No facts match this search.</div>`;
  }
  function claimsView() {
    return `${heading("CLAIM VERIFICATION ASSISTANT", "Claims and evidence", "Evidence status helps reviewers decide what to verify. Missing evidence is not a verdict that a claim is false.", `<button class="button button-dark" id="add-claim">＋ Register claim</button>`)}<div class="subpage-layout"><div class="subpage-main"><div class="toolbar"><label class="search-box"><span>⌕</span><input id="claim-search" placeholder="Search claims or sources" /></label><select class="filter-select" id="claim-filter"><option value="all">All statuses</option><option>Needs Verification</option><option>Source not independently verified</option><option>Evidence attached</option></select></div><div class="panel table-panel"><div class="table-head" style="grid-template-columns:1.2fr 1fr .9fr 30px"><span>CLAIM</span><span>ASSET &amp; EVIDENCE</span><span>STATUS</span><span></span></div><div id="claim-list"></div></div></div><aside class="subpage-side"><div class="side-card"><div class="section-kicker">REVIEW STANDARD</div><h3>Show what is known</h3><p>BrandGuard records a claim, its source, date, scope, and evidence status. Human reviewers decide whether support is adequate for publication.</p><div class="divider"></div><div class="side-list"><div>Evidence attached <strong>Source provided</strong></div><div>Needs verification <strong>Missing / uncertain</strong></div><div>Verified <strong>Within source scope</strong></div></div></div><div class="side-card"><h3>Source checks</h3><p>Sample entries are illustrative. No external registry or evidence database is connected in this demo.</p></div></aside></div>`;
  }
  function renderClaims() {
    const target = $("#claim-list"); if (!target) return;
    let list = [...state.claims]; const q = ($("#claim-search")?.value || "").toLowerCase(); const f = $("#claim-filter")?.value || "all";
    if (q) list = list.filter(c => `${c.claim} ${c.asset} ${c.source}`.toLowerCase().includes(q)); if (f !== "all") list = list.filter(c => c.status === f);
    target.innerHTML = list.map((c, i) => `<div class="table-row" style="grid-template-columns:1.2fr 1fr .9fr 30px"><div class="asset-name"><strong>${esc(c.claim)}</strong><span>${esc(c.scope)} · ${esc(c.date)}</span></div><div class="asset-name"><strong>${esc(c.asset)}</strong><span>${esc(c.source)}</span></div><div><span class="claim-status">${esc(c.status)}</span></div><button class="table-more" data-claim-detail="${i}">···</button></div>`).join("") || `<div class="empty-state">No claims match this search.</div>`;
  }
  function insightsView() {
    return `${heading("MARKET PRICE & TREND INSIGHTS", "Market context for decisions", "An illustrative view of how transparent, source-backed market guidance could support a pricing discussion.", `<button class="button button-secondary" id="save-insight">☆ Save for later</button>`)}<div class="insight-hero"><span class="section-kicker">SAMPLE MARKET SNAPSHOT · ILLUSTRATIVE DATA</span><span class="beta-label">BETA</span><h2>Understand your price in context</h2><p>Market figures below are sample values for this prototype. They are not collected from live competitor listings and should not guide a real pricing decision.</p><div class="market-controls"><select id="market-category"><option>Subscription productivity software</option><option>Project management tools</option><option>Marketing software</option></select><select id="market-region"><option>India · monthly plans</option><option>Global · monthly plans</option></select><button id="refresh-market">View sample snapshot</button></div></div><div class="market-grid"><div class="panel range-panel"><div class="panel-heading"><div><div class="section-kicker">INDICATIVE MONTHLY RANGE</div><h2>Comparable plan prices</h2></div><span class="status-label status-verify">Illustrative sample</span></div><div class="range-display"><div><span>Lower observed example</span><strong>₹399</strong></div><div style="text-align:right"><span>Upper observed example</span><strong>₹899</strong></div></div><div class="range-track"><i class="range-marker"></i></div><div class="range-labels"><span>₹399</span><span>Your price · ₹${Number(state.price)}</span><span>₹899</span></div><p class="source-note">Sample range for demo purposes · Market, date, product features, tax, discounts, and seller affect comparability. No data source is connected.</p></div><div class="panel range-panel"><div class="panel-heading"><div><div class="section-kicker">SAMPLE TREND</div><h2>Price movement</h2></div></div><div class="trend-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="trend-months"><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span></div><p class="source-note">Illustrative index, not a sourced historical series.</p></div></div><div class="panel" style="margin-top:13px;padding:15px 17px"><div class="section-kicker">AI-GENERATED INTERPRETATION · SAMPLE</div><div class="insight-advice"><span class="advice-star">✳</span><p><strong>Consider reviewing the plan comparison.</strong> This illustrative price falls within the sample range shown. Check feature coverage and source freshness before changing a price. This demo has no live market data, and it will not change or publish your approved price.</p></div></div>`;
  }
  function auditView() {
    return `${heading("AUDIT HISTORY", "Decisions and changes", "A traceable record of fact updates, scan runs, reviewer decisions, and rechecks.", `<button class="button button-secondary" id="audit-export">↓ Export history</button>`)}<div class="toolbar"><label class="search-box"><span>⌕</span><input id="audit-search" placeholder="Search events, people, or asset names" /></label><select class="filter-select" id="audit-filter"><option value="all">All event types</option><option value="fact">Fact changes</option><option value="review">Review decisions</option><option value="scan">Scans</option></select></div><div class="panel table-panel"><div class="audit-list" id="audit-list"></div></div>`;
  }
  function renderAudit() {
    const target = $("#audit-list"); if (!target) return;
    let entries = [...state.audit]; const q = ($("#audit-search")?.value || "").toLowerCase(); const filter = $("#audit-filter")?.value || "all";
    if (q) entries = entries.filter(a => `${a.title} ${a.body} ${a.status}`.toLowerCase().includes(q));
    if (filter === "fact") entries = entries.filter(a => a.title.toLowerCase().includes("fact") || a.title.toLowerCase().includes("price"));
    if (filter === "scan") entries = entries.filter(a => a.title.toLowerCase().includes("scan"));
    if (filter === "review") entries = entries.filter(a => !a.title.toLowerCase().includes("scan") && !a.title.toLowerCase().includes("price") && !a.title.toLowerCase().includes("fact"));
    target.innerHTML = entries.map(a => `<div class="audit-entry"><time>${esc(a.time)}</time><span class="audit-icon">${esc(a.icon)}</span><div class="audit-copy"><strong>${esc(a.title)}</strong><p>${esc(a.body)}</p></div><span class="status-label status-review">${esc(a.status)}</span></div>`).join("") || `<div class="empty-state">No matching activity.</div>`;
  }
  function settingsView() {
    const rows = [
      ["Show scan confidence", "Show match confidence alongside each finding."],
      ["Require human approval", "Keep a reviewer decision before closing findings."],
      ["Display demo limitations", "Label sample data and disconnected channels."],
      ["Show market insights beta", "Display illustrative market insight screens."]
    ];
    return `${heading("WORKSPACE SETTINGS", "Settings", "Demo workspace preferences and content handling controls.", `<button class="button button-secondary" id="reset-demo">Reset demo data</button>`)}<div class="settings-grid"><div class="settings-card"><h3>Review workflow</h3><p>Configure how findings appear in this local prototype.</p>${rows.slice(0,2).map((r,i)=>`<div class="toggle-row"><div class="toggle-copy"><strong>${r[0]}</strong><span>${r[1]}</span></div><button class="toggle on" aria-label="Toggle ${r[0]}"></button></div>`).join("")}</div><div class="settings-card"><h3>Transparency</h3><p>Keep scope and limitations visible to workspace users.</p>${rows.slice(2).map((r,i)=>`<div class="toggle-row"><div class="toggle-copy"><strong>${r[0]}</strong><span>${r[1]}</span></div><button class="toggle on" aria-label="Toggle ${r[0]}"></button></div>`).join("")}</div><div class="settings-card"><h3>Data and privacy</h3><p>This demo stores changes in browser local storage on this device. It does not upload files to a server. The production safeguards in the PRD (workspace separation, access controls, retention, deletion, and AI processing disclosure) would need a secure backend before real client material is used.</p></div><div class="settings-card"><h3>Connected channels</h3><p>No live channels are connected. The impact scan only covers sample assets and any supported files added during this session.</p><span class="status-label status-verify">No integrations connected</span></div></div>`;
  }
  const viewFns = { impact: impactView, reviews: reviewsView, assets: assetsView, facts: factsView, claims: claimsView, insights: insightsView, audit: auditView, settings: settingsView };
  const viewNames = { overview: "Overview", impact: "Change impact", reviews: "Review queue", assets: "Asset library", facts: "Brand facts", claims: "Claim checks", insights: "Market insights", audit: "Audit history", settings: "Settings" };
  function navigate(name) {
    const view = viewNames[name] ? name : "overview";
    $$(".page-view").forEach(s => s.classList.toggle("visible", s.id === `view-${view}`));
    $$(".nav-item[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    $("#breadcrumb-current").textContent = viewNames[view];
    if (viewFns[view]) $("#view-" + view).innerHTML = viewFns[view]();
    if (view === "impact") renderImpactTable(); if (view === "reviews") renderQueue(); if (view === "assets") renderAssetTable(); if (view === "facts") renderFacts(); if (view === "claims") renderClaims(); if (view === "audit") renderAudit();
    $("#sidebar").classList.remove("open"); window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", `#${view}`);
  }
  function toast(message) {
    const stack = $("#toast-stack"); const el = document.createElement("div"); el.className = "toast"; el.innerHTML = `<span>✓</span>${esc(message)}`; stack.append(el); setTimeout(() => el.remove(), 3400);
  }
  function modal(title, subtitle, body, submitLabel, onSubmit) {
    $("#modal-content").innerHTML = `<div class="section-kicker">STUDIO NORTH</div><h2 id="modal-title">${title}</h2><p>${subtitle}</p>${body}<div class="modal-actions"><button class="button button-secondary" id="modal-cancel">Cancel</button><button class="button button-dark" id="modal-submit">${submitLabel}</button></div>`;
    $("#modal-backdrop").hidden = false;
    $("#modal-close").onclick = closeModal; $("#modal-cancel").onclick = closeModal;
    $("#modal-submit").onclick = () => { if (onSubmit) onSubmit(); };
    setTimeout(() => $("#modal-content input")?.focus(), 50);
  }
  function closeModal() { $("#modal-backdrop").hidden = true; }
  function runScan() {
    let matches = 0;
    state.assets.forEach((asset, index) => {
      const prices = [...asset.excerpt.matchAll(/₹\s?([\d,]+)/g)].map(m => Number(m[1].replace(/,/g, "")));
      const oldPrice = prices.find(value => value !== Number(state.price));
      if (oldPrice) {
        matches++;
        asset.status = "Needs review"; asset.finding = `Old price · ₹${oldPrice} / month`;
        const exists = state.findings.some(f => f.asset === index && f.type === "price" && !["Approved", "Dismissed"].includes(f.status));
        if (!exists) state.findings.unshift({ id: `F-${Date.now().toString().slice(-3)}${index}`, title: "Outdated monthly price", type: "price", asset: index, severity: "Medium", status: "New", source: "Change impact", time: "Just now", owner: "Unassigned", reason: `This asset contains ₹${oldPrice}, which differs from the current approved price of ₹${state.price}. A reviewer should confirm the plan and date match.`, suggestion: "Review and correct the source asset, then recheck.", confidence: "High" });
      }
    });
    const checked = state.assets.length;
    toast(`Impact scan complete · ${checked} indexed assets checked · ${matches} price matches`);
    state.audit.unshift({ time: "Just now", icon: "⌕", title: "Change impact scan completed", body: `${checked} indexed demo assets checked. ${matches} potential price matches returned for human review.`, status: `${matches} matches` });
    state.activity.unshift({ icon: "⌕", tone: "change", title: "Impact scan completed", detail: `${checked} indexed assets checked · ${matches} potential price matches`, time: "Just now" }); state.activity = state.activity.slice(0,3); persist();
    if ($("#view-impact").classList.contains("visible")) renderImpactTable();
    if ($("#view-reviews").classList.contains("visible")) renderQueue();
  }
  function showAssetDetail(i) {
    const a = state.assets[i]; if (!a) return;
    const f = state.findings.find(x => x.asset === i && !["Approved", "Dismissed"].includes(x.status));
    const body = `<div class="form-field"><label>CONTENT EXCERPT</label><textarea readonly>${esc(a.excerpt)}</textarea></div><div class="form-grid"><div class="form-field"><label>ASSET TYPE</label><input readonly value="${esc(a.type)} · ${esc(a.group)}" /></div><div class="form-field"><label>PROCESSING STATUS</label><input readonly value="${esc(a.status)}" /></div></div><div class="modal-notice">${esc(a.finding)}. Registered assets are indexed as sample text. Uploaded images and PDFs are not processed by an AI/OCR service in this browser demo.</div>`;
    modal("Asset details", a.name, body, f ? "Open finding" : "Done", () => { closeModal(); if (f) { navigate("reviews"); setTimeout(() => document.querySelector(`[data-finding-action="${f.id}"]`)?.scrollIntoView({behavior:"smooth",block:"center"}),120); } });
  }
  function changeFinding(id, action) {
    const f = state.findings.find(x => x.id === id); if (!f) return;
    if (action === "attach") {
      const body = `<div class="form-field"><label>SUPPORTING SOURCE</label><input id="evidence-source" placeholder="Source title or URL" /></div><div class="form-field"><label>DATE AND SCOPE</label><input id="evidence-scope" placeholder="e.g. India · annual plans · current through Dec 2026" /></div><div class="modal-notice">Adding a source records it for reviewer assessment. This demo does not independently verify external sources.</div>`;
      modal("Add claim evidence", "Attach a source and scope for a human reviewer to assess.", body, "Save evidence", () => {
        const source = $("#evidence-source").value.trim(); if (!source) return toast("Add a source before saving");
        const claim = state.claims.find(c => c.claim === f.claimText) || state.claims.find(c => c.claim.includes("35%")); if (claim) { claim.source = source; claim.scope = $("#evidence-scope").value || claim.scope; claim.status = "Source not independently verified"; claim.date = "Added just now · needs review"; }
        f.status = "In Review"; f.owner = "Ayan Sharma"; recordDecision(f, "Evidence attached for review"); closeModal(); persist(); navigate("reviews"); toast("Evidence attached · independent check still needed");
      }); return;
    }
    const next = action === "confirm" ? "Confirmed issue" : action === "correction" ? "Sent for Correction" : "Dismissed";
    f.status = next; f.owner = "Ayan Sharma"; recordDecision(f, next);
    const a = f.asset == null ? null : state.assets[f.asset]; if (a && next === "Sent for Correction") a.status = "Needs review";
    persist(); renderQueue(); toast(next === "Dismissed" ? "Finding dismissed · decision recorded" : `${next} · decision recorded`);
  }
  function recordDecision(f, label) { state.audit.unshift({ time: "Just now", icon: label === "Dismissed" ? "×" : "✓", title: `Finding ${f.id}: ${label}`, body: `${f.title} · ${(f.asset == null ? null : state.assets[f.asset])?.name || "Claim"} · reviewed by Ayan Sharma.`, status: label }); }

  function addFact() {
    const body = `<div class="form-grid"><div class="form-field full"><label>APPROVED FACT</label><input id="new-fact-name" placeholder="e.g. Support response time" /></div><div class="form-field"><label>APPROVED VALUE</label><input id="new-fact-value" placeholder="e.g. Within 1 business day" /></div><div class="form-field"><label>APPLIES TO</label><select id="new-fact-scope"><option>All channels</option><option>Website, email</option><option>Paid social</option><option>Sales enablement</option></select></div><div class="form-field full"><label>SOURCE</label><input id="new-fact-source" placeholder="Approved document or URL" /></div></div>`;
    modal("Add approved fact", "Add a source and scope so future reviews can show the basis for a match.", body, "Save fact", () => {
      const name = $("#new-fact-name").value.trim(), value = $("#new-fact-value").value.trim(); if (!name || !value) return toast("Add a fact name and approved value");
      state.facts.unshift({ name, value, source: $("#new-fact-source").value || "Source not attached · needs review", scope: $("#new-fact-scope").value, status: "Current" }); state.audit.unshift({ time: "Just now", icon: "◇", title: `Approved fact added: ${name}`, body: `Value: ${value} · added by Ayan Sharma.`, status: "Fact v1" }); closeModal(); persist(); navigate("facts"); toast("Approved fact added to workspace");
    });
  }
  function changePrice() {
    const body = `<div class="form-grid"><div class="form-field"><label>NEW MONTHLY PRICE (₹)</label><input id="new-price" type="number" min="1" value="${Number(state.price)}" /></div><div class="form-field"><label>EFFECTIVE DATE</label><input id="effective-date" type="date" value="2026-11-02" /></div><div class="form-field full"><label>SOURCE</label><input id="price-source" value="Pricing page" /></div><div class="form-field full"><label>REVIEW NOTE</label><textarea id="price-note" placeholder="Optional context for reviewers"></textarea></div></div><div class="modal-notice">This demo records the new approved value and surfaces registered assets that still mention ₹499. It does not publish changes to live channels.</div>`;
    modal("Update monthly plan price", "Record the approved fact change. A new version and impact review will be created.", body, "Save and scan", () => {
      const val = Number($("#new-price").value); if (!val || val < 1) return toast("Enter a valid price"); const prev = state.price; state.price = val;
      state.facts.unshift({ name: "Monthly plan price", value: `₹${val} / month`, source: `Pricing page · approved Nov 2`, scope: "All channels", status: "Current" });
      const found = state.assets.map((a,i) => ({a,i})).filter(({a}) => a.excerpt.includes(`₹${prev}`) || a.finding.includes(`₹${prev}`));
      found.forEach(({a,i}) => { a.status = "Needs review"; a.finding = `Old price · ₹${prev} / month`; if (!state.findings.some(f => f.asset === i && f.type === "price" && !["Approved","Dismissed"].includes(f.status))) state.findings.unshift({ id: `F-${Date.now().toString().slice(-3)}${i}`, title: "Outdated monthly price", type: "price", asset: i, severity: i < 3 ? "High" : "Medium", status: "New", source: "Change impact", time: "Just now", owner: "Unassigned", reason: `This asset still shows ₹${prev} after the approved price changed to ₹${val}. Confirm the match and check whether the asset remains active.`, suggestion: "Update the source asset and upload the revised version for recheck.", confidence: "High" }); });
      state.audit.unshift({ time: "Just now", icon: "↻", title: "Monthly plan price changed", body: `₹${prev} → ₹${val} / month · effective ${$("#effective-date").value || "date not set"}. Source: ${$("#price-source").value || "not provided"}. Approved by Ayan Sharma.`, status: "Fact v3" });
      state.audit.unshift({ time: "Just now", icon: "⌕", title: "Change impact scan completed", body: `${found.length} sample assets mention the prior price. Matches were added for human review.`, status: `${found.length} findings` });
      closeModal(); persist(); navigate("impact"); toast(`Fact updated · ${found.length} potential matches found`);
    });
  }
  function registerAsset() {
    const body = `<div class="form-grid"><div class="form-field full"><label>CONTENT NAME</label><input id="reg-name" placeholder="e.g. November renewal email" /></div><div class="form-field"><label>CHANNEL</label><select id="reg-group"><option>Email</option><option>Website</option><option>Paid social</option><option>Sales enablement</option></select></div><div class="form-field"><label>CONTENT TYPE</label><select id="reg-type"><option>TXT</option><option>PDF</option><option>JPG</option></select></div><div class="form-field full"><label>REGISTERED TEXT</label><textarea id="reg-text" placeholder="Paste the content excerpt to include in the change impact scan"></textarea></div></div><div class="modal-notice">Text is stored in this browser only. Registering sample copy makes the entered text searchable by the demo scan.</div>`;
    modal("Register campaign content", "Add text from an asset so the prototype can check it against approved facts.", body, "Register content", () => {
      const name = $("#reg-name").value.trim(), excerpt = $("#reg-text").value.trim(); if (!name || !excerpt) return toast("Add a name and content excerpt"); const match = excerpt.match(/₹\s?([\d,]+)/);
      state.assets.push({ name, type: $("#reg-type").value, group: $("#reg-group").value, uploaded: "Just now", status: match && Number(match[1].replace(/,/g,"")) !== Number(state.price) ? "Needs review" : "Reviewed", finding: match && Number(match[1].replace(/,/g,"")) !== Number(state.price) ? `Old price · ₹${match[1]}` : "No open findings", priority: match ? "Medium" : "—", excerpt });
      if (match && Number(match[1].replace(/,/g,"")) !== Number(state.price)) state.findings.unshift({ id: `F-${Date.now().toString().slice(-4)}`, title: "Possible outdated price", type: "price", asset: state.assets.length - 1, severity: "Medium", status: "New", source: "Registered content", time: "Just now", owner: "Unassigned", reason: `Registered text includes ₹${match[1]}, which differs from the current approved price of ₹${state.price}. A reviewer should confirm the product and scope match.`, suggestion: "Review the excerpt against the approved pricing source.", confidence: "Medium" });
      state.audit.unshift({ time: "Just now", icon: "↑", title: `Content registered: ${name}`, body: `${$("#reg-group").value} · text indexed for impact checks.`, status: "Indexed" }); closeModal(); persist(); navigate("assets"); toast("Campaign text registered and indexed");
    });
  }
  function addClaim() {
    const body = `<div class="form-grid"><div class="form-field full"><label>EXACT PROMOTIONAL CLAIM</label><input id="claim-text" placeholder="e.g. Cuts reporting time in half" /></div><div class="form-field"><label>ASSET</label><input id="claim-asset" placeholder="Campaign or asset name" /></div><div class="form-field"><label>CLAIM SCOPE</label><input id="claim-scope" placeholder="Product, market, period" /></div><div class="form-field full"><label>EVIDENCE SOURCE (OPTIONAL)</label><input id="claim-source" placeholder="Source URL or document title" /></div></div><div class="modal-notice">A missing source will be marked Needs Verification, not treated as proof that the claim is false.</div>`;
    modal("Register a claim", "Record the exact wording and the evidence a reviewer should assess.", body, "Save claim", () => {
      const claim = $("#claim-text").value.trim(); if (!claim) return toast("Enter the exact claim wording"); const source = $("#claim-source").value.trim(); const status = source ? "Source not independently verified" : "Needs Verification";
      state.claims.unshift({ claim, asset: $("#claim-asset").value || "Registered claim", source: source || "No source attached", date: "Review due · added just now", status, scope: $("#claim-scope").value || "Scope not specified" });
      state.findings.unshift({ id: `F-${Date.now().toString().slice(-4)}`, title: "Promotional claim needs review", type: "claim", asset: null, claimText: claim, severity: "Medium", status, source: "Claim check", time: "Just now", owner: "Unassigned", reason: source ? "A source is attached but has not been independently checked for this claim's scope." : "No supporting source is attached to this promotional claim.", suggestion: "Add relevant evidence and have a human reviewer assess its date and scope.", confidence: "Medium" });
      state.audit.unshift({ time: "Just now", icon: "◎", title: "Promotional claim registered", body: `${claim} · status: ${status}.`, status }); closeModal(); persist(); navigate("claims"); toast(`Claim saved · ${status}`);
    });
  }
  function uploadFiles(files) {
    [...files].forEach(file => {
      const ext = file.name.split(".").pop().toLowerCase(); const type = ["jpg","jpeg","png"].includes(ext) ? "JPG" : ext === "pdf" ? "PDF" : "TXT";
      const supported = ["txt","csv","json","pdf","jpg","jpeg","png"].includes(ext); let excerpt = `[${ext.toUpperCase()} file uploaded. Text extraction is simulated in this browser demo.]`;
      const add = text => {
        const match = text.match(/₹\s?([\d,]+)/); const index = state.assets.length;
        const old = match && Number(match[1].replace(/,/g,"")) !== Number(state.price);
        state.assets.push({ name: file.name, type, group: "Uploaded assets", uploaded: "Just now", status: old ? "Needs review" : "Reviewed", finding: supported ? (old ? `Possible old price · ₹${match[1]}` : "Indexed · no exact price mismatch") : "Unsupported format", priority: old ? "Medium" : "—", excerpt: text.slice(0,500) });
        if (old) state.findings.unshift({ id: `F-${Date.now().toString().slice(-4)}`, title: "Possible outdated price", type: "price", asset: index, severity: "Medium", status: "New", source: "Uploaded asset", time: "Just now", owner: "Unassigned", reason: `Extracted text includes ₹${match[1]}, which may refer to the old plan price. Confirm its context.`, suggestion: "Review the uploaded asset and verify the plan match.", confidence: "Medium" });
        state.audit.unshift({ time: "Just now", icon: "↑", title: `Asset uploaded: ${file.name}`, body: supported ? "Indexed in this browser demo. Text extraction may be incomplete." : "Format not supported by this prototype.", status: supported ? "Indexed" : "Unsupported" });
      };
      if (["txt","csv","json"].includes(ext)) file.text().then(add); else add(excerpt);
    });
    setTimeout(() => { persist(); navigate("assets"); toast(`${files.length} file${files.length===1?"":"s"} added to the demo library`); }, 120);
  }
  function exportCsv(rows, filename) {
    const csv = rows.map(row => row.map(v => `"${String(v ?? "").replace(/"/g,'""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\ufeff",csv], {type:"text/csv;charset=utf-8"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url); toast("Report exported as CSV");
  }
  function downloadImpact() { exportCsv([["Asset","Finding","Detected content","Approved price","Priority","Status"], ...state.assets.filter(a=>a.status==="Needs review").map(a=>[a.name,a.finding,a.excerpt,`₹${state.price}/month`,a.priority,a.status])],"brandguard-impact-report.csv"); }
  function downloadAudit() { exportCsv([["Time","Event","Details","Status"],...state.audit.map(a=>[a.time,a.title,a.body,a.status])],"brandguard-audit-history.csv"); }

  document.addEventListener("click", e => {
    const nav = e.target.closest("[data-view]"); if (nav) { navigate(nav.dataset.view); return; }
    const go = e.target.closest("[data-go]"); if (go) { navigate(go.dataset.go); return; }
    const bannerClose = e.target.closest(".banner-close"); if (bannerClose) { bannerClose.closest(".notice-banner").remove(); return; }
    if (e.target.closest("#mobile-menu")) { $("#sidebar").classList.toggle("open"); return; }
    if (e.target.closest("#start-scan")) { runScan(); return; }
    const reviewAction = e.target.closest("[data-finding-action]"); if (reviewAction) { changeFinding(reviewAction.dataset.findingAction, reviewAction.dataset.action); return; }
    const assetDetail = e.target.closest("[data-asset-detail]"); if (assetDetail) { showAssetDetail(Number(assetDetail.dataset.assetDetail)); return; }
    const findingRow = e.target.closest("[data-open-finding]"); if (findingRow) { navigate("reviews"); return; }
    if (e.target.closest("#impact-export")) { downloadImpact(); return; }
    if (e.target.closest("#add-fact")) { addFact(); return; }
    if (e.target.closest("#update-price")) { changePrice(); return; }
    if (e.target.closest("#add-claim")) { addClaim(); return; }
    if (e.target.closest("#asset-register")) { registerAsset(); return; }
    if (e.target.closest("#add-assets")) { $("#file-picker").click(); return; }
    if (e.target.closest("#audit-export")) { downloadAudit(); return; }
    if (e.target.closest("#review-help")) { modal("About review priorities", "Priority helps teams choose what to review first.", `<div class="side-list"><div>High <strong>Effective date passed or evidence missing</strong></div><div>Medium <strong>Potential mismatch needs context</strong></div><div>Low <strong>Subjective rule needs human judgment</strong></div></div><div class="modal-notice">Priority describes review urgency. It does not establish that a claim is false or that an asset is definitely incorrect.</div>`, "Got it", closeModal); return; }
    if (e.target.closest("#save-insight")) { toast("Sample insight saved for later"); return; }
    if (e.target.closest("#refresh-market")) { toast("This sample snapshot has no live market source"); return; }
    if (e.target.closest("#reset-demo")) { localStorage.removeItem("brandguard-demo-state"); state=load(); persist(); navigate("overview"); toast("Demo data reset"); return; }
    if (e.target.closest("#modal-close") || e.target.closest("#modal-cancel")) { closeModal(); return; }
    if (e.target.closest("[data-impact-tab]")) { $$("[data-impact-tab]").forEach(b=>b.classList.toggle("active",b===e.target.closest("button"))); window.impactTab=e.target.closest("button").dataset.impactTab; renderImpactTable(); return; }
    if (e.target.closest(".toggle")) { e.target.closest(".toggle").classList.toggle("on"); return; }
    const claimDetail = e.target.closest("[data-claim-detail]"); if (claimDetail) { const c=state.claims[Number(claimDetail.dataset.claimDetail)]; modal("Claim evidence", "Review the source and scope before making a publication decision.", `<div class="form-field"><label>EXACT CLAIM</label><textarea readonly>${esc(c.claim)}</textarea></div><div class="form-grid"><div class="form-field"><label>SOURCE</label><input readonly value="${esc(c.source)}" /></div><div class="form-field"><label>STATUS</label><input readonly value="${esc(c.status)}" /></div><div class="form-field full"><label>DATE &amp; SCOPE</label><input readonly value="${esc(c.date)} · ${esc(c.scope)}" /></div></div><div class="modal-notice">BrandGuard has not independently verified this source. A reviewer determines whether it supports the claim.</div>`, "Close", closeModal); return; }
  });
  document.addEventListener("input", e => {
    if (["impact-search","impact-filter"].includes(e.target.id)) renderImpactTable();
    if (["review-search","review-filter","review-sort"].includes(e.target.id)) renderQueue();
    if (["asset-search","asset-group","asset-state"].includes(e.target.id)) renderAssetTable();
    if (["fact-search","fact-filter"].includes(e.target.id)) renderFacts();
    if (["claim-search","claim-filter"].includes(e.target.id)) renderClaims();
    if (["audit-search","audit-filter"].includes(e.target.id)) renderAudit();
  });
  $("#file-picker").addEventListener("change", e => { if (e.target.files.length) uploadFiles(e.target.files); e.target.value=""; });
  $("#modal-backdrop").addEventListener("click", e => { if (e.target.id === "modal-backdrop") closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeModal(); $("#sidebar").classList.remove("open"); } });
  document.addEventListener("click", e => { if (e.target.closest("#add-fact") === null && e.target.id === "add-fact") addFact(); });
  document.addEventListener("click", e => { if (e.target.closest("#fact-price-change")) changePrice(); });

  renderOverview();
  const hash = location.hash.replace("#",""); navigate(viewNames[hash] ? hash : "overview");
})();
