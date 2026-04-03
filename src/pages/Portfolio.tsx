import { useNavigate } from "react-router-dom";

export const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <div className="portfolio-container">
      <nav className="portfolio-nav">
        <div className="nav-logo">KAMAL.DEV</div>
        <div className="nav-links">
          <button className="projects" onClick={() => navigate("/projects")}>
            Projects
          </button>
          <button className="about">About</button>
          <button
            onClick={() => navigate("/json_tool")}
            className="nav-cta"
            style={{ marginRight: "10px" }}
          >
            Launch JSON Tool
          </button>
        </div>
      </nav>

      <main className="portfolio-content">
        {/* Your hero / landing content goes here */}
      </main>

      <footer className="portfolio-footer">
        <p>&copy; 2026 Kamal. Built with passion and TypeScript.</p>
      </footer>
    </div>
  );
};