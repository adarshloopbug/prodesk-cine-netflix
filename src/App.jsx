import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SetupScreen from './components/SetupScreen';
import MoodMatcher from './components/MoodMatcher';
import MovieGrid from './components/MovieGrid';
import FavoritesView from './components/FavoritesView';
import SettingsModal from './components/SettingsModal';
import DetailsModal from './components/DetailsModal';
import { fetchFromTMDB } from './utils/api';
import useDebounce from './hooks/useDebounce';

export default function App() {
  const [keys, setKeys] = useState(() => {
    const getVal = (v, k) => (v && !v.includes('api_key_here') ? v : localStorage.getItem(k) || '');
    return { tmdb: getVal(import.meta.env.VITE_TMDB_API_KEY, 'tmdb_api_key'), gemini: getVal(import.meta.env.VITE_GEMINI_API_KEY, 'gemini_api_key') };
  });
  const [activeView, setActiveView] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [aiMovieTitle, setAiMovieTitle] = useState('');
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('netflix_lite_favorites')) || []);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeDetailsId, setActiveDetailsId] = useState(null);

  const loadMovies = async (pageToLoad, clearExisting = false) => {
    if (!keys.tmdb || (isLoading && !clearExisting)) return;
    setIsLoading(true);
    setIsError(false);
    try {
      const query = debouncedSearchQuery || aiMovieTitle;
      const data = await fetchFromTMDB(
        query ? 'search/movie' : 'movie/popular',
        keys.tmdb,
        query ? { query, page: pageToLoad } : { page: pageToLoad }
      );
      if (data.results) {
        setMovies(prev => clearExisting ? data.results : [...prev, ...data.results]);
        setHasMore(data.page < data.total_pages);
        setCurrentPage(data.page + 1);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (keys.tmdb) loadMovies(1, true);
    else setMovies([]);
  }, [debouncedSearchQuery, aiMovieTitle, keys.tmdb]);

  const handleSaveSettings = (tmdb, gemini) => {
    setKeys({ tmdb, gemini });
    localStorage.setItem('tmdb_api_key', tmdb);
    localStorage.setItem('gemini_api_key', gemini);
    setIsSettingsOpen(false);
  };

  const handleToggleFavorite = (movie) => {
    setFavorites(prev => {
      const updated = prev.some(f => f.id === movie.id) ? prev.filter(f => f.id !== movie.id) : [...prev, movie];
      localStorage.setItem('netflix_lite_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <Header
        activeView={activeView}
        onViewChange={(v) => { setActiveView(v); setActiveDetailsId(null); }}
        searchQuery={searchQuery}
        onSearchChange={(q) => { setSearchQuery(q); if (q) setAiMovieTitle(''); }}
        onSettingsClick={() => setIsSettingsOpen(true)}
        tmdbKeyConfigured={!!keys.tmdb}
      />
      <main className="main-content">
        {!keys.tmdb ? (
          <SetupScreen onSettingsClick={() => setIsSettingsOpen(true)} />
        ) : activeView === 'browse' ? (
          <section id="browser-view" className="view-section">
            <MoodMatcher geminiApiKey={keys.gemini} onAiRecommendation={(title) => { setSearchQuery(''); setAiMovieTitle(title); }} />
            <div className="section-title-bar">
              <h2>{debouncedSearchQuery ? `Search Results for "${debouncedSearchQuery}"` : aiMovieTitle ? `AI Recommendation: "${aiMovieTitle}"` : 'Popular Movies'}</h2>
              {(debouncedSearchQuery || aiMovieTitle) && <button className="text-btn" onClick={() => { setSearchQuery(''); setAiMovieTitle(''); }}>Back to Browse</button>}
            </div>
            <MovieGrid movies={movies} favorites={favorites} onMovieClick={setActiveDetailsId} onToggleFavorite={handleToggleFavorite} isLoading={isLoading} isError={isError} onLoadMore={() => loadMovies(currentPage)} hasMore={hasMore} />
          </section>
        ) : (
          <FavoritesView favorites={favorites} onMovieClick={setActiveDetailsId} onToggleFavorite={handleToggleFavorite} onBackToBrowse={() => setActiveView('browse')} />
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Netflix-Lite. Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">TMDB API</a> & <a href="https://ai.google.dev/" target="_blank" rel="noopener">Google Gemini</a>.</p>
      </footer>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} tmdbKey={keys.tmdb} geminiKey={keys.gemini} onSave={handleSaveSettings} />
      <DetailsModal movieId={activeDetailsId} apiKey={keys.tmdb} onClose={() => setActiveDetailsId(null)} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
    </>
  );
}
