import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const projectRepository =
  "https://github.com/Milagros-Sotelo/finance-operations-analytics-control-tower";

const stack = ["Python", "PostgreSQL", "dbt", "Streamlit", "Power BI", "Docker", "GitHub Actions"];

export const metadata: Metadata = {
  title: "Nexora Control Tower",
  description: "Caso de analytics financiero end-to-end con demo interactiva, KPIs, forecast y controles de calidad.",
};

export default function NexoraProjectPage() {
  return (
    <main className="project-page">
      <header className="subpage-header shell">
        <Link className="wordmark" href="/" aria-label="Volver al portfolio">
          <span className="wordmark-icon">MS</span>
          <span>Portfolio</span>
        </Link>
        <nav aria-label="Navegación del proyecto">
          <Link href="/">Inicio</Link>
          <Link href="/projects/nexora-control-tower/demo">Demo</Link>
          <a href={projectRepository} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </header>

      <section className="project-detail-hero shell">
        <div className="project-detail-copy">
          <p className="back-link"><Link href="/#proyectos">← Volver a proyectos</Link></p>
          <div className="nexora-brand nexora-brand-large">
            <span className="nexora-mark"><i /><i /><b>N</b></span>
            <span><strong>Nexora</strong><small>FINANCE CONTROL TOWER</small></span>
          </div>
          <p className="eyebrow">Finance &amp; Operations Analytics</p>
          <h1>Decisiones financieras en una sola torre de control.</h1>
          <p className="project-lead">
            Un proyecto end-to-end que integra datos de cuentas a pagar, compras,
            presupuesto y caja para detectar desvíos, vencimientos y riesgos antes
            de que se conviertan en problemas.
          </p>
          <div className="hero-actions">
            <Link className="button button-mint" href="/projects/nexora-control-tower/demo">Abrir demo interactiva</Link>
            <a className="button button-dark-outline" href={projectRepository} target="_blank" rel="noreferrer">Ver código en GitHub</a>
          </div>
        </div>

        <div className="project-detail-preview">
          <div className="browser-bar light-bar"><span /><span /><span /><p>nexora / executive pulse</p></div>
          <Image
            src="/projects/control-tower/01-executive-overview.png"
            alt="Panel ejecutivo de Nexora Control Tower"
            width={1265}
            height={817}
            priority
          />
        </div>
      </section>

      <section className="project-summary">
        <div className="shell summary-grid">
          <article><span>01</span><h2>El problema</h2><p>La información financiera estaba fragmentada y requería revisar varios reportes para entender la exposición real.</p></article>
          <article><span>02</span><h2>Mi rol</h2><p>Definí el modelo, los controles de calidad, los KPIs y la experiencia de análisis de principio a fin.</p></article>
          <article><span>03</span><h2>La solución</h2><p>Una capa analítica reproducible y una interfaz ejecutiva para priorizar excepciones por impacto y urgencia.</p></article>
          <article><span>04</span><h2>El resultado</h2><p>395.000 registros sintéticos, pruebas automáticas y un flujo listo para explicar, ejecutar y auditar.</p></article>
        </div>
      </section>

      <section className="project-story shell">
        <div className="section-heading">
          <p className="eyebrow">Pensado para negocio</p>
          <h2>Lo que demuestra este proyecto</h2>
          <p>
            Para un equipo de selección, Nexora evidencia que puedo entender una
            necesidad financiera, convertirla en una solución técnica y comunicar
            el resultado de manera ejecutiva.
          </p>
        </div>
        <div className="story-panels">
          <article>
            <span className="story-icon">$</span>
            <h3>Criterio financiero</h3>
            <p>Priorización por materialidad, vencimiento, riesgo de duplicidad y desvío presupuestario.</p>
          </article>
          <article>
            <span className="story-icon">DB</span>
            <h3>Confiabilidad de datos</h3>
            <p>Modelo dimensional, validaciones, trazabilidad y controles automáticos sobre cada etapa.</p>
          </article>
          <article>
            <span className="story-icon">BI</span>
            <h3>Comunicación ejecutiva</h3>
            <p>KPIs y visualizaciones diseñados para orientar conversaciones y decisiones concretas.</p>
          </article>
        </div>
      </section>

      <section className="project-gallery-section">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">Recorrido visual</p>
            <h2>Una solución, distintas preguntas.</h2>
          </div>
          <div className="project-gallery">
            <figure>
              <Image src="/projects/control-tower/02-accounts-payable.png" alt="Análisis de cuentas a pagar" width={1265} height={817} />
              <figcaption><strong>Cuentas a pagar</strong><span>Exposición, vencimientos y prioridades.</span></figcaption>
            </figure>
            <figure>
              <Image src="/projects/control-tower/03-procurement.png" alt="Análisis de compras y proveedores" width={1265} height={817} />
              <figcaption><strong>Compras</strong><span>Gasto, proveedores y concentración.</span></figcaption>
            </figure>
            <figure>
              <Image src="/projects/control-tower/05-cash-forecast.png" alt="Forecast de caja" width={1265} height={817} />
              <figcaption><strong>Caja</strong><span>Forecast y compromisos próximos.</span></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="project-resources-section">
        <div className="shell resources-grid">
          <div>
            <p className="eyebrow">Explorar el proyecto</p>
            <h2>Probalo, revisalo y recorré la solución.</h2>
            <div className="stack" aria-label="Tecnologías utilizadas">
              {stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <div className="resource-list">
            <Link className="resource-link resource-link-primary" href="/projects/nexora-control-tower/demo">
              <span><small>Aplicación funcional</small>Demo interactiva</span><strong>↗</strong>
            </Link>
            <a className="resource-link" href={projectRepository} target="_blank" rel="noreferrer">
              <span><small>Código y documentación</small>Repositorio GitHub</span><strong>↗</strong>
            </a>
            <span className="resource-link resource-link-pending" aria-disabled="true">
              <span><small>Próximamente</small>Video explicativo en YouTube</span><strong>—</strong>
            </span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner"><span>© 2026 Milagros Sotelo</span><Link href="/">Volver al portfolio</Link></div>
      </footer>
    </main>
  );
}
