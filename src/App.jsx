import "./App.css";
import Navbar from "./component/Navbar";
import HealthTips from "./pages/HealthTips";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./features/settings/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/health" element={<HealthTips />} />
        </Routes>
        <footer className="app-footer">Built by Team Committed</footer>
      </div>
    </SettingsProvider>
  );
}

export default App;
