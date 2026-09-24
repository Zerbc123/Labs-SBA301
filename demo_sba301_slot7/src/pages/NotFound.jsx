/**
 * NotFound.jsx
 *
 * 404 catch-all route. Matched by path="*" in the route config.
 *
 * Route: * (any unmatched path)
 */
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="notfound-page">
      <div className="notfound-card">
        <span className="notfound-code">404</span>
        <span className="notfound-emoji" aria-hidden="true">🌿</span>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-message">
          The path <code>{location.pathname}</code> doesn't match any route
          in this application.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="notfound-btn primary" id="btn-go-home-404">
            🏠 Back to Gallery
          </Link>
          <button
            className="notfound-btn secondary"
            id="btn-go-back-404"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
        </div>

        {/* Route map reference */}
        <div className="route-map">
          <p className="route-map-title">Available Routes</p>
          <ul className="route-map-list">
            {[
              { path: "/", label: "Home — Orchid Gallery" },
              { path: "/detail/:id", label: "Orchid Detail (e.g. /detail/1)" },
              { path: "/dashboard", label: "Dashboard (nested routes)" },
              { path: "/dashboard/messages", label: "Dashboard › Messages" },
              { path: "/dashboard/tasks", label: "Dashboard › Tasks" },
              { path: "/search", label: "Search (?q= param)" },
              { path: "/login", label: "Login" },
              { path: "/session-timed-out", label: "Session Timeout" },
            ].map(({ path, label }) => (
              <li key={path}>
                <Link to={path} className="route-map-link">
                  <code>{path}</code>
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
