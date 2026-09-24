/**
 * LoginPage.jsx
 *
 * Demonstrates:
 *  - useNavigate hook for programmatic navigation
 *  - <Navigate> component for declarative redirect when condition is met
 *
 * Route: /login
 * On success: redirects to /dashboard via <Navigate replace={true} />
 */
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginPage.css";

// Simulated credentials for the demo
const DEMO_USER = { username: "orchid", password: "demo123" };

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // null = not logged in
  const [isLoading, setIsLoading] = useState(false);

  // useNavigate returns a navigation function — used for programmatic routing
  const navigate = useNavigate();

  /**
   * Simulate an async login. On success, set user state.
   * The <Navigate> component will then render and redirect.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      username === DEMO_USER.username &&
      password === DEMO_USER.password
    ) {
      setUser({ username });
    } else {
      setError("Invalid credentials. Try: orchid / demo123");
    }
    setIsLoading(false);
  }

  /*
   * <Navigate> — when `user` is set (logged in), this component renders
   * and immediately changes the current location to "/dashboard".
   * `replace={true}` replaces the current history entry (no back button to login).
   */
  if (user) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    <main className="login-page">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <span className="login-logo" aria-hidden="true">🌺</span>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to access your dashboard</p>
        </div>

        {/* Credentials hint */}
        <div className="login-hint" role="note">
          <strong>Demo credentials:</strong>
          <code> orchid</code> / <code>demo123</code>
        </div>

        {/* Error message */}
        {error && (
          <div className="login-error" role="alert" id="login-error-msg">
            ⚠️ {error}
          </div>
        )}

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="login-form"
          id="login-form"
          noValidate
        >
          <div className="form-field">
            <label htmlFor="input-username">Username</label>
            <input
              id="input-username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="input-password">Password</label>
            <input
              id="input-password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="login-submit"
            id="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Hook demos */}
        <div className="login-hook-demo">
          <p className="hook-demo-title">🪝 Hook Demos</p>
          <button
            className="hook-demo-btn"
            id="btn-navigate-home"
            onClick={() => navigate("/")}
          >
            navigate("/") — Go Home
          </button>
          <button
            className="hook-demo-btn"
            id="btn-navigate-session"
            onClick={() => navigate("/session-timed-out")}
          >
            navigate("/session-timed-out")
          </button>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
