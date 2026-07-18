import type { Metadata } from "next";
import Link from "next/link";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "PayFlow Interactive Demo",
  description: "Interactive finance control tower demo with filters, forecasting and exception prioritization.",
};

export default function PayFlowDemoPage() {
  return (
    <main className="demo-page">
      <header className="demo-topbar">
        <Link className="demo-logo" href="/#projects" aria-label="Back to projects">
          <span className="nexora-mark nexora-mark-small"><i /><i /><b>PF</b></span>
          <span><strong>PayFlow</strong><small>FINANCE · OPERATIONS</small></span>
        </Link>
        <div className="demo-topbar-actions">
          <span className="demo-live"><i /> Synthetic data demo</span>
          <Link href="/#projects">Project overview</Link>
          <Link href="/">Portfolio</Link>
        </div>
      </header>
      <DemoClient />
    </main>
  );
}
