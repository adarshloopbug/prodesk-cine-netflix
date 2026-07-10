import React, { useState } from 'react';
export default function MovieCard({ movie, onMovieClick, isFavorite, onToggleFavorite }) {
  const [loaded, setLoaded] = useState(false);
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const src = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '';
  const handleFav = (e) => { e.stopPropagation(); onToggleFavorite(movie); };
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie.id)} data-id={movie.id}>
      <div className="poster-wrapper">
        {src ? (
          <img src={src} alt={`${movie.title} Poster`} className={`poster-img ${loaded ? 'loaded' : ''}`} loading="lazy" onLoad={() => setLoaded(true)} />
        ) : (
          <div className="poster-placeholder"><i className="fa-solid fa-film" /><span>{movie.title}</span></div>
        )}
        <div className="card-actions">
          <button className={`heart-btn ${isFavorite ? 'liked' : ''}`} onClick={handleFav} title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}><i className="fa-regular fa-heart" /></button>
        </div>
      </div>
      <div className="movie-card-info">
        <h4>{movie.title}</h4>
        <div className="movie-card-meta">
          <span className="card-year">{year}</span>
          <span className="card-rating"><i className="fa-solid fa-star" /> {rating}</span>
        </div>
      </div>
    </div>
  );
}
