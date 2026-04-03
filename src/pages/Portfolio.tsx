import { useNavigate } from "react-router-dom";
import { WeatherDashboard } from "../components/WeatherDashboard"; // Adjust path if you saved it elsewhere

export const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <div className="portfolio-container">
      <nav className="portfolio-nav">
        <div className="nav-logo">KAMAL.DEV</div>
        <div className="nav-links">
          <button className="projects">Projects</button>
          <button className="about">About</button>
          {/* Existing JSON Tool Route */}
          <button
            onClick={() => navigate("/json_tool")}
            className="nav-cta"
            style={{ marginRight: "10px" }}
          >
            Launch JSON Tool
          </button>
          {/* Optional: Add a routing button for the weather tool later if you want it on its own page */}
          {/* <button onClick={() => navigate('/weather')} className="nav-cta">
                        Weather App
                    </button> */}
        </div>
      </nav>

      {/* Main content wrapper */}
      <main
        className="portfolio-content"
        style={{
          padding: "40px 20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Embedded Weather Component */}
        <div style={{ width: "100%", maxWidth: "900px" }}>
          <WeatherDashboard />
        </div>
      </main>

      <footer className="portfolio-footer">
        <p>&copy; 2026 Kamal. Built with passion and TypeScript.</p>
      </footer>
    </div>
  );
};
