import type { Metadata } from "next";
import Link from "next/link";

const repository = "https://github.com/Milagros-Sotelo/commercepulse-360-retail-analytics";
const stack = ["Python 3.12", "Pandas", "NumPy", "PostgreSQL", "SQLAlchemy", "Streamlit", "Plotly", "Power BI", "Pytest", "Docker"];

export const metadata: Metadata = {
  title: "CommercePulse 360",
  description: "Plataforma integral de retail analytics con marketing, clientes, funnel, rentabilidad, inventario y experimentación.",
};

export default function CommercePulseProjectPage() {
  return (
    <main className="commerce-project-page">
      <header className="subpage-header shell commerce-project-header">
        <Link className="wordmark" href="/" aria-label="Volver al portfolio"><span className="wordmark-icon">MS</span><span>Milagros Sotelo</span></Link>
        <nav aria-label="Navegación del proyecto">
          <Link href="/">Inicio</Link>
          <Link href="/projects/commercepulse-360/demo">Demo</Link>
          <a href={repository} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>

      <section className="commerce-project-hero shell">
        <div className="commerce-project-copy">
          <p className="back-link"><Link href="/#proyectos">← Volver a proyectos</Link></p>
          <div className="commerce-brand commerce-brand-large">
            <span className="commerce-mark"><i /><b>CP</b></span>
            <span><strong>CommercePulse</strong><small>RETAIL INTELLIGENCE · 360</small></span>
          </div>
          <p className="eyebrow">Retail · Customer · Marketing Analytics</p>
          <h1>Una visión comercial que conecta todo el negocio.</h1>
          <p className="project-lead">
            Plataforma end-to-end para Luma Home Market que integra comportamiento digital,
            campañas, clientes, ventas, productos, rentabilidad, inventario y experimentos.
          </p>
          <div className="hero-actions">
            <Link className="button commerce-button" href="/projects/commercepulse-360/demo">Abrir demo interactiva</Link>
            <a className="button commerce-button-secondary" href={repository} target="_blank" rel="noreferrer">Ver repositorio</a>
          </div>
        </div>

        <div className="commerce-product-shot" aria-label="Vista del dashboard CommercePulse 360">
          <div className="commerce-shot-top"><span>CommercePulse 360</span><small>Luma Home Market · Sample profile</small></div>
          <div className="commerce-shot-kpis">
            <article><small>Net revenue</small><strong>US$ 4.24M</strong><span>24 months</span></article>
            <article><small>Gross margin</small><strong>38.96%</strong><span>US$ 1.65M</span></article>
            <article><small>Orders</small><strong>11,295</strong><span>AOV US$ 375</span></article>
          </div>
          <div className="commerce-shot-grid">
            <div className="commerce-shot-chart"><span>Revenue &amp; margin</span><div>{[48,62,55,72,68,86,78,94,88,105,99,118].map((height, index) => <i key={index} style={{height}} />)}<b /></div></div>
            <div className="commerce-shot-funnel"><span>Digital funnel</span><i style={{width:"100%"}} /><i style={{width:"55%"}} /><i style={{width:"32%"}} /><i style={{width:"18%"}} /><i style={{width:"9%"}} /></div>
          </div>
        </div>
      </section>

      <section className="commerce-proof-section">
        <div className="shell commerce-proof-grid">
          <article><span>01</span><h2>El desafío</h2><p>Responder preguntas comerciales que antes vivían separadas entre marketing, ecommerce, clientes y operaciones.</p></article>
          <article><span>02</span><h2>Mi aporte</h2><p>Diseñé la arquitectura, el generador, la calidad de datos, los KPI, el análisis estadístico y la experiencia ejecutiva.</p></article>
          <article><span>03</span><h2>La evidencia</h2><p>Pipeline reproducible, modelo estrella, SQL avanzado, pruebas automáticas y resultados calculados desde datos transaccionales.</p></article>
        </div>
      </section>

      <section className="commerce-results shell">
        <div className="section-heading">
          <p className="eyebrow">Resultados ejecutados</p>
          <h2>Decisiones basadas en evidencia, no en métricas decorativas.</h2>
          <p>El escenario de muestra fue generado y procesado por el código publicado con una semilla reproducible.</p>
        </div>
        <div className="commerce-result-grid">
          <article><strong>4.24M</strong><span>USD de ventas netas</span></article>
          <article><strong>38.96%</strong><span>margen bruto</span></article>
          <article><strong>8.99%</strong><span>conversión del funnel</span></article>
          <article><strong>67.06%</strong><span>tasa de recompra</span></article>
          <article><strong>720</strong><span>duplicados documentados</span></article>
          <article><strong>1</strong><span>experimento listo para rollout controlado</span></article>
        </div>
      </section>

      <section className="commerce-capabilities">
        <div className="shell">
          <div className="section-heading centered"><p className="eyebrow">De punta a punta</p><h2>Una plataforma, seis conversaciones.</h2></div>
          <div className="commerce-capability-grid">
            <article><span>01</span><h3>Executive Overview</h3><p>Revenue, margen, pedidos, clientes, ticket, conversión y ROAS.</p></article>
            <article><span>02</span><h3>Customer Analytics</h3><p>Cohortes, retención, RFM, segmentos y detalle individual.</p></article>
            <article><span>03</span><h3>Funnel &amp; Digital</h3><p>Etapas ordenadas, abandono, dispositivos, fuentes y campañas.</p></article>
            <article><span>04</span><h3>Campaign Performance</h3><p>Inversión, revenue atribuido, CAC, ROAS y margen después de medios.</p></article>
            <article><span>05</span><h3>Product &amp; Inventory</h3><p>Ventas, margen, devoluciones, promociones, stockouts y cobertura.</p></article>
            <article><span>06</span><h3>Experimentation Lab</h3><p>SRM, lift, intervalos, guardrails, relevancia comercial y recomendación.</p></article>
          </div>
        </div>
      </section>

      <section className="commerce-resources">
        <div className="shell resources-grid">
          <div>
            <p className="eyebrow">Explorar el proyecto</p>
            <h2>Usalo como lo haría un equipo comercial.</h2>
            <div className="stack">{stack.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="resource-list">
            <Link className="resource-link commerce-resource-primary" href="/projects/commercepulse-360/demo"><span><small>Aplicación pública</small>Demo interactiva</span><strong>↗</strong></Link>
            <a className="resource-link" href={repository} target="_blank" rel="noreferrer"><span><small>Código, datos y documentación</small>Repositorio GitHub</span><strong>↗</strong></a>
            <span className="resource-link resource-link-pending"><span><small>Próximamente</small>Video explicativo en YouTube</span><strong>—</strong></span>
          </div>
        </div>
      </section>

      <footer className="site-footer"><div className="shell footer-inner"><span>© 2026 Milagros Sotelo</span><Link href="/">Volver al portfolio</Link></div></footer>
    </main>
  );
}
