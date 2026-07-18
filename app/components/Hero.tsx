import Image from "next/image";
import { githubProfile, linkedinProfile } from "../portfolio-config";

export function Hero() {
  return (
    <section className="copy-hero" id="home">
      <div className="shell copy-hero-container">
        <div className="copy-hero-content">
          <p className="copy-hero-badge"><span aria-hidden="true">👋</span> Hi, I&apos;m</p>
          <h1>Milagros Sotelo</h1>
          <h2>Finance, Data &amp; Business Intelligence Analyst</h2>
          <p className="copy-hero-description">
            I turn financial and operational data into clear, actionable
            decisions. My work combines business analysis, dashboards and
            automation with a strong focus on traceability, measurable impact
            and communication for non-technical stakeholders.
          </p>

          <div className="copy-hero-actions">
            <a className="copy-button copy-button-primary" href="#projects">View my projects</a>
            <a className="copy-button copy-button-secondary" href="#contact">Contact me</a>
          </div>

          <div className="copy-social-links" aria-label="Professional links">
            <a className="copy-social-link copy-linkedin" href={linkedinProfile} target="_blank" rel="noreferrer" aria-label="Milagros Sotelo on LinkedIn">
              <span className="copy-social-icon" aria-hidden="true"><b>in</b></span><small>LinkedIn</small>
            </a>
            <a className="copy-social-link copy-github" href={githubProfile} target="_blank" rel="noreferrer" aria-label="Milagros Sotelo on GitHub">
              <span className="copy-social-icon" aria-hidden="true"><i /><b>GH</b></span><small>GitHub</small>
            </a>
          </div>
        </div>

        <div className="copy-hero-visual">
          <div className="copy-profile-container">
            <div className="copy-profile-glow">
              <Image
                src="/milagros-profile.jpg"
                alt="Milagros Sotelo"
                width={821}
                height={1280}
                className="copy-profile-image"
                priority
                unoptimized
              />
            </div>
            <h3>Finance · Data · Business Intelligence</h3>
          </div>

          <div className="copy-code-display" aria-label="Professional profile summary">
            <div className="copy-code-header"><i /><i /><i /><span>profile.ts</span></div>
            <pre><code><span className="code-line"><span className="code-keyword">const</span> <span className="code-variable">professionalProfile</span> = {"{"}</span><span className="code-line">  <span className="code-property">name</span>: <span className="code-string">&quot;Milagros Sotelo&quot;</span>,</span><span className="code-line">  <span className="code-property">location</span>: <span className="code-string">&quot;🌎 Buenos Aires, Argentina&quot;</span>,</span><span className="code-line">  <span className="code-property">role</span>: <span className="code-string">&quot;Finance, Data &amp; BI Analyst&quot;</span>,</span><span className="code-line">  <span className="code-property">toolkit</span>: [<span className="code-string">&quot;SQL&quot;</span>, <span className="code-string">&quot;Python&quot;</span>, <span className="code-string">&quot;Power BI&quot;</span>],</span><span className="code-line">  <span className="code-property">strengths</span>: [<span className="code-string">&quot;analysis&quot;</span>, <span className="code-string">&quot;business&quot;</span>, <span className="code-string">&quot;clarity&quot;</span>],</span><span className="code-line">  <span className="code-property">status</span>: <span className="code-status">&quot;Open to opportunities&quot;</span></span><span className="code-line">{"};"}</span></code></pre>
          </div>

          <div className="copy-floating-card">
            <span className="copy-status-icon" aria-hidden="true">💻</span>
            <p><small>Current status</small>Open to full-time opportunities</p>
            <i className="copy-status-signal" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
