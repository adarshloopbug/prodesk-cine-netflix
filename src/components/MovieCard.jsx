import React, { useState } from 'react';

export default function MovieCard({
  movie,
  onMovieClick,
  isFavorite,
  onToggleFavorite
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const ratingValue = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const posterSrc = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(movie);
  };

  return (
    <div
      className="movie-card"
      onClick={() => onMovieClick(movie.id)}
      data-id={movie.id}
    >
      <div className="poster-wrapper">
        {posterSrc ? (
          <img
            src={posterSrc}
            alt={`${movie.title} Poster`}
            className={`poster-img ${imageLoaded ? 'loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="poster-placeholder">
            <i className="fa-solid fa-film"></i>
            <span>{movie.title}</span>
          </div>
        )}
        
        <div className="card-actions">
          <button
            className={`heart-btn ${isFavorite ? 'liked' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      <div className="movie-card-info">
        <h4>{movie.title}</h4>
        <div className="movie-card-meta">
          <span className="card-year">{releaseYear}</span>
          <span className="card-rating">
            <i className="fa-solid fa-star"></i> {ratingValue}
          </span>
        </div>
      </div>
    </div>
  );
}
