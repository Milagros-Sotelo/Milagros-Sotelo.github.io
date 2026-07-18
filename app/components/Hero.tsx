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
              <span className="copy-social-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
                </svg>
              </span>
              <small>LinkedIn</small>
            </a>
            <a className="copy-social-link copy-github" href={githubProfile} target="_blank" rel="noreferrer" aria-label="Milagros Sotelo on GitHub">
              <span className="copy-social-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                  <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.74-1.55-2.57-.29-5.28-1.29-5.28-5.69 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.82 1.19 3.08 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
                </svg>
              </span>
              <small>GitHub</small>
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
