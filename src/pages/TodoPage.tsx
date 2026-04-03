import { useNavigate } from "react-router-dom";
import { TodoDashboard } from "../features/todo";

export const TodoPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px 40px", maxWidth: "1000px", margin: "0 auto" }}>
      <button
        onClick={() => navigate("/projects")}
        style={{
          background: "transparent",
          border: "none",
          color: "#888",
          cursor: "pointer",
          fontSize: "0.9rem",
          padding: "0",
          marginBottom: "24px",
        }}
      >
        ← Back to Projects
      </button>
      <TodoDashboard />
    </div>
  );
};
