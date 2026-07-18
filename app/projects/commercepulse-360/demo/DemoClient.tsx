"use client";

import { useMemo, useState } from "react";

type View = "overview" | "customers" | "funnel" | "campaigns" | "products" | "experiments";
type Experiment = {
  name: string;
  hypothesis: string;
  lift: number;
  pValue: number;
  interval: string;
  srm: string;
  decision: string;
  positive: boolean;
};

const views: { id: View; label: string; short: string }[] = [
  { id: "overview", label: "Executive Overview", short: "Overview" },
  { id: "customers", label: "Customer Analytics", short: "Customers" },
  { id: "funnel", label: "Funnel & Digital", short: "Funnel" },
  { id: "campaigns", label: "Campaign Performance", short: "Campaigns" },
  { id: "products", label: "Product & Inventory", short: "Products" },
  { id: "experiments", label: "Experimentation Lab", short: "Experiments" },
];

const revenueSeries = [246, 273, 258, 301, 316, 339, 328, 354, 367, 392, 405, 418];
const marginSeries = [36.8, 37.4, 36.1, 38.2, 37.8, 39.1, 38.7, 39.4, 39.2, 40.1, 40.4, 40.8];
const segments = [
  { name: "Champions", customers: 384, revenue: 1100000, note: "High frequency and strong recent value", color: "violet" },
  { name: "Loyal", customers: 702, revenue: 1260000, note: "Stable repeat-purchase base", color: "blue" },
  { name: "Potential", customers: 518, revenue: 710000, note: "Second-purchase opportunity", color: "amber" },
  { name: "At risk", customers: 436, revenue: 480000, note: "Strong historical value, low recency", color: "coral" },
];
const funnel = [
  { stage: "Product view", value: 29957, rate: 100, median: "—" },
  { stage: "Add to cart", value: 16445, rate: 54.9, median: "4 min" },
  { stage: "Checkout", value: 9553, rate: 31.89, median: "4 min" },
  { stage: "Payment", value: 5421, rate: 18.1, median: "4 min" },
  { stage: "Purchase", value: 2692, rate: 8.99, median: "4 min" },
];
const sources = [
  { name: "Organic Search", sessions: 8180, conversion: 10.4, revenue: 792000 },
  { name: "Paid Social", sessions: 6770, conversion: 7.1, revenue: 518000 },
  { name: "Email / CRM", sessions: 5320, conversion: 13.7, revenue: 704000 },
  { name: "Paid Search", sessions: 4860, conversion: 9.3, revenue: 560000 },
  { name: "Direct", sessions: 4870, conversion: 6.8, revenue: 412000 },
];
const campaigns = [
  { name: "Always-on Search", channel: "Paid Search", spend: 168000, revenue: 386000, roas: 2.30, margin: 52000, status: "Scale" },
  { name: "Home Refresh", channel: "Email", spend: 54000, revenue: 178000, roas: 3.30, margin: 43000, status: "Scale" },
  { name: "Weekend Social", channel: "Paid Social", spend: 142000, revenue: 129000, roas: 0.91, margin: -59000, status: "Review" },
  { name: "Retargeting Display", channel: "Display", spend: 116000, revenue: 99000, roas: 0.85, margin: -61000, status: "Pause" },
  { name: "Loyalty Reorder", channel: "CRM", spend: 31000, revenue: 146000, roas: 4.71, margin: 48000, status: "Scale" },
];
const products = [
  { sku: "LHM-0142", name: "Nara side table", category: "Furniture", revenue: 186400, margin: 8.7, returns: 4.2, stock: 9, cover: 4 },
  { sku: "LHM-0088", name: "Sora lamp", category: "Lighting", revenue: 154800, margin: 42.1, returns: 2.8, stock: 164, cover: 31 },
  { sku: "LHM-0117", name: "Cala textile set", category: "Textiles", revenue: 141200, margin: 35.6, returns: 8.9, stock: 28, cover: 7 },
  { sku: "LHM-0041", name: "Lino modular chair", category: "Furniture", revenue: 136900, margin: 10.4, returns: 6.1, stock: 5, cover: 3 },
  { sku: "LHM-0159", name: "Terra vase", category: "Decor", revenue: 98400, margin: 48.2, returns: 1.7, stock: 233, cover: 48 },
];
const experiments: Experiment[] = [
  { name: "Recommendations", hypothesis: "Personalized recommendations increase purchases without increasing returns.", lift: 2.665, pValue: .0359, interval: "+0.18 pp to +5.15 pp", srm: "OK · p 0.9287", decision: "Controlled rollout", positive: true },
  { name: "Free Shipping", hypothesis: "A lower shipping threshold improves conversion while protecting margin.", lift: -.897, pValue: .5157, interval: "-3.60 pp to +1.80 pp", srm: "OK · p 0.7412", decision: "Do not implement", positive: false },
  { name: "Checkout Flow", hypothesis: "Fewer checkout steps reduce abandonment at payment.", lift: .296, pValue: .8577, interval: "-2.92 pp to +3.51 pp", srm: "OK · p 0.8834", decision: "Continue measuring", positive: false },
  { name: "Product Page", hypothesis: "Clearer product information improves progression to cart.", lift: -.232, pValue: .8575, interval: "-2.78 pp to +2.32 pp", srm: "OK · p 0.6921", decision: "No evidence", positive: false },
];

