"use client";

import { useMemo, useState } from "react";

type View = "control" | "quality" | "kpi" | "anomalies" | "copilot" | "report";
type Answer = { text: string; facts: string[]; hypotheses: string[]; sql: string; sources: string[]; metrics: string[]; warning: string };

const nav: {id: View; label: string}[] = [
  {id:"control",label:"Control Center"},{id:"quality",label:"Data Quality"},{id:"kpi",label:"KPI Monitoring"},
  {id:"anomalies",label:"Anomaly Center"},{id:"copilot",label:"Copilot"},{id:"report",label:"Report Review"},
];
const runs = [
  {file:"2026-06_sales.csv",area:"Sales",rows:95,accepted:91,rejected:4,score:99.1,status:"Completed",time:"44 ms"},
  {file:"2026-06_operations.csv",area:"Operations",rows:95,accepted:94,rejected:1,score:99.8,status:"Completed",time:"39 ms"},
  {file:"2026-06_procurement.csv",area:"Procurement",rows:95,accepted:93,rejected:2,score:99.6,status:"Completed",time:"41 ms"},
  {file:"2026-06_finance.csv",area:"Finance",rows:95,accepted:94,rejected:1,score:99.8,status:"Completed",time:"43 ms"},
  {file:"2026-06_sales_DUPLICATE.csv",area:"Sales",rows:95,accepted:0,rejected:0,score:0,status:"Duplicate skipped",time:"4 ms"},
];
const rules = [
  {id:"DQ001",name:"Required fields",dimension:"Completeness",failed:42,pass:99.54},
  {id:"DQ004",name:"Non-negative amount",dimension:"Validity",failed:18,pass:99.80},
  {id:"DQ005",name:"No future dates",dimension:"Timeliness",failed:12,pass:99.87},
  {id:"DQ006",name:"Unique business key",dimension:"Uniqueness",failed:28,pass:99.69},
  {id:"DQ009",name:"IQR amount outlier",dimension:"Validity · warning",failed:77,pass:99.16},
];
const qualitySources = [
  {name:"Sales",score:99.82,rejected:28},{name:"Finance",score:99.84,rejected:25},
  {name:"Procurement",score:99.88,rejected:24},{name:"Operations",score:99.91,rejected:23},
];
const metricSeries: Record<string, {label:string;format:"money"|"percent"|"number";values:number[];budget:number[]}> = {
  NET_SALES:{label:"Net sales",format:"money",values:[712,748,691,779,804,752,826,768,510],budget:[700,720,735,745,760,780,795,810,645]},
  EXPENSES:{label:"Expenses",format:"money",values:[544,575,602,589,628,613,645,1382,802],budget:[560,575,590,600,615,625,635,645,647]},
  GROSS_MARGIN:{label:"Gross margin",format:"percent",values:[72.1,74.0,71.7,73.4,72.8,75.2,72.5,74.8,78.2],budget:[55,55,55,55,55,55,55,55,55]},
  COMPLIANCE:{label:"Compliance",format:"percent",values:[81.1,79.8,80.4,78.9,82.0,80.6,79.2,80.0,83.2],budget:[80,80,80,80,80,80,80,80,80]},
};
const months = ["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun"];
const alerts = [
  {id:"ALT-0066",metric:"Net sales",value:"US$ 509.7K",variation:"−33.6%",method:"MoM + budget",severity:"High"},
  {id:"ALT-0065",metric:"Invoices",value:"20",variation:"−31.0%",method:"MoM threshold",severity:"Medium"},
  {id:"ALT-0064",metric:"Payments",value:"US$ 211.4K",variation:"+76.2%",method:"MoM threshold",severity:"Medium"},
  {id:"ALT-0063",metric:"Expenses",value:"US$ 802.1K",variation:"+24.0% vs budget",method:"Budget variance",severity:"Medium"},
  {id:"ALT-0062",metric:"Compliance",value:"83.2%",variation:"Robust signal",method:"Robust z-score",severity:"High"},
];
const questions = ["Which KPIs deviated this month?","Why did margin change?","Which files had the lowest quality?","Which vendors concentrate the most spending?"];

