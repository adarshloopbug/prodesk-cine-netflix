import React from 'react';
import MovieCard from './MovieCard';

export default function FavoritesView({
  favorites,
  onMovieClick,
  onToggleFavorite,
  onBackToBrowse
}) {
  const isEmpty = favorites.length === 0;

  return (
    <section id="favorites-view" className="view-section">
      <div className="section-title-bar">
        <h2>My Favorites</h2>
      </div>

      {isEmpty ? (
        <div id="favorites-empty" className="empty-state">
          <i className="fa-regular fa-heart empty-icon"></i>
          <h3>Your list is empty</h3>
          <p>Tap the heart icon on any movie to save it here for offline persistence.</p>
          <button
            className="primary-btn"
            id="favorites-back-btn"
            onClick={onBackToBrowse}
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="movies-grid" id="favorites-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={onMovieClick}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