const channelFactor: Record<string, number> = { All: 1, Ecommerce: .61, Stores: .39 };
const periodFactor: Record<string, number> = { "24 months": 1, "12 months": .56, "6 months": .31 };
const categoryFactor: Record<string, number> = { All: 1, Furniture: .34, Lighting: .22, Textiles: .19, Decor: .25 };

function money(value: number) {
  return value >= 1000000 ? `US$ ${(value / 1000000).toFixed(2)}M` : `US$ ${(value / 1000).toFixed(0)}K`;
}

function number(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

export default function DemoClient() {
  const [view, setView] = useState<View>("overview");
  const [channel, setChannel] = useState("All");
  const [period, setPeriod] = useState("24 months");
  const [category, setCategory] = useState("All");
  const [experiment, setExperiment] = useState(experiments[0].name);

  const factor = channelFactor[channel] * periodFactor[period] * categoryFactor[category];
  const kpis = useMemo(() => ({
    revenue: 4236417.31 * factor,
    margin: 1650458.62 * factor,
    orders: 11295 * factor,
    customers: 2960 * Math.min(1, factor * 1.13),
    conversion: 8.99 * (channel === "Ecommerce" ? 1.07 : channel === "Stores" ? .93 : 1),
    roas: 1.0048 * (category === "All" ? 1 : 1 + (category.length % 3) * .04),
  }), [factor, channel, category]);
  const selectedExperiment = experiments.find((item) => item.name === experiment) ?? experiments[0];

  function resetFilters() {
    setChannel("All"); setPeriod("24 months"); setCategory("All");
  }

  function exportCsv() {
    let rows: (string | number)[][] = [];
    if (view === "campaigns") rows = campaigns.map((item) => Object.values(item));
    else if (view === "products") rows = products.map((item) => Object.values(item));
    else if (view === "funnel") rows = funnel.map((item) => Object.values(item));
    else rows = [["net_revenue", kpis.revenue], ["gross_margin", kpis.margin], ["orders", kpis.orders], ["customers", kpis.customers], ["conversion", kpis.conversion], ["roas", kpis.roas]];
    const content = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `growthsignal-${view}.csv`; anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="cp-demo-shell">
      <aside className="cp-demo-sidebar">
        <p>Analysis areas</p>
        {views.map((item, index) => <button key={item.id} className={view === item.id ? "active" : ""} type="button" onClick={() => setView(item.id)}><span>0{index + 1}</span>{item.label}</button>)}
        <div className="cp-sidebar-meta"><small>Data product</small><strong>Sample profile</strong><small>Seed</small><strong>20260717</strong></div>
      </aside>

      <div className="cp-demo-content">
        <section className="cp-demo-heading">
          <div><p>Luma Home Market · 24 months</p><h1>{views.find((item) => item.id === view)?.label}</h1><span>A connected view of customers, marketing, ecommerce, products and profitability.</span></div>
          <button type="button" onClick={exportCsv}>Export CSV view ↓</button>
        </section>

        <section className="cp-filterbar" aria-label="Dashboard filters">
          <label>Channel<select value={channel} onChange={(event) => setChannel(event.target.value)}><option>All</option><option>Ecommerce</option><option>Stores</option></select></label>
          <label>Period<select value={period} onChange={(event) => setPeriod(event.target.value)}><option>24 months</option><option>12 months</option><option>6 months</option></select></label>
          <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option><option>Furniture</option><option>Lighting</option><option>Textiles</option><option>Decor</option></select></label>
          <span><i /> Quality approved · 99.2%</span>
          <button type="button" onClick={resetFilters}>Clear filters</button>
        </section>

        {view === "overview" && <>
          <section className="cp-kpis">
            <article><small>Net revenue</small><strong>{money(kpis.revenue)}</strong><span>Filtered net sales</span></article>
            <article><small>Gross margin</small><strong>{money(kpis.margin)}</strong><span>38.96% of net sales</span></article>
            <article><small>Orders</small><strong>{number(kpis.orders)}</strong><span>AOV US$ 375</span></article>
            <article><small>Customers</small><strong>{number(kpis.customers)}</strong><span>67.06% repeat purchase</span></article>
            <article><small>Conversion</small><strong>{kpis.conversion.toFixed(2)}%</strong><span>Ordered funnel</span></article>
            <article><small>ROAS</small><strong>{kpis.roas.toFixed(2)}×</strong><span>Revenue / ad spend</span></article>
          </section>
          <section className="cp-overview-grid">
            <article className="cp-panel cp-trend-panel">
              <header><div><small>Commercial trend</small><h2>Revenue &amp; margin</h2></div><span>Last 12 months</span></header>
              <div className="cp-line-chart"><svg viewBox="0 0 720 220" role="img" aria-label="Revenue and margin trend"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6c5ce7" stopOpacity=".24"/><stop offset="1" stopColor="#6c5ce7" stopOpacity="0"/></linearGradient></defs><path className="area" d="M20 190 L80 170 L140 181 L200 145 L260 132 L320 112 L380 120 L440 94 L500 82 L560 59 L620 47 L700 26 L700 210 L20 210 Z"/><path className="revenue" d="M20 190 L80 170 L140 181 L200 145 L260 132 L320 112 L380 120 L440 94 L500 82 L560 59 L620 47 L700 26"/><path className="margin" d="M20 151 L80 143 L140 159 L200 132 L260 138 L320 122 L380 127 L440 117 L500 120 L560 105 L620 101 L700 94"/></svg><div>{revenueSeries.map((value, index) => <span key={value}>{index % 2 === 0 ? ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"][index] : ""}<b>{marginSeries[index]}%</b></span>)}</div></div>
            </article>
            <article className="cp-panel cp-action-panel"><small>Executive signal</small><h2>Three decisions for this week.</h2><ol><li><span>01</span><p><strong>Review 18 campaigns</strong> with negative margin after media spend.</p></li><li><span>02</span><p><strong>Protect inventory</strong> for profitable products with less than 7 days of coverage.</p></li><li><span>03</span><p><strong>Scale Recommendations</strong> through a controlled rollout with guardrails.</p></li></ol></article>
          </section>
        </>}

        {view === "customers" && <>
          <section className="cp-section-intro"><div><small>RFM + behavior</small><h2>Segments that turn a customer base into practical actions.</h2></div><p>Recency, frequency and monetary value are calculated from valid orders. Categories are interpretable and actionable for CRM.</p></section>
          <section className="cp-segment-grid">{segments.map((item) => <article key={item.name} className={`cp-segment ${item.color}`}><span>{item.name}</span><strong>{number(item.customers)}</strong><small>customers · {money(item.revenue)}</small><p>{item.note}</p></article>)}</section>
          <section className="cp-panel cp-cohort-panel"><header><div><small>Monthly retention</small><h2>First-purchase cohorts</h2></div><span>Active customers / original cohort</span></header><div className="cp-cohort-table"><div className="labels"><b>Cohort</b>{["Jan 25","Feb 25","Mar 25","Apr 25","May 25","Jun 25"].map((x)=><span key={x}>{x}</span>)}</div>{[[100,42,31,27,22,19],[100,46,34,28,24,21],[100,39,30,25,23,0],[100,44,36,29,0,0],[100,48,37,0,0,0],[100,41,0,0,0,0]].map((row,index)=><div key={index}><b>M{index}</b>{row.map((value,i)=><span key={i} style={{opacity:value === 0 ? .08 : .2 + value/125}}>{value ? `${value}%` : "—"}</span>)}</div>)}</div></section>
        </>}

        {view === "funnel" && <>
          <section className="cp-funnel-layout">
            <article className="cp-panel cp-funnel-panel"><header><div><small>Ordered journey</small><h2>Conversion by stage</h2></div><span>Final conversion 8.99%</span></header><div>{funnel.map((item,index)=><div className="cp-funnel-row" key={item.stage}><b>0{index+1}</b><span>{item.stage}<small>{number(item.value)} sessions · {item.median}</small></span><i style={{width:`${item.rate}%`}}/><strong>{item.rate.toFixed(item.rate === 100 ? 0 : 2)}%</strong></div>)}</div></article>
            <article className="cp-panel cp-device-panel"><small>Diagnosis</small><h2>The largest drop occurs before checkout.</h2><div><span>View → cart<strong>45.1% drop</strong></span><span>Cart → checkout<strong>41.9% drop</strong></span><span>Checkout → payment<strong>43.3% drop</strong></span></div><p>The metric preserves event order and excludes events rejected by quality controls.</p></article>
          </section>
          <section className="cp-panel cp-table-panel"><header><div><small>Acquisition</small><h2>Traffic sources</h2></div></header><div className="cp-table-scroll"><table><thead><tr><th>Source</th><th>Sessions</th><th>Conversion</th><th>Attributed revenue</th><th>Signal</th></tr></thead><tbody>{sources.map((item)=><tr key={item.name}><td><strong>{item.name}</strong></td><td>{number(item.sessions)}</td><td>{item.conversion}%</td><td>{money(item.revenue)}</td><td><span className={item.conversion >= 10 ? "cp-status good" : "cp-status neutral"}>{item.conversion >= 10 ? "High intent" : "Optimize"}</span></td></tr>)}</tbody></table></div></section>
        </>}

        {view === "campaigns" && <>
          <section className="cp-section-intro"><div><small>Efficiency + profitability</small><h2>ROAS is not enough: every campaign must defend its margin.</h2></div><p>Media spend, attributed revenue, CAC and post-media margin are connected to prevent scaling unprofitable growth.</p></section>
          <section className="cp-campaign-summary"><article><small>Ad spend</small><strong>US$ 1.34M</strong></article><article><small>Attributed revenue</small><strong>US$ 1.35M</strong></article><article><small>ROAS</small><strong>1.00×</strong></article><article className="warning"><small>Negative-margin campaigns</small><strong>18</strong></article></section>
          <section className="cp-panel cp-table-panel"><header><div><small>Campaign portfolio</small><h2>Decision by campaign</h2></div><span>Attribution model: last non-direct</span></header><div className="cp-table-scroll"><table><thead><tr><th>Campaign</th><th>Channel</th><th>Spend</th><th>Revenue</th><th>ROAS</th><th>Post-media margin</th><th>Action</th></tr></thead><tbody>{campaigns.map((item)=><tr key={item.name}><td><strong>{item.name}</strong></td><td>{item.channel}</td><td>{money(item.spend)}</td><td>{money(item.revenue)}</td><td>{item.roas.toFixed(2)}×</td><td className={item.margin < 0 ? "negative" : "positive"}>{money(item.margin)}</td><td><span className={`cp-status ${item.status === "Scale" ? "good" : item.status === "Pause" ? "bad" : "neutral"}`}>{item.status}</span></td></tr>)}</tbody></table></div></section>
        </>}

        {view === "products" && <>
          <section className="cp-section-intro"><div><small>Product + inventory</small><h2>Prioritize availability where margin justifies it.</h2></div><p>The view combines sales, margin, returns and coverage to distinguish demand, pricing, promotion and stock issues.</p></section>
          <section className="cp-product-grid">{products.slice(0,3).map((item)=><article key={item.sku}><span>{item.category}</span><h3>{item.name}</h3><strong>{money(item.revenue)}</strong><div><small>Margin <b className={item.margin < 12 ? "negative" : "positive"}>{item.margin}%</b></small><small>Coverage <b className={item.cover < 7 ? "negative" : ""}>{item.cover} days</b></small></div></article>)}</section>
          <section className="cp-panel cp-table-panel"><header><div><small>SKU economics</small><h2>Products that require action</h2></div><span>5 products below 12% margin</span></header><div className="cp-table-scroll"><table><thead><tr><th>SKU</th><th>Product</th><th>Revenue</th><th>Margin</th><th>Returns</th><th>Stock</th><th>Coverage</th></tr></thead><tbody>{products.map((item)=><tr key={item.sku}><td>{item.sku}</td><td><strong>{item.name}</strong><small>{item.category}</small></td><td>{money(item.revenue)}</td><td className={item.margin < 12 ? "negative" : "positive"}>{item.margin}%</td><td>{item.returns}%</td><td>{item.stock}</td><td><span className={`cp-status ${item.cover < 7 ? "bad" : item.cover < 10 ? "neutral" : "good"}`}>{item.cover} days</span></td></tr>)}</tbody></table></div></section>
        </>}

        {view === "experiments" && <>
          <section className="cp-section-intro"><div><small>Experimentation Lab</small><h2>Decide with statistical significance and commercial relevance.</h2></div><p>Each result includes SRM, lift, confidence interval, guardrails and a recommendation that does not overstate causality.</p></section>
          <section className="cp-experiment-tabs" aria-label="Select experiment">{experiments.map((item)=><button key={item.name} className={experiment === item.name ? "active" : ""} type="button" onClick={()=>setExperiment(item.name)}>{item.name}<small>{item.pValue < .05 ? "Significant" : "Inconclusive"}</small></button>)}</section>
          <section className="cp-experiment-grid">
            <article className="cp-panel cp-experiment-result"><small>Selected result</small><h2>{selectedExperiment.name}</h2><p>{selectedExperiment.hypothesis}</p><div className="cp-lift"><span>Absolute lift</span><strong className={selectedExperiment.positive ? "positive" : "negative"}>{selectedExperiment.lift > 0 ? "+" : ""}{selectedExperiment.lift.toFixed(3)} pp</strong><small>p-value {selectedExperiment.pValue.toFixed(4)}</small></div><div className="cp-ci"><span>95% CI</span><div><i className="zero"/><i className={selectedExperiment.positive ? "positive" : ""}/><b/></div><strong>{selectedExperiment.interval}</strong></div></article>
            <article className="cp-panel cp-decision-card"><small>Decision checklist</small><h2>{selectedExperiment.decision}</h2><ul><li><span>Sample ratio mismatch</span><strong>{selectedExperiment.srm}</strong></li><li><span>Return-rate guardrail</span><strong>No deterioration</strong></li><li><span>Statistical significance</span><strong>{selectedExperiment.pValue < .05 ? "Reached" : "Not reached"}</strong></li><li><span>Commercial relevance</span><strong>{selectedExperiment.positive ? "Material" : "Not demonstrated"}</strong></li></ul><p className={selectedExperiment.positive ? "go" : "hold"}>{selectedExperiment.positive ? "Move to 25% of traffic and monitor guardrails." : "Do not generalize. Maintain control or redesign the hypothesis."}</p></article>
          </section>
        </>}
      </div>
    </div>
  );
}
