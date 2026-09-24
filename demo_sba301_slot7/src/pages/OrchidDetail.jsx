/**
 * OrchidDetail.jsx
 *
 * Demonstrates:
 *  - useParams hook to extract the `:id` route parameter from the URL
 *  - <Link> for the "back" navigation button
 *
 * Route: /detail/:id
 */
import { Link, useParams, useNavigate } from "react-router-dom";
import { orchids } from "../data/orchids";
import "./OrchidDetail.css";

function OrchidDetail() {
  // useParams returns an object of { key: value } pairs from the current URL.
  // Here, `id` matches the `:id` token defined in the Route path.
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the matching orchid from the static data
  const orchid = orchids.find((obj) => obj.id === id);

  // Edge case: orchid not found (e.g. /detail/999)
  if (!orchid) {
    return (
      <main className="detail-page">
        <div className="detail-not-found">
          <span className="not-found-emoji">😔</span>
          <h1>Orchid Not Found</h1>
          <p>
            No orchid with ID <code>{id}</code> exists in our gallery.
          </p>
          <Link to="/" className="back-btn">
            ← Back to Gallery
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="detail-page">
      {/* Back button using Link */}
      <Link to="/" className="back-btn" id="back-to-gallery">
        ← Back to Gallery
      </Link>

      <article
        className="detail-card"
        style={{ "--detail-color": orchid.color }}
      >
        {/* Hero Section */}
        <div className="detail-hero">
          <span className="detail-emoji" aria-hidden="true">
            {orchid.emoji}
          </span>
          <div className="detail-hero-text">
            <h1 className="detail-name">{orchid.name}</h1>
            <p className="detail-common">"{orchid.commonName}"</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="detail-info-grid">
          <div className="info-item">
            <span className="info-label">Origin</span>
            <span className="info-value">📌 {orchid.origin}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Color</span>
            <span className="info-value">
              <span
                className="color-dot"
                style={{ background: orchid.color }}
              />
              {orchid.colorLabel}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Difficulty</span>
            <span className="info-value difficulty">{orchid.difficulty}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Orchid ID</span>
            <span className="info-value">
              <code>{orchid.id}</code>
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="detail-description">
          <h2>About this Orchid</h2>
          <p>{orchid.description}</p>
        </div>

        {/* useParams demo box */}
        <div className="params-panel">
          <span className="params-label">
            🪝 <code>useParams()</code> returned:
          </span>
          <pre className="params-code">
            {JSON.stringify({ id }, null, 2)}
          </pre>
        </div>

        {/* useNavigate demo button */}
        <div className="navigate-demo">
          <p className="navigate-label">
            🪝 <code>useNavigate()</code> demo:
          </p>
          <button
            className="navigate-btn"
            id="btn-navigate-back"
            onClick={() => navigate(-1)}
          >
            ← Go Back (navigate(-1))
          </button>
          <button
            className="navigate-btn navigate-home"
            id="btn-navigate-home"
            onClick={() => navigate("/")}
          >
            🏠 Go Home (navigate("/"))
          </button>
        </div>
      </article>
    </main>
  );
}

export default OrchidDetail;
