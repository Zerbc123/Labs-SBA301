/**
 * SearchPage.jsx
 *
 * Demonstrates useSearchParams hook:
 *  - Reading query string:  searchParams.get("q")
 *  - Writing query string:  setSearchParams({ q: value })
 *
 * Route: /search
 * Try: /search?q=blue
 */
import { useSearchParams } from "react-router-dom";
import { orchids } from "../data/orchids";
import "./SearchPage.css";

function SearchPage() {
  // useSearchParams returns [searchParams, setSearchParams]
  // searchParams is a URLSearchParams object
  const [searchParams, setSearchParams] = useSearchParams();

  // Read the current "q" query parameter from the URL
  const query = searchParams.get("q") || "";

  // Filter orchids based on the query
  const results = query.trim()
    ? orchids.filter(
        (o) =>
          o.name.toLowerCase().includes(query.toLowerCase()) ||
          o.commonName.toLowerCase().includes(query.toLowerCase()) ||
          o.origin.toLowerCase().includes(query.toLowerCase()) ||
          o.colorLabel.toLowerCase().includes(query.toLowerCase()) ||
          o.difficulty.toLowerCase().includes(query.toLowerCase())
      )
    : orchids;

  /**
   * Update the URL query string when the user types.
   * setSearchParams replaces the current search params — the URL updates
   * without a page reload, and the browser history entry is updated.
   */
  function handleSearch(e) {
    const value = e.target.value;
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <main className="search-page">
      <div className="search-header">
        <h1>🔍 Search Orchids</h1>
        <p>
          <code>useSearchParams</code> demo — the URL updates live as you type!
        </p>
      </div>

      {/* Search input */}
      <div className="search-box">
        <input
          id="search-input"
          type="text"
          placeholder="Search by name, origin, color, difficulty…"
          value={query}
          onChange={handleSearch}
          className="search-input"
          autoFocus
          autoComplete="off"
        />
        {query && (
          <button
            className="search-clear"
            id="search-clear-btn"
            onClick={() => setSearchParams({})}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* useSearchParams demo panel */}
      <div className="search-params-panel">
        <span className="params-label">
          🪝 <code>useSearchParams()</code> state:
        </span>
        <pre className="params-code">
          {`searchParams.get("q") = ${JSON.stringify(query || null)}`}
          {"\n"}
          {`URL: ${window.location.pathname}${window.location.search}`}
        </pre>
      </div>

      {/* Results */}
      <div className="search-results">
        <p className="results-count">
          {results.length} orchid{results.length !== 1 ? "s" : ""} found
          {query && <> matching <strong>"{query}"</strong></>}
        </p>

        {results.length === 0 ? (
          <div className="no-results">
            <span>🌵</span>
            <p>No orchids match your search.</p>
          </div>
        ) : (
          <ul className="result-list">
            {results.map((orchid) => (
              <li
                key={orchid.id}
                className="result-item"
                style={{ "--result-color": orchid.color }}
              >
                <span className="result-emoji" aria-hidden="true">
                  {orchid.emoji}
                </span>
                <div className="result-info">
                  <span className="result-name">{orchid.name}</span>
                  <span className="result-meta">
                    {orchid.commonName} · {orchid.origin} ·{" "}
                    <span style={{ color: orchid.color }}>
                      {orchid.colorLabel}
                    </span>
                  </span>
                </div>
                <span className="result-difficulty">{orchid.difficulty}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default SearchPage;
