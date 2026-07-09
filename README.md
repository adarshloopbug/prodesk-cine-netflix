# Netflix-Lite: Media Discovery Single Page Application (SPA)

Netflix-Lite is a high-fidelity media discovery application built with **React and Vite**. It consumes live metadata from **The Movie Database (TMDB)** and provides intelligent, mood-based film suggestions powered by **Google Gemini AI**.

---

## 🚀 Key Features

- 🎬 **Popular Movies Browser**: Display popular movies with posters, release dates, ratings, and runtime metadata.
- 🔍 **Live Search Input**: Query the TMDB Search database dynamically as you type.
- 🧠 **AI Mood Matcher**: Describe your vibe or current feelings in natural language and receive movie suggestions directly from Gemini AI.
- 💖 **My Favorites List**: A persistent, user-curated list of saved movies backed by offline `localStorage` synchronization.
- ⚙️ **API Configuration Panel**: Simple settings popup to configure and update TMDB and Gemini keys.
- ⚡ **Performant Architecture**: Optimized client-side performance built directly into the UI components.

---

## 🛠️ Performance & Optimizations

- 🖱️ **Infinite Scroll (IntersectionObserver)**: Hydrates movie cards dynamically as you scroll down, avoiding DOM clutter and memory leaks.
- ⏱️ **Debounced Search**: Throttles keyboard input queries by `500ms` via a custom `useDebounce` hook, preventing rate-limiting on TMDB API endpoints.
- 🖼️ **Native Lazy Loading**: Movie poster elements use browser-native `loading="lazy"` tags.
- 💫 **Image Fade-In Transitions**: Detects image loading success in React and triggers standard CSS fade-in animations to avoid visual jarring.
- 🗜️ **Optimized CSS**: Large stylesheets are split into feature-specific components (`src/styles/`) and bundled during compile time.

---

## 📁 Repository Structure

```text
├── index.html           # Main HTML5 document layout
├── package.json         # Project manifests and run scripts
├── vite.config.js       # Vite bundler configurations
├── README.md            # Main user documentation
├── prompt.md            # AI prompts and design document details
└── src/
    ├── main.jsx         # Bootstraps the React DOM tree
    ├── App.jsx          # Root component managing global state
    ├── index.css        # Entry style bundler importing split CSS
    ├── components/      # Modular visual elements
    │   ├── DetailsModal.jsx
    │   ├── FavoritesView.jsx
    │   ├── Header.jsx
    │   ├── MoodMatcher.jsx
    │   ├── MovieCard.jsx
    │   ├── MovieGrid.jsx
    │   ├── SettingsModal.jsx
    │   └── SetupScreen.jsx
    ├── hooks/           # Custom React hooks
    │   └── useDebounce.js
    ├── utils/           # Helper utility libraries
    │   └── api.js
    └── styles/          # Modular component CSS styling
        ├── global.css
        ├── Header.css
        ├── Modals.css
        ├── MoodMatcher.css
        ├── MovieGrid.css
        └── Setup.css
```

---

## ⚙️ Project Setup & Installation

### Prerequisites
Make sure you have **Node.js** installed locally on your system.

### 1. Install Project Packages
Execute the command below to install standard dependencies:
```bash
npm install
```

### 2. Launch Local Development Server
Boot up the Vite local server:
```bash
npm run dev
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser to view the application.

### 3. Production Bundling & Compilation
Build files for static hosting:
```bash
npm run build
```
Vite compiles and places all minified HTML, CSS, and JS assets inside the `/dist` directory.
