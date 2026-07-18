import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PageMotion } from "./components/PageMotion";
import { Projects } from "./components/Projects";

export default function Home() {
  return (
    <main className="portfolio-home portfolio-copy">
      <PageMotion />
      <div className="organic-intro" aria-hidden="true"><i /><i /><i /></div>
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
      <footer className="copy-footer" data-reveal="up">
        <p>© 2026 Milagros Sotelo. All rights reserved.</p>
      </footer>
    </main>
  );
}
