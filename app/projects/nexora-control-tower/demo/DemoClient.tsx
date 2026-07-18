"use client";

import { useMemo, useState } from "react";

type Status = "Overdue" | "At risk" | "Blocked" | "Scheduled" | "Paid";
type Scenario = "Base" | "Conservative" | "Growth";

type Invoice = {
  id: string;
  vendor: string;
  area: string;
  country: string;
  month: string;
  due: string;
  amount: number;
  status: Status;
  risk: number;
};

const invoices: Invoice[] = [
  { id: "INV-1048", vendor: "Atlas Logistics", area: "Operations", country: "AR", month: "Jul 2026", due: "17 Jul", amount: 482000, status: "Overdue", risk: 94 },
  { id: "INV-1051", vendor: "Norte Services", area: "Operations", country: "AR", month: "Jul 2026", due: "18 Jul", amount: 218500, status: "At risk", risk: 86 },
  { id: "INV-1055", vendor: "Cloudline Systems", area: "Technology", country: "MX", month: "Jul 2026", due: "20 Jul", amount: 354200, status: "Blocked", risk: 88 },
  { id: "INV-1060", vendor: "Rio Supplies", area: "Commercial", country: "UY", month: "Jul 2026", due: "22 Jul", amount: 176300, status: "Scheduled", risk: 42 },
  { id: "INV-1064", vendor: "Andes Consulting", area: "Finance", country: "AR", month: "Jul 2026", due: "24 Jul", amount: 129900, status: "Scheduled", risk: 31 },
  { id: "INV-1068", vendor: "Pacific Retail", area: "Commercial", country: "CL", month: "Aug 2026", due: "02 Aug", amount: 612700, status: "At risk", risk: 78 },
  { id: "INV-1071", vendor: "Prisma Digital", area: "Technology", country: "AR", month: "Aug 2026", due: "05 Aug", amount: 247000, status: "Scheduled", risk: 36 },
  { id: "INV-1076", vendor: "Delta Facilities", area: "Operations", country: "MX", month: "Aug 2026", due: "08 Aug", amount: 395800, status: "Blocked", risk: 83 },
  { id: "INV-1080", vendor: "Sur Energy", area: "Operations", country: "AR", month: "Aug 2026", due: "10 Aug", amount: 529400, status: "Scheduled", risk: 47 },
  { id: "INV-1084", vendor: "Marea Media", area: "Commercial", country: "UY", month: "Sep 2026", due: "03 Sep", amount: 98200, status: "Paid", risk: 12 },
  { id: "INV-1088", vendor: "Boreal Data", area: "Technology", country: "CL", month: "Sep 2026", due: "07 Sep", amount: 284600, status: "Paid", risk: 9 },
  { id: "INV-1092", vendor: "Central Office", area: "Finance", country: "AR", month: "Sep 2026", due: "12 Sep", amount: 156800, status: "Scheduled", risk: 27 },
];

const forecast = [
  { month: "Jul", income: 4.8, payments: 3.9 },
  { month: "Aug", income: 5.2, payments: 4.6 },
  { month: "Sep", income: 5.6, payments: 4.2 },
  { month: "Oct", income: 5.1, payments: 4.8 },
  { month: "Nov", income: 6.0, payments: 5.1 },
  { month: "Dec", income: 6.5, payments: 5.7 },
];

const scenarioFactor: Record<Scenario, number> = { Base: 1, Conservative: 1.14, Growth: 0.92 };

function money(value: number) {
  if (value >= 1000000) return `US$ ${(value / 1000000).toFixed(1)}M`;
  return `US$ ${(value / 1000).toFixed(0)}K`;
}

function statusClass(status: Status) {
  return ({ Overdue: "vencida", "At risk": "en-riesgo", Blocked: "bloqueada", Scheduled: "programada", Paid: "pagada" } as Record<Status, string>)[status];
}

