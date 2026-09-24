/**
 * Dashboard.jsx
 *
 * Demonstrates:
 *  - Nested routes — this is the PARENT route at "/dashboard"
 *  - <Outlet> renders the active child route (messages or tasks)
 *  - <NavLink> for the dashboard sub-navigation
 *
 * Route tree:
 *   /dashboard                → Dashboard (renders nothing in Outlet)
 *   /dashboard/messages       → Dashboard (renders DashboardMessages in Outlet)
 *   /dashboard/tasks          → Dashboard (renders DashboardTasks in Outlet)
 */
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const location = useLocation();

  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">📊 Dashboard</h1>
        <p className="dashboard-subtitle">
          Nested Routes + <code>&lt;Outlet&gt;</code> Demo
        </p>
      </div>

      {/* Sub-navigation using NavLink */}
      <nav className="dashboard-subnav" aria-label="Dashboard navigation">
        <NavLink
          to="messages"
          id="tab-messages"
          className={({ isActive }) =>
            isActive ? "dash-tab active" : "dash-tab"
          }
        >
          💬 Messages
        </NavLink>
        <NavLink
          to="tasks"
          id="tab-tasks"
          className={({ isActive }) =>
            isActive ? "dash-tab active" : "dash-tab"
          }
        >
          ✅ Tasks
        </NavLink>
      </nav>

      {/* Outlet info panel */}
      <div className="outlet-info">
        <span>
          🔌 <code>&lt;Outlet /&gt;</code> renders child route here. Current
          path: <code>{location.pathname}</code>
        </span>
      </div>

      {/*
       * <Outlet> is the key piece of nested routing.
       * When URL is "/dashboard/messages", <DashboardMessages> renders here.
       * When URL is "/dashboard/tasks",    <DashboardTasks> renders here.
       * When URL is exactly "/dashboard",  nothing renders (no index route).
       */}
      <div className="outlet-container">
        <Outlet />
      </div>
    </main>
  );
}

export default Dashboard;
