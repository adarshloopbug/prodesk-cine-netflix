# Netflix-Lite - Media Discovery SPA

Netflix-Lite is a high-performance Single Page Application (SPA) designed to browse popular movies, save favorites, and match user moods using personalized AI suggestions.

## Tech Stack

- **Core Framework**: React 18 & Vite
- **Styling**: Modern, modular Vanilla CSS (Tailwind-free)
- **APIs**:
  - **TMDB REST API** for live media content discovery
  - **Google Gemini 2.5 Flash API** for real-time vibe & mood movie recommendation matchmaking

## Performance Optimization Highlights

- **IntersectionObserver Pagination**: Fluid on-demand infinite scroll hydration that loads consecutive pages seamlessly without memory leaks.
- **Search input Debouncing**: A custom `useDebounce` hook restricts queries to occur at most once every `500ms` during active typing.
- **Image Load Animation**: Smooth opacity fade-in effects on film posters when images finish loading.
- **Lazy Loading**: Native browser-level `loading="lazy"` poster image optimizations.
- **Offline Persistence**: Syncs user favorites list to `localStorage` for offline persistence.

## Project Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```