function answerFor(question:string): Answer {
  const q=question.toLowerCase();
  if(q.includes("file")||q.includes("quality")) return {text:"The file requiring first review is 2026-01_operations.csv: 99.27/100.",facts:["3 of 96 records were rejected.","Reasons are preserved at record level."],hypotheses:[],sql:"SELECT source_file, quality_score, rows_received, rows_rejected\nFROM vw_quality_summary\nORDER BY quality_score ASC\nLIMIT 20",sources:["vw_quality_summary"],metrics:["DATA_QUALITY_SCORE"],warning:"Quality is calculated across five dimensions and versioned rules."};
  if(q.includes("vendor")||q.includes("concentrate")) return {text:"There is not enough evidence to answer that question.",facts:[],hypotheses:[],sql:"",sources:[],metrics:[],warning:"The approved mart does not contain vendor concentration detail. No figures were invented."};
  if(q.includes("margin")) return {text:"Gross margin closed June at 78.2%, up 3.4 points from May.",facts:["GROSS_MARGIN · 2026-06 · 78.2%","The approved view shows a positive month-over-month change."],hypotheses:["The change may reflect mix or cost; this view does not confirm causality."],sql:"SELECT period, metric_id, value, budget_variance\nFROM vw_metric_monitoring\nWHERE metric_id = 'GROSS_MARGIN'\nORDER BY period DESC\nLIMIT 13",sources:["vw_metric_monitoring"],metrics:["GROSS_MARGIN"],warning:"Facts and hypotheses are presented separately."};
  return {text:"Five priority deviations were detected in June. Net sales fell 33.6% below the expected pattern.",facts:["NET_SALES · US$ 509.7K · −33.6% vs expected","INVOICES · 20 · −31.0% vs expected","PAYMENTS · US$ 211.4K · +76.2% vs expected"],hypotheses:["Causes require validation with each source owner."],sql:"SELECT metric_id, metric_name, observed_value, expected_value, variation, severity\nFROM vw_anomaly_center\nWHERE period = '2026-06'\nORDER BY severity\nLIMIT 20",sources:["vw_anomaly_center"],metrics:["NET_SALES","INVOICES","PAYMENTS"],warning:"Anomalies are signals, not confirmed causal explanations."};
}

function display(value:number,format:string){if(format==="money")return `US$ ${value.toFixed(0)}K`;if(format==="percent")return `${value.toFixed(1)}%`;return value.toFixed(0)}

