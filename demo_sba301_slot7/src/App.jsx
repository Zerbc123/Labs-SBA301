/**
 * App.jsx
 *
 * Root application component. Demonstrates:
 *  - useRoutes hook — the functional equivalent of <Routes>/<Route> JSX.
 *    Routes are defined as JavaScript objects with the same shape as <Route> elements.
 *  - Nested route config (children array = nested <Route> elements).
 *  - Persistent layout (Navbar) shown on all pages via a shared layout wrapper.
 *
 * Route Map:
 *  /                       → HomePage
 *  /detail/:id             → OrchidDetail
 *  /dashboard              → Dashboard (parent, has Outlet)
 *    /dashboard/messages   → DashboardMessages
 *    /dashboard/tasks      → DashboardTasks
 *  /search                 → SearchPage
 *  /login                  → LoginPage
 *  /session-timed-out      → SessionTimeout
 *  *                       → NotFound (404 catch-all)
 */
import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import OrchidDetail from "./pages/OrchidDetail";
import Dashboard from "./pages/Dashboard";
import DashboardMessages from "./pages/DashboardMessages";
import DashboardTasks from "./pages/DashboardTasks";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SessionTimeout from "./pages/SessionTimeout";
import NotFound from "./pages/NotFound";

// Import shared child-route styles so both Dashboard children use them
import "./pages/ChildRoute.css";
import "./App.css";

/**
 * Route configuration array — passed to useRoutes().
 * Each object maps to the equivalent <Route> JSX element:
 *   { path, element, children } ≡ <Route path element><children /></Route>
 */
const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/detail/:id",
    element: <OrchidDetail />,
  },
  {
    // Parent route — renders <Dashboard> which contains <Outlet>
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "messages",        // resolves to /dashboard/messages
        element: <DashboardMessages />,
      },
      {
        path: "tasks",           // resolves to /dashboard/tasks
        element: <DashboardTasks />,
      },
    ],
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/session-timed-out",
    element: <SessionTimeout />,
  },
  {
    path: "*",                   // catch-all — renders 404 page
    element: <NotFound />,
  },
];

function App() {
  /**
   * useRoutes is the hook-based equivalent of <Routes>.
   * It accepts the same route config structure and returns a React element
   * (the matched route's element) or null if nothing matches.
   */
  const routeElement = useRoutes(routes);

  return (
    <div className="app-layout">
      {/* Navbar is rendered on every page */}
      <Navbar />

      {/* routeElement renders the matched page component */}
      <div className="app-content">
        {routeElement}
      </div>
    </div>
  );
}

export default App;
