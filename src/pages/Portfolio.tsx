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
          <button 
            className="about" 
            onClick={() => window.open("https://www.linkedin.com/in/kamalpandi/", "_blank", "noopener,noreferrer")}
          >
            About
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