import React, { useEffect, useRef } from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({ movies, favorites, onMovieClick, onToggleFavorite, isLoading, isError, onLoadMore, hasMore }) {
  const sentinelRef = useRef(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && hasMore) onLoadMore();
    }, { root: null, rootMargin: '200px', threshold: 0.1 });
    observer.observe(sentinel);
    return () => observer.unobserve(sentinel);
  }, [isLoading, hasMore, onLoadMore]);

  return (
    <>
      <div className="movies-grid" id="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick} isFavorite={favorites.some((fav) => fav.id === movie.id)} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
      {isLoading && <div id="grid-loader" className="loader-container"><div className="spinner" /></div>}
      {isError && (
        <div id="grid-error" className="error-container">
          <i className="fa-solid fa-circle-exclamation error-icon" />
          <p id="error-message">Failed to load content. Please verify your connection or API keys.</p>
        </div>
      )}
      <div ref={sentinelRef} id="scroll-sentinel" className="sentinel" />
    </>
  );
}
