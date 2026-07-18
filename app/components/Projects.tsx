"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projects } from "../portfolio-config";
import type { PortfolioProject } from "../portfolio-config";

const projectCoverImages: Record<PortfolioProject["tone"], string> = {
  payflow: "/project-covers/payflow.png",
  growth: "/project-covers/growthsignal.png",
  reportmind: "/project-covers/reportmind-ai.png",
};

function ProjectCoverImage({ project, large = false }: { project: PortfolioProject; large?: boolean }) {
  return (
    <Image
      src={projectCoverImages[project.tone]}
      alt={`${project.name} project logo`}
      width={1255}
      height={1255}
      sizes={large ? "(max-width: 700px) 100vw, 1060px" : "(max-width: 900px) 100vw, 390px"}
      className={`project-cover-image${large ? " project-cover-image-large" : ""}`}
      unoptimized
    />
  );
}

export function Projects() {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithKeyboard);
    };
  }, [selected]);

  return (
    <section className="copy-projects" id="projects">
      <div className="shell">
        <div className="copy-section-heading" data-reveal="up">
          <p>Selected work</p>
          <h2>Projects</h2>
          <span>Three practical solutions built around real business decisions, with live demos and documented code.</span>
        </div>

        <div className="copy-project-grid">
          {projects.map((project, index) => (
            <button
              className="copy-project-card"
              key={project.name}
              data-reveal="card"
              data-reveal-delay={index + 1}
              type="button"
              onClick={() => setSelected(project)}
              aria-haspopup="dialog"
              aria-label={`Open ${project.name} project overview`}
            >
              <div className={`copy-project-cover ${project.tone}`}>
                <ProjectCoverImage project={project} />
              </div>

              <div className="copy-project-body">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="copy-project-tech">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
                <strong className="copy-learn-more">Click to learn more →</strong>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected ? (
        <div className="project-modal-backdrop" onMouseDown={() => setSelected(null)}>
          <article
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="project-modal-close" type="button" onClick={() => setSelected(null)} autoFocus aria-label="Close project overview">×</button>
            <div className={`project-modal-cover ${selected.tone}`}>
              <ProjectCoverImage project={selected} large />
              <div className="project-modal-techline" aria-hidden="true">
                {selected.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="project-modal-body">
              <p className="project-modal-eyebrow">Portfolio case study</p>
              <h3 id="project-modal-title">{selected.name}</h3>
              <p className="project-modal-summary">{selected.summary}</p>

              <h4>Key highlights</h4>
              <ul>
                {selected.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>

              <h4>Stack</h4>
              <div className="project-modal-stack">
                {selected.stack.map((item) => <span key={item}>{item}</span>)}
              </div>

              <div className="project-modal-actions">
                <a href={selected.demo} target="_blank" rel="noreferrer"><span aria-hidden="true">◎</span> Live Demo</a>
                <a href={selected.repository} target="_blank" rel="noreferrer"><span aria-hidden="true">GH</span> GitHub</a>
                <span className="project-resource-disabled" aria-disabled="true" title="Video link will be added soon"><span aria-hidden="true">▶</span> Video Demo <small>Coming soon</small></span>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
