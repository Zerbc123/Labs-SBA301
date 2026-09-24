/**
 * HomePage.jsx
 *
 * Demonstrates:
 *  - <Link> component to navigate to a route parameter URL
 *  - useLocation hook to read and display the current location object
 */
import { Link, useLocation } from "react-router-dom";
import { orchids } from "../data/orchids";
import "./HomePage.css";

const difficultyColor = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

function HomePage() {
  // useLocation returns the current location object: { pathname, search, hash, state, key }
  const location = useLocation();

  return (
    <main className="home-page">
      {/* Page Header */}
      <section className="home-header">
        <h1 className="home-title">
          🌺 Orchid Gallery
        </h1>
        <p className="home-subtitle">
          Explore rare and beautiful orchids from around the world.
          <br />
          Click any orchid to view its full profile.
        </p>

        {/* useLocation Demo Panel */}
        <div className="location-panel">
          <span className="location-label">
            📍 <code>useLocation()</code> — current location object:
          </span>
          <pre className="location-code">
            {JSON.stringify(
              {
                pathname: location.pathname,
                search: location.search,
                hash: location.hash,
                key: location.key,
              },
              null,
              2
            )}
          </pre>
        </div>
      </section>

      {/* Orchid Grid */}
      <section className="orchid-grid" aria-label="Orchid collection">
        {orchids.map((orchid) => (
          <article
            key={orchid.id}
            className="orchid-card"
            style={{ "--card-color": orchid.color }}
          >
            <div className="card-emoji" aria-hidden="true">
              {orchid.emoji}
            </div>

            <div className="card-body">
              <h2 className="card-name">{orchid.name}</h2>
              <p className="card-common">{orchid.commonName}</p>
              <p className="card-origin">📌 {orchid.origin}</p>
              <p className="card-description">{orchid.description}</p>
            </div>

            <div className="card-footer">
              <span
                className="card-difficulty"
                style={{ color: difficultyColor[orchid.difficulty] }}
              >
                ● {orchid.difficulty}
              </span>

              {/*
               * <Link> component — navigates to the detail route with a route param.
               * Equivalent to: <a href={`/detail/${orchid.id}`}> but handled client-side.
               */}
              <Link
                to={`detail/${orchid.id}`}
                className="card-link"
                id={`orchid-link-${orchid.id}`}
              >
                View Detail →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
