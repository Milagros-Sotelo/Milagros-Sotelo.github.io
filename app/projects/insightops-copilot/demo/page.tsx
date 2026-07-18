import type { Metadata } from "next";
import Link from "next/link";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "ReportMind AI Interactive Demo",
  description: "Interactive analytics automation demo covering quality, KPIs, anomalies and human review.",
};

export default function ReportMindDemoPage() {
  return (
    <main className="io-demo-page">
      <header className="io-demo-topbar">
        <Link className="io-demo-logo" href="/#projects" aria-label="Back to projects">
          <span className="insight-mark insight-mark-small"><i /><b>RM</b></span>
          <span><strong>ReportMind AI</strong><small>GOVERNED ANALYTICS · HUMAN CONTROL</small></span>
        </Link>
        <div className="io-top-actions">
          <span className="io-live"><i /> Deterministic mode · no external AI</span>
          <Link href="/#projects">Project overview</Link>
          <Link href="/">Portfolio</Link>
        </div>
      </header>
      <DemoClient />
    </main>
  );
}
