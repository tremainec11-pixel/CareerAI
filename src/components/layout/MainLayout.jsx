import { NavLink, Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

function MainLayout() {
  function getNavLinkClass({ isActive }) {
    return `sidebar-link ${isActive ? "sidebar-link-active" : ""}`;
  }

  return (
    <div className="app-shell">
      <AppHeader />

      <div className="app-body">
        <aside className="app-sidebar">
          <div className="sidebar-section-label">
            WORKSPACE
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/dashboard"
              className={getNavLinkClass}
            >
              <span className="sidebar-icon">⌂</span>
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/jobs"
              className={getNavLinkClass}
            >
              <span className="sidebar-icon">▣</span>
              <span>Jobs</span>
            </NavLink>

            <NavLink
              to="/applications"
              className={getNavLinkClass}
            >
              <span className="sidebar-icon">✓</span>
              <span>Applications</span>
            </NavLink>

            
<NavLink
  to="/interviews"
  className={getNavLinkClass}
>
  <span className="sidebar-icon">◉</span>
  <span>Interviews</span>
</NavLink>



            <NavLink
              to="/resumes"
              className={getNavLinkClass}
            >
              <span className="sidebar-icon">▤</span>
              <span>Resumes</span>
            </NavLink>
          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-ai-card">
              <div className="sidebar-ai-icon">
                AI
              </div>

              <div>
                <strong>CareerAI</strong>
                <p>AI-powered career tools</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="app-content">
          <div className="page-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
