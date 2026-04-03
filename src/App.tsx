import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Portfolio } from "./pages/Portfolio";
import { ProjectsPage } from "./pages/ProjectsPage";
import { WeatherPage } from "./pages/WeatherPage";
import { ToolPage } from "./pages/ToolPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/weather" element={<WeatherPage />} />
        <Route path="/json_tool" element={<ToolPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
