import type { Metadata } from "next";
import Link from "next/link";

const repository = "https://github.com/Milagros-Sotelo/insightops-copilot-governed-analytics";
const stack = ["Python 3.12", "Pandas", "Pydantic", "FastAPI", "PostgreSQL", "Streamlit", "Scikit-learn", "Power BI", "Docker", "Pytest"];

export const metadata: Metadata = {
  title: "InsightOps Copilot",
  description: "Automatización analítica, calidad de datos, anomalías y reportes asistidos con gobierno, seguridad y aprobación humana.",
};

export default function InsightOpsProjectPage() {
  return (
    <main className="insight-project-page">
      <header className="subpage-header shell insight-project-header">
        <Link className="wordmark" href="/" aria-label="Volver al portfolio"><span className="wordmark-icon">MS</span><span>Milagros Sotelo</span></Link>
        <nav aria-label="Navegación del proyecto"><Link href="/">Inicio</Link><Link href="/projects/insightops-copilot/demo">Demo</Link><a href={repository} target="_blank" rel="noreferrer">GitHub</a></nav>
      </header>

      <section className="insight-project-hero shell">
        <div className="insight-project-copy">
          <p className="back-link"><Link href="/#proyectos">← Volver a proyectos</Link></p>
          <div className="insight-brand insight-brand-large"><span className="insight-mark"><i /><b>IO</b></span><span><strong>InsightOps</strong><small>GOVERNED ANALYTICS · COPILOT</small></span></div>
          <p className="eyebrow">Automation · Data Quality · Human Control</p>
          <h1>Automatizar sin perder el control.</h1>
          <p className="project-lead">Una plataforma para Asteria Services que recibe archivos, normaliza esquemas, controla la calidad, actualiza KPI, detecta anomalías y prepara reportes auditables.</p>
          <div className="hero-actions"><Link className="button insight-button" href="/projects/insightops-copilot/demo">Abrir demo interactiva</Link><a className="button insight-button-secondary" href={repository} target="_blank" rel="noreferrer">Ver repositorio</a></div>
        </div>

        <div className="insight-product-shot" aria-label="Vista del Control Center de InsightOps Copilot">
          <div className="insight-shot-head"><span><i /> InsightOps Control Center</span><small>ASTERIA SERVICES · RUN 2026-06</small></div>
          <div className="insight-shot-flow"><article><b>97</b><span>FILES</span></article><i>→</i><article><b>9,048</b><span>ACCEPTED</span></article><i>→</i><article><b>240</b><span>KPI RESULTS</span></article><i>→</i><article><b>Draft</b><span>REPORT</span></article></div>
          <div className="insight-shot-body">
            <div className="insight-quality-ring"><div><strong>99.86</strong><span>QUALITY SCORE</span></div><p>5 dimensions<br />9 active rules</p></div>
            <div className="insight-signal-list"><small>Open analytical signals</small><span><i className="critical" />Net sales <b>−33.6%</b></span><span><i />Invoices <b>−31.0%</b></span><span><i />Payments <b>+76.2%</b></span><span><i className="good" />SQL guardrails <b>Passed</b></span></div>
          </div>
        </div>
      </section>

      <section className="insight-statement"><div className="shell"><p>El valor no está en “usar IA”.</p><h2>Está en saber qué datos entraron, qué reglas pasaron, qué evidencia sostiene cada respuesta y quién aprobó la decisión.</h2></div></section>

      <section className="insight-results shell">
        <div className="section-heading"><p className="eyebrow">Evidencia ejecutada</p><h2>Un proceso completo que puede explicarse de principio a fin.</h2><p>El escenario de 24 meses fue generado, procesado y evaluado por el código del repositorio.</p></div>
        <div className="insight-result-grid"><article><strong>97</strong><span>archivos procesados</span></article><article><strong>9,243</strong><span>registros recibidos</span></article><article><strong>100</strong><span>registros rechazados con motivo</span></article><article><strong>99.86</strong><span>quality score promedio</span></article><article><strong>66</strong><span>señales explicables</span></article><article><strong>100%</strong><span>evaluación del copiloto</span></article></div>
      </section>

      <section className="insight-system-section"><div className="shell">
        <div className="section-heading centered"><p className="eyebrow">Operating model</p><h2>Seis módulos, una sola trazabilidad.</h2></div>
        <div className="insight-module-grid">
          <article><span>01</span><h3>File Intake</h3><p>CSV/XLSX, encoding, separadores, hojas, tamaño, SHA-256 y duplicados exactos.</p></article>
          <article><span>02</span><h3>Schema Mapping</h3><p>Alias, similitud, plantillas por fuente, confianza y revisión humana.</p></article>
          <article><span>03</span><h3>Data Quality</h3><p>Cinco dimensiones, nueve reglas y cuarentena con motivos por registro.</p></article>
          <article><span>04</span><h3>KPI &amp; Anomalies</h3><p>Catálogo gobernado, budget, robust z-score, rangos y media móvil.</p></article>
          <article><span>05</span><h3>Grounded Copilot</h3><p>Vistas aprobadas, SQL visible, hechos, hipótesis y negativa a inventar.</p></article>
          <article><span>06</span><h3>Human Review</h3><p>Draft, revisión, aprobación, rechazo, publicación y auditoría.</p></article>
        </div>
      </div></section>

      <section className="insight-guardrails shell">
        <div><p className="eyebrow">Seguridad por diseño</p><h2>La IA está dentro de límites verificables.</h2><p>Funciona sin proveedor externo. Si se conecta uno, no obtiene nuevas facultades: sigue limitado por las mismas vistas, métricas y aprobaciones.</p></div>
        <div className="insight-guard-list"><span><b>01</b> Solo SELECT / WITH</span><span><b>02</b> Vistas SQL allowlisted</span><span><b>03</b> Límite de filas y tiempo</span><span><b>04</b> Prompt injection bloqueada</span><span><b>05</b> Fuentes y período visibles</span><span><b>06</b> Sin acciones operativas</span></div>
      </section>

      <section className="insight-resources"><div className="shell resources-grid">
        <div><p className="eyebrow">Explorar el proyecto</p><h2>Seguí la evidencia, no una promesa.</h2><div className="stack">{stack.map((item)=><span key={item}>{item}</span>)}</div></div>
        <div className="resource-list"><Link className="resource-link insight-resource-primary" href="/projects/insightops-copilot/demo"><span><small>Aplicación pública</small>Demo interactiva</span><strong>↗</strong></Link><a className="resource-link" href={repository} target="_blank" rel="noreferrer"><span><small>Código, datos y documentación</small>Repositorio GitHub</span><strong>↗</strong></a><span className="resource-link resource-link-pending"><span><small>Próximamente</small>Video explicativo en YouTube</span><strong>—</strong></span></div>
      </div></section>
      <footer className="site-footer"><div className="shell footer-inner"><span>© 2026 Milagros Sotelo</span><Link href="/">Volver al portfolio</Link></div></footer>
    </main>
  );
}