export default function DemoClient() {
  const [area, setArea] = useState("All");
  const [status, setStatus] = useState("All");
  const [month, setMonth] = useState("All");
  const [query, setQuery] = useState("");
  const [scenario, setScenario] = useState<Scenario>("Base");
  const [priorityIds, setPriorityIds] = useState<string[]>(["INV-1048", "INV-1055"]);

  const filtered = useMemo(() => invoices.filter((invoice) => {
    const matchesArea = area === "All" || invoice.area === area;
    const matchesStatus = status === "All" || invoice.status === status;
    const matchesMonth = month === "All" || invoice.month === month;
    const text = `${invoice.vendor} ${invoice.id}`.toLowerCase();
    return matchesArea && matchesStatus && matchesMonth && text.includes(query.toLowerCase());
  }), [area, status, month, query]);

  const total = filtered.reduce((sum, item) => sum + item.amount, 0);
  const exposure = filtered.filter((item) => item.status === "Overdue" || item.status === "At risk").reduce((sum, item) => sum + item.amount, 0);
  const blocked = filtered.filter((item) => item.status === "Blocked").reduce((sum, item) => sum + item.amount, 0);
  const critical = filtered.filter((item) => item.risk >= 75).length;
  const factor = scenarioFactor[scenario];

  function resetFilters() {
    setArea("All"); setStatus("All"); setMonth("All"); setQuery("");
  }

  function togglePriority(id: string) {
    setPriorityIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function exportCsv() {
    const header = "Invoice,Vendor,Area,Country,Due,Status,Amount,Risk\n";
    const rows = filtered.map((item) => [item.id, item.vendor, item.area, item.country, item.due, item.status, item.amount, item.risk].join(",")).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "payflow-control-tower.csv"; anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="demo-shell">
      <aside className="demo-sidebar">
        <p className="demo-sidebar-label">Analysis areas</p>
        <a className="active" href="#overview">Executive overview</a>
        <a href="#invoices">Accounts payable</a>
        <a href="#forecast">Cash forecast</a>
        <a href="#invoices">Control &amp; audit</a>
        <div className="demo-sidebar-note">
          <small>Data as of</small><strong>17 JUL 2026</strong>
          <small>Countries</small><strong>AR · MX · CL · UY</strong>
        </div>
      </aside>

      <div className="demo-content">
        <section className="demo-heading" id="overview">
          <div>
            <p>01 · Executive pulse</p>
            <h1>Finance &amp; Operations<br />Control Tower</h1>
            <span>Prioritize payments, anticipate cash needs and surface financial exceptions.</span>
          </div>
          <button type="button" onClick={exportCsv}>Export CSV view ↓</button>
        </section>

        <section className="demo-filters" aria-label="Dashboard filters">
          <label>Area<select value={area} onChange={(event) => setArea(event.target.value)}><option>All</option><option>Operations</option><option>Commercial</option><option>Technology</option><option>Finance</option></select></label>
          <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Overdue</option><option>At risk</option><option>Blocked</option><option>Scheduled</option><option>Paid</option></select></label>
          <label>Period<select value={month} onChange={(event) => setMonth(event.target.value)}><option>All</option><option>Jul 2026</option><option>Aug 2026</option><option>Sep 2026</option></select></label>
          <label className="search-label">Vendor or invoice<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search..." /></label>
          <button type="button" onClick={resetFilters}>Clear</button>
        </section>

        <section className="demo-kpis" aria-label="Financial indicators">
          <article><small>Visible commitments</small><strong>{money(total)}</strong><span>{filtered.length} filtered invoices</span></article>
          <article><small>Critical exposure</small><strong>{money(exposure)}</strong><span>Overdue or at risk</span></article>
          <article><small>Blocked payments</small><strong>{money(blocked)}</strong><span>Require intervention</span></article>
          <article><small>Risk alerts</small><strong>{critical}</strong><span>Score at or above 75</span></article>
        </section>

        <section className="priority-signal">
          <span>Priority signal.</span> {critical > 0 ? `${critical} cases require immediate review.` : "No critical cases match the current filters."} You marked {priorityIds.length} for follow-up.
        </section>

        <section className="demo-grid">
          <article className="forecast-panel" id="forecast">
            <div className="panel-heading">
              <div><small>Cash forecast · 6 months</small><h2>{scenario} scenario</h2></div>
              <div className="scenario-switch" aria-label="Forecast scenario">
                {(["Base", "Conservative", "Growth"] as Scenario[]).map((item) => <button className={scenario === item ? "active" : ""} key={item} type="button" onClick={() => setScenario(item)}>{item}</button>)}
              </div>
            </div>
            <div className="forecast-chart" aria-label="Income versus projected payments">
              {forecast.map((item) => {
                const adjusted = item.payments * factor;
                return <div className="forecast-month" key={item.month}>
                  <div><i className="income-bar" style={{ height: `${item.income * 27}px` }} /><i className="payment-bar" style={{ height: `${adjusted * 27}px` }} /></div>
                  <span>{item.month}</span>
                </div>;
              })}
            </div>
            <div className="chart-legend"><span><i className="income-dot" />Income</span><span><i className="payment-dot" />Projected payments</span></div>
          </article>

          <article className="discipline-panel">
            <small>Operating discipline</small>
            <h2>Control indicators</h2>
            <div className="progress-row"><span>On-time payments</span><div><i style={{ width: "68%" }} /></div><strong>68%</strong></div>
            <div className="progress-row"><span>Released invoices</span><div><i style={{ width: "82%" }} /></div><strong>82%</strong></div>
            <div className="progress-row"><span>3-way match</span><div><i style={{ width: "74%" }} /></div><strong>74%</strong></div>
            <p>Controls combine impact, timing and risk to direct attention to the exceptions that matter.</p>
          </article>
        </section>

        <section className="invoice-panel" id="invoices">
          <div className="panel-heading"><div><small>Operational detail</small><h2>Exception queue</h2></div><span>{filtered.length} results</span></div>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Priority</th><th>Invoice</th><th>Vendor</th><th>Area</th><th>Due</th><th>Status</th><th>Amount</th><th>Risk</th></tr></thead>
              <tbody>
                {filtered.map((invoice) => <tr key={invoice.id}>
                  <td><button className={`priority-button ${priorityIds.includes(invoice.id) ? "selected" : ""}`} type="button" onClick={() => togglePriority(invoice.id)} aria-label={`${priorityIds.includes(invoice.id) ? "Remove" : "Add"} ${invoice.id} ${priorityIds.includes(invoice.id) ? "from" : "to"} follow-up`}>{priorityIds.includes(invoice.id) ? "★" : "☆"}</button></td>
                  <td><strong>{invoice.id}</strong><small>{invoice.country}</small></td>
                  <td>{invoice.vendor}</td><td>{invoice.area}</td><td>{invoice.due}</td>
                  <td><span className={`status-pill ${statusClass(invoice.status)}`}>{invoice.status}</span></td>
                  <td>{money(invoice.amount)}</td><td><strong className={invoice.risk >= 75 ? "risk-high" : ""}>{invoice.risk}</strong></td>
                </tr>)}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty-state">No results. Clear or adjust the filters.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
