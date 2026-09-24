/**
 * Navbar.jsx
 *
 * Demonstrates <NavLink> from react-router-dom.
 * NavLink automatically receives `isActive` and `isPending` states,
 * which are used here to apply the "active" CSS class for the current route.
 */
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { to: "/", label: "🌸 Home", end: true },
  { to: "/dashboard", label: "📊 Dashboard" },
  { to: "/search", label: "🔍 Search" },
  { to: "/login", label: "🔑 Login" },
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🌺</span>
        <span className="navbar-title">OrchidGallery</span>
        <span className="navbar-subtitle">React Router v6 Demo</span>
      </div>

      <nav className="navbar-links" aria-label="Main navigation">
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end} // ensures "/" only matches exactly, not all routes
            className={({ isActive, isPending }) =>
              [
                "nav-link",
                isActive ? "active" : "",
                isPending ? "pending" : "",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
