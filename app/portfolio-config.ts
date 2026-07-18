export const githubProfile = "https://github.com/Milagros-Sotelo";
export const linkedinProfile = "https://www.linkedin.com/in/m-sotelo/";

const whatsappMessage = encodeURIComponent(
  "Hello Milagros, I reviewed your portfolio and would like to discuss a career opportunity with you.",
);
export const whatsappUrl = `https://wa.me/5491159314083?text=${whatsappMessage}`;

const emailSubject = encodeURIComponent("Career opportunity — Portfolio");
const emailBody = encodeURIComponent(
  "Hello Milagros,\n\nI reviewed your portfolio and would like to discuss a career opportunity with you.\n\nBest regards,",
);
export const emailUrl = `mailto:sotemilagros@gmail.com?subject=${emailSubject}&body=${emailBody}`;

export type PortfolioProject = {
  name: string;
  nameLead: string;
  nameAccent: string;
  subtitle: string;
  description: string;
  summary: string;
  highlights: string[];
  demo: string;
  repository: string;
  tone: "payflow" | "growth" | "reportmind";
  mark: string;
  stack: string[];
};

export const projects: PortfolioProject[] = [
  {
    name: "PayFlow",
    nameLead: "Pay",
    nameAccent: "Flow",
    subtitle: "Finance · Cash Flow · Operations",
    description:
      "A finance and operations control tower that turns cash, spending and forecast data into prioritized decisions.",
    summary:
      "PayFlow brings financial and operational signals into one decision-ready workspace. It was designed to help finance teams anticipate cash pressure, understand budget variance and focus attention on the exceptions that require action.",
    highlights: [
      "Consolidates cash position, budget variance and operating exceptions in one executive view.",
      "Uses reproducible scenarios, forecasts and data-quality controls to support traceable decisions.",
      "Includes a fully interactive demo built with synthetic business data.",
    ],
    demo: "/projects/nexora-control-tower/demo",
    repository: "https://github.com/Milagros-Sotelo/finance-operations-analytics-control-tower",
    tone: "payflow",
    mark: "PF",
    stack: ["Python", "SQL", "dbt", "Power BI", "Streamlit"],
  },
  {
    name: "GrowthSignal",
    nameLead: "Growth",
    nameAccent: "Signal",
    subtitle: "Retail · Customers · Growth",
    description:
      "An omnichannel growth intelligence platform connecting customers, campaigns, sales and inventory.",
    summary:
      "GrowthSignal connects customer behavior, commercial performance and inventory health to reveal where profitable growth is being created—or lost. The experience is structured for business stakeholders, with clear metrics and practical next actions.",
    highlights: [
      "Combines segmentation, funnel performance, campaign impact and product economics in one view.",
      "Surfaces retention and conversion opportunities through explainable business metrics.",
      "Includes scenario controls and an interactive retail demo using reproducible synthetic data.",
    ],
    demo: "/projects/commercepulse-360/demo",
    repository: "https://github.com/Milagros-Sotelo/commercepulse-360-retail-analytics",
    tone: "growth",
    mark: "GS",
    stack: ["Python", "SQL", "Streamlit", "Power BI", "A/B Testing"],
  },
  {
    name: "ReportMind AI",
    nameLead: "ReportMind",
    nameAccent: "AI",
    subtitle: "Automation · Quality · Human Control",
    description:
      "A governed analytics copilot that validates files, detects anomalies and drafts explainable reports.",
    summary:
      "ReportMind AI automates the repetitive stages of analytical reporting while keeping quality checks, KPI definitions and human approval visible. It demonstrates how AI-assisted workflows can increase speed without sacrificing control or explainability.",
    highlights: [
      "Validates incoming data, identifies anomalies and organizes KPI evidence before reporting.",
      "Creates explainable report drafts with explicit rules and human review checkpoints.",
      "Demonstrates a governed automation workflow through a usable interactive demo.",
    ],
    demo: "/projects/insightops-copilot/demo",
    repository: "https://github.com/Milagros-Sotelo/insightops-copilot-governed-analytics",
    tone: "reportmind",
    mark: "RM",
    stack: ["Python", "FastAPI", "SQL", "Power BI", "Governed AI"],
  },
];
