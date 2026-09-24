/**
 * main.jsx — Application Entry Point
 *
 * Demonstrates <BrowserRouter> setup:
 * The entire application is enclosed within <BrowserRouter> to enable
 * client-side routing using the browser's native history API.
 *
 * All React Router hooks (useNavigate, useParams, useLocation, etc.)
 * and components (Link, NavLink, Routes, Route, Navigate, Outlet)
 * MUST be rendered inside a Router context — provided by <BrowserRouter>.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*
     * <BrowserRouter> stores the current location in the browser's address bar
     * using clean URLs (no hash) and navigates using the browser's built-in
     * history stack.
     *
     * Alternative routers from Chapter 6:
     *  - <HashRouter>   — stores location in URL hash (#/path)
     *  - <MemoryRouter> — stores location in memory (useful for testing)
     *  - <StaticRouter> — for server-side rendering in Node
     */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
