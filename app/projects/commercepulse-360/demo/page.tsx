import type { Metadata } from "next";
import Link from "next/link";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "GrowthSignal Interactive Demo",
  description: "Interactive retail analytics demo covering customers, funnels, campaigns, profitability, inventory and experimentation.",
};

export default function GrowthSignalDemoPage() {
  return (
    <main className="cp-demo-page">
      <header className="cp-demo-topbar">
        <Link className="cp-demo-logo" href="/#projects" aria-label="Back to projects">
          <span className="commerce-mark commerce-mark-small"><i /><b>GS</b></span>
          <span><strong>GrowthSignal</strong><small>RETAIL · CUSTOMER · GROWTH</small></span>
        </Link>
        <div className="cp-demo-top-actions">
          <span className="cp-demo-live"><i /> Reproducible synthetic data</span>
          <Link href="/#projects">Project overview</Link>
          <Link href="/">Portfolio</Link>
        </div>
      </header>
      <DemoClient />
    </main>
  );
}
