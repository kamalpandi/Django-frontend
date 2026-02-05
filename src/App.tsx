import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { ToolPage } from './pages/ToolPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/json_tool" element={<ToolPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;