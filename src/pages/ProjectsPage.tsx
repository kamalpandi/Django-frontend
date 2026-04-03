import { useNavigate } from "react-router-dom";

const PROJECTS = [
  {
    id: "weather",
    title: "Weather API Tool",
    description: "Search and compare live weather data across multiple cities.",
    tech: ["React", "TypeScript", "Django"],
    route: "/projects/weather",
  },
  {
    id: "json-explorer",
    title: "JSON X-Ray",
    description: "Explore, navigate and inspect deeply nested JSON structures.",
    tech: ["React", "TypeScript"],
    route: "/projects/json-explorer",
  },
  // Add future projects here
];

export const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "60px 40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ color: "#fff", marginBottom: "8px" }}>Projects</h2>
      <p style={{ color: "#888", marginBottom: "40px" }}>
        A collection of tools and experiments.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(project.route)}
            style={{
              border: "1px solid #333",
              borderRadius: "10px",
              padding: "24px",
              background: "#111",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#555")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
          >
            <h3 style={{ color: "#fff", margin: "0 0 10px 0" }}>
              {project.title}
            </h3>
            <p
              style={{
                color: "#888",
                fontSize: "0.9rem",
                margin: "0 0 20px 0",
              }}
            >
              {project.description}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.75rem",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    border: "1px solid #444",
                    color: "#aaa",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
