export function Navbar() {
  return (
    <header className="copy-navbar">
      <div className="shell copy-navbar-inner">
        <a className="copy-logo" href="#home">Portfolio</a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