export default function DemoClient(){
  const [view,setView]=useState<View>("control");
  const [area,setArea]=useState("All");
  const [metric,setMetric]=useState("NET_SALES");
  const [reviewed,setReviewed]=useState<string[]>([]);
  const [question,setQuestion]=useState(questions[0]);
  const [custom,setCustom]=useState("");
  const [answer,setAnswer]=useState<Answer|null>(null);
  const [reportStatus,setReportStatus]=useState("Draft");
  const [summary,setSummary]=useState("Asteria Services closed June with five priority analytical signals. Net sales were 33.6% below the expected pattern, while average data quality remained at 99.86/100.");
  const filteredRuns=useMemo(()=>runs.filter(run=>area==="All"||run.area===area),[area]);
  const series=metricSeries[metric];
  const max=Math.max(...series.values,...series.budget);
  function exportCsv(){const content=view==="quality"?"rule,name,failed,pass_rate\n"+rules.map(x=>`${x.id},${x.name},${x.failed},${x.pass}`).join("\n"):view==="anomalies"?"id,metric,value,variation,severity\n"+alerts.map(x=>`${x.id},${x.metric},${x.value},${x.variation},${x.severity}`).join("\n"):"file,area,rows,accepted,rejected,quality,status\n"+filteredRuns.map(x=>`${x.file},${x.area},${x.rows},${x.accepted},${x.rejected},${x.score},${x.status}`).join("\n");const blob=new Blob([content],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`reportmind-${view}.csv`;a.click();URL.revokeObjectURL(url)}
  return <div className="io-demo-shell">
    <aside className="io-sidebar"><p>Workspace</p>{nav.map((item,index)=><button key={item.id} className={view===item.id?"active":""} type="button" onClick={()=>setView(item.id)}><span>0{index+1}</span>{item.label}</button>)}<div className="io-sidebar-meta"><small>Pipeline run</small><strong>2026-06 · COMPLETED</strong><small>Human gate</small><strong>{reportStatus.toUpperCase()}</strong></div></aside>
    <div className="io-content">
      <section className="io-heading"><div><p>Asteria Services · Governed data product</p><h1>{nav.find(item=>item.id===view)?.label}</h1><span>Every number linked to a file, rule, metric definition and review decision.</span></div><button type="button" onClick={exportCsv}>Export evidence CSV ↓</button></section>

      {view==="control"&&<>
        <section className="io-filterbar"><label>Area<select value={area} onChange={e=>setArea(e.target.value)}><option>All</option><option>Finance</option><option>Procurement</option><option>Sales</option><option>Operations</option></select></label><label>Period<select><option>2026-06</option><option>2026-05</option><option>2026-04</option></select></label><span><i/> Pipeline completed · 17 Jul 2026</span><button type="button" onClick={()=>setArea("All")}>Clear</button></section>
        <section className="io-kpis"><article><small>Source files</small><strong>97</strong><span>96 processed · 1 duplicate</span></article><article><small>Rows received</small><strong>9,243</strong><span>4 business areas</span></article><article><small>Rows accepted</small><strong>9,048</strong><span>Ready for metrics</span></article><article><small>Rows rejected</small><strong>100</strong><span>With rule-level reasons</span></article><article><small>Quality score</small><strong>99.86</strong><span>5 governed dimensions</span></article></section>
        <section className="io-pipeline-flow"><article><span>01</span><b>Receive</b><small>SHA-256</small></article><i>→</i><article><span>02</span><b>Map</b><small>Canonical schema</small></article><i>→</i><article><span>03</span><b>Validate</b><small>9 rules</small></article><i>→</i><article><span>04</span><b>Load</b><small>Approved views</small></article><i>→</i><article><span>05</span><b>Explain</b><small>Human review</small></article></section>
        <section className="io-panel io-table-panel"><header><div><small>Execution evidence</small><h2>Latest source files</h2></div><span>{filteredRuns.length} visible</span></header><div className="io-table-scroll"><table><thead><tr><th>Source file</th><th>Area</th><th>Rows</th><th>Accepted</th><th>Rejected</th><th>Quality</th><th>Status</th><th>Time</th></tr></thead><tbody>{filteredRuns.map(run=><tr key={run.file}><td><strong>{run.file}</strong></td><td>{run.area}</td><td>{run.rows}</td><td>{run.accepted}</td><td>{run.rejected}</td><td>{run.status.includes("Duplicate")?"—":run.score}</td><td><span className={`io-status ${run.status.includes("Duplicate")?"duplicate":"good"}`}>{run.status}</span></td><td>{run.time}</td></tr>)}</tbody></table></div></section>
      </>}

      {view==="quality"&&<>
        <section className="io-section-intro"><div><small>Five dimensions · nine rules</small><h2>Quality is measured before a row can influence a decision.</h2></div><p>Errors are quarantined with reasons. Warnings remain visible for review and every score can be traced back to its source file.</p></section>
        <section className="io-quality-layout"><article className="io-panel io-score-card"><small>Overall quality</small><div className="io-score-ring"><strong>99.86</strong><span>/ 100</span></div><div>{["Completeness","Validity","Uniqueness","Consistency","Timeliness"].map((x,i)=><span key={x}>{x}<b>{[99.54,99.67,99.69,100,99.87][i]}%</b></span>)}</div></article><article className="io-panel io-source-quality"><header><div><small>Business sources</small><h2>Quality by area</h2></div></header><div>{qualitySources.map(item=><span key={item.name}><b>{item.name}</b><i><em style={{width:`${item.score}%`}}/></i><strong>{item.score}</strong><small>{item.rejected} rejected</small></span>)}</div></article></section>
        <section className="io-panel io-table-panel"><header><div><small>Rule evidence</small><h2>Active controls</h2></div><span>Errors reject · warnings flag</span></header><div className="io-table-scroll"><table><thead><tr><th>Rule</th><th>Control</th><th>Dimension</th><th>Failed rows</th><th>Pass rate</th><th>Action</th></tr></thead><tbody>{rules.map(rule=><tr key={rule.id}><td><strong>{rule.id}</strong></td><td>{rule.name}</td><td>{rule.dimension}</td><td>{rule.failed}</td><td>{rule.pass}%</td><td><span className={`io-status ${rule.dimension.includes("warning")?"warning":"rejected"}`}>{rule.dimension.includes("warning")?"Flag":"Reject"}</span></td></tr>)}</tbody></table></div></section>
      </>}

      {view==="kpi"&&<>
        <section className="io-section-intro"><div><small>Governed metric catalog</small><h2>A KPI exists only after its definition, owner and source are approved.</h2></div><p>The same catalog feeds Python, PostgreSQL, Power BI and Copilot. This avoids competing formulas across reports.</p></section>
        <section className="io-metric-tabs">{Object.entries(metricSeries).map(([id,item])=><button key={id} className={metric===id?"active":""} type="button" onClick={()=>setMetric(id)}><small>{id}</small>{item.label}</button>)}</section>
        <section className="io-kpi-layout"><article className="io-panel io-bar-panel"><header><div><small>Actual vs budget</small><h2>{series.label}</h2></div><span>Oct 2025 — Jun 2026</span></header><div className="io-bars">{series.values.map((value,index)=><div key={months[index]}><span><i style={{height:`${value/max*100}%`}}/><b style={{height:`${series.budget[index]/max*100}%`}}/></span><small>{months[index]}</small></div>)}</div><footer><span><i/>Actual</span><span><i/>Budget</span></footer></article><article className="io-panel io-metric-detail"><small>Latest governed result</small><h2>{display(series.values.at(-1)??0,series.format)}</h2><span>2026-06</span><dl><div><dt>Metric ID</dt><dd>{metric}</dd></div><div><dt>Source</dt><dd>vw_metric_monitoring</dd></div><div><dt>Owner</dt><dd>{metric==="NET_SALES"?"Commercial Analytics":"Finance"}</dd></div><div><dt>Frequency</dt><dd>Monthly</dd></div></dl><p>Formula and effective date are versioned in the metric catalog.</p></article></section>
      </>}

      {view==="anomalies"&&<>
        <section className="io-section-intro"><div><small>Explainable detection</small><h2>Signals for review, not automatic causal claims.</h2></div><p>Rules combine moving patterns, robust statistics, catalog ranges and budget deviations. A reviewer owns the final interpretation.</p></section>
        <section className="io-alert-summary"><article><small>Open signals</small><strong>{alerts.length-reviewed.length}</strong></article><article><small>High priority</small><strong>2</strong></article><article><small>Methods</small><strong>4</strong></article><article><small>Reviewed now</small><strong>{reviewed.length}</strong></article></section>
        <section className="io-panel io-alert-list"><header><div><small>Review queue</small><h2>Latest analytical signals</h2></div><span>2026-06</span></header>{alerts.map(alert=><article key={alert.id} className={reviewed.includes(alert.id)?"reviewed":""}><span className={`io-severity ${alert.severity.toLowerCase()}`}>{alert.severity}</span><div><small>{alert.id} · {alert.method}</small><h3>{alert.metric}</h3></div><strong>{alert.value}<small>{alert.variation}</small></strong><button type="button" onClick={()=>setReviewed(current=>current.includes(alert.id)?current.filter(id=>id!==alert.id):[...current,alert.id])}>{reviewed.includes(alert.id)?"Reopen":"Mark reviewed"}</button></article>)}</section>
      </>}

      {view==="copilot"&&<>
        <section className="io-section-intro"><div><small>Grounded analysis assistant</small><h2>Ask the data. Inspect the evidence.</h2></div><p>No raw tables, no write permissions and no invented metrics. Every supported answer shows SQL, sources, period and limitations.</p></section>
        <section className="io-copilot-layout"><article className="io-panel io-question-panel"><small>Suggested questions</small>{questions.map(item=><button className={question===item?"active":""} key={item} type="button" onClick={()=>{setQuestion(item);setCustom("")}}>{item}<span>→</span></button>)}<label>Or ask a question<textarea value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Ask about quality, KPI or anomalies..."/></label><button className="io-analyze" type="button" onClick={()=>setAnswer(answerFor(custom||question))}>Analyze with approved views</button><p><i/> Interaction will be added to the audit trail.</p></article><article className="io-panel io-answer-panel">{answer?<><header><span><i/> Grounded response</span><small>PERIOD · 2026-06</small></header><h2>{answer.text}</h2>{answer.facts.length>0&&<div><small>Verified facts</small>{answer.facts.map(x=><p key={x}>✓ {x}</p>)}</div>}{answer.hypotheses.length>0&&<div className="hypothesis"><small>Hypotheses to validate</small>{answer.hypotheses.map(x=><p key={x}>◇ {x}</p>)}</div>}<aside>{answer.warning}</aside><details><summary>Show traceability</summary><code>{answer.sql||"No query executed"}</code><p>Sources: {answer.sources.join(", ")||"None"}<br/>Metrics: {answer.metrics.join(", ")||"None"}</p></details></>:<div className="io-answer-empty"><span>RM</span><h2>Select a question and analyze it.</h2><p>The response will show facts, hypotheses, SQL, sources and warnings.</p></div>}</article></section>
      </>}

      {view==="report"&&<>
        <section className="io-section-intro"><div><small>Human approval gate</small><h2>The Copilot drafts. A person decides.</h2></div><p>Direct Draft-to-Published transitions are blocked. Every approval or rejection records actor, timestamp and comment.</p></section>
        <section className="io-report-steps">{["Draft","Under Review","Approved","Published"].map((item,index)=><span key={item} className={reportStatus===item||(["Approved","Published"].includes(reportStatus)&&index<3)?"active":""}><b>0{index+1}</b>{item}</span>)}</section>
        <section className="io-report-layout"><article className="io-panel io-report-document"><header><div><small>RPT-2026-06</small><h2>Monthly Analytics Brief</h2></div><span className={`io-status ${reportStatus==="Rejected"?"rejected":"warning"}`}>{reportStatus}</span></header><label>Executive summary<textarea value={summary} onChange={e=>setSummary(e.target.value)}/></label><div className="io-report-columns"><div><small>KPI highlights</small><p><b>Net sales</b> · US$ 509.7K · −33.6% vs expected</p><p><b>Expenses</b> · US$ 802.1K · +24.0% vs budget</p><p><b>Data quality</b> · 99.86 / 100</p></div><div><small>Limitations</small><p>Anomalies do not prove causality.</p><p>Rejected rows do not feed metrics.</p><p>All possible causes require human validation.</p></div></div></article><article className="io-panel io-review-panel"><small>Review decision</small><h2>{reportStatus==="Approved"?"Approved by human reviewer":reportStatus==="Rejected"?"Changes requested":"Approval required"}</h2><label>Reviewer comment<textarea placeholder="Document the decision..."/></label><button className="approve" type="button" onClick={()=>setReportStatus("Approved")}>Approve report</button><button type="button" onClick={()=>setReportStatus("Rejected")}>Reject and request changes</button><p>No action publishes automatically.</p></article></section>
      </>}
    </div>
  </div>
}
