import React from 'react';

export default function Header({
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
  onSettingsClick,
  tmdbKeyConfigured
}) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-left">
          <a
            href="#browse"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              onViewChange('browse');
              onSearchChange('');
            }}
          >
            NETFLIX<span>LITE</span>
          </a>
          <nav className="nav-links">
            {['browse', 'favorites'].map((view) => (
              <button
                key={view}
                className={`nav-btn ${activeView === view ? 'active' : ''}`}
                onClick={() => onViewChange(view)}
              >
                {view === 'browse' ? 'Browse' : 'My Favorites'}
              </button>
            ))}
          </nav>
        </div>

        <div className="header-right">
          {activeView === 'browse' && tmdbKeyConfigured && (
            <div className="search-bar-container" id="search-bar-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                id="movie-search-input"
                placeholder="Titles, genres, people..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  className="clear-btn"
                  onClick={() => onSearchChange('')}
                  title="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          )}

          <button
            className="icon-btn"
            id="settings-btn"
            onClick={onSettingsClick}
            title="API Settings"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
