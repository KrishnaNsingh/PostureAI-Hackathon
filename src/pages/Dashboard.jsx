import PostureCamera from "../component/PostureCamera";
import ScrollToTop from "../component/ScrollToTop";

export default function Dashboard() {
  return (
    <div className="app-content">
      <ScrollToTop />

      {/* Header */}
      <header className="status-bar">
        <div className="brand">
          <div className="brand-icon">🧠</div>
          <div>
            <div className="brand-name">PostureAI</div>
            <div className="brand-tag">Real-time Analysis</div>
          </div>
        </div>

        <div className="status-indicators">
          <div className="indicator">
            <div className="indicator-dot" />
            LIVE
          </div>
          <div className="indicator">MODEL · MOVENET</div>
          <div className="version-badge">v2.0</div>
        </div>
      </header>

      {/* Main */}
      <div className="dashboard-grid">
        <PostureCamera />
      </div>
    </div>
  );
}