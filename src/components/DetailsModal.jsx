import React, { useState, useEffect } from 'react';
import { fetchFromTMDB } from '../utils/api';

export default function DetailsModal({ movieId, apiKey, onClose, favorites, onToggleFavorite }) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId || !apiKey) return;
    (async () => {
      setIsLoading(true);
      setIsError(false);
      setDetails(null);
      try {
        setDetails(await fetchFromTMDB(`movie/${movieId}`, apiKey));
      } catch (err) {
        console.error('Failed to load movie details:', err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId, apiKey]);

  useEffect(() => {
    if (!movieId) return;
    const handleKeyDown = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movieId, onClose]);

  if (!movieId) return null;
  const isFavorite = details && favorites.some((fav) => fav.id === details.id);

  return (
    <div className="modal-overlay" id="details-modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content details-modal-box">
        <button className="close-btn circle-close-btn" id="close-details-btn" onClick={onClose}><i className="fa-solid fa-xmark" /></button>
        {isLoading && <div className="modal-body" style={{ textAlign: 'center', padding: '100px 0' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>}
        {isError && (
          <div className="modal-body" style={{ padding: '60px 40px' }}>
            <h2 id="detail-title">Failed to load movie details</h2>
            <p id="detail-overview" style={{ marginTop: '20px' }}>Please confirm your internet connection and API keys.</p>
          </div>
        )}
        {!isLoading && !isError && details && (
          <>
            <div className="details-hero" id="details-hero" style={{ backgroundImage: details.backdrop_path ? `url('https://image.tmdb.org/t/p/w780${details.backdrop_path}')` : 'none' }}><div className="details-hero-overlay" /></div>
            <div className="details-body">
              <h2 id="detail-title">{details.title}</h2>
              <div className="details-meta-row">
                <span className="meta-item badge" id="detail-rating"><i className="fa-solid fa-star" /> {details.vote_average ? details.vote_average.toFixed(1) : 'N/A'}</span>
                <span className="meta-item" id="detail-year">{details.release_date ? details.release_date.split('-')[0] : 'N/A'}</span>
                <span className="meta-item" id="detail-runtime">{details.runtime ? `${details.runtime} min` : 'N/A'}</span>
                <button className={`fav-action-btn ${isFavorite ? 'liked' : ''}`} id="detail-fav-toggle" onClick={() => onToggleFavorite({ ...details, genre_ids: details.genres ? details.genres.map(g => g.id) : [] })} title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}><i className="fa-regular fa-heart" /></button>
              </div>
              <div className="details-genres" id="details-genres">{details.genres?.map((g) => <span key={g.id} className="genre-tag">{g.name}</span>)}</div>
              <p id="detail-overview">{details.overview || 'No description available.'}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
