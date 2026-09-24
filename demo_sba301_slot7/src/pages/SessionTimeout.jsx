/**
 * SessionTimeout.jsx
 *
 * Target route for the useNavigate("/session-timed-out") demo.
 * In a real app this would be triggered when an inactivity timer fires.
 *
 * Route: /session-timed-out
 */
import { Link, useNavigate } from "react-router-dom";
import "./SessionTimeout.css";

function SessionTimeout() {
  const navigate = useNavigate();

  return (
    <main className="session-page">
      <div className="session-card">
        <span className="session-icon" aria-hidden="true">⏱️</span>
        <h1 className="session-title">Session Timed Out</h1>
        <p className="session-message">
          Your session has expired due to inactivity. This page is the target
          of the <code>useNavigate("/session-timed-out")</code> demo from the
          Chapter 6 <code>useNavigate</code> example.
        </p>

        {/* Code reference */}
        <div className="session-code-block">
          <pre>{`// From the Chapter 6 useNavigate demo:
function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out"); // ← lands here
    }
  }, [userIsInactive]);
}`}</pre>
        </div>

        {/* Navigation actions */}
        <div className="session-actions">
          <Link to="/login" className="session-btn primary" id="btn-back-to-login">
            🔑 Back to Login
          </Link>
          <button
            className="session-btn secondary"
            id="btn-navigate-home-session"
            onClick={() => navigate("/")}
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default SessionTimeout;
