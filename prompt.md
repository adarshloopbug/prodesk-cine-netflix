# Netflix-Lite: AI Prompt & UI Design Engineering

This document outlines the prompt engineering patterns utilized for AI movie recommendations and describes the collaborative, AI-assisted design process used to construct the custom user interface.

---

## 1. AI Recommendation Prompt Engineering

To power the **AI Mood Matcher**, the application queries the **Google Gemini 2.5 Flash API** with a highly structured prompt context. This context is designed to produce deterministic, clean, and easily queryable plain-text movie titles.

### Prompt Template
```text
Based on this user mood or request: "${prompt}". Recommending exactly one popular movie. Return ONLY the title of the movie as a plain string, with absolutely no other text, markdown formatting, explanations, punctuation or quotes. Be extremely direct.
```

### Prompt Mechanics
- **Single Title Target**: Restricts response length and forces the AI model to output a single movie title (e.g. `"The Matrix"` instead of `"Sure, here's a suggestion: The Matrix (1999)"`).
- **No Formatting / Punctuation**: Prevents enclosing quotes (`""`) or markdown wrappers (`**`) that would cause subsequent REST queries on the TMDB search endpoint to fail.
- **Direct Vibe Match**: Translates descriptive expressions (such as `"sad but want an action movie"`) into popular, recognized film titles.

---

## 2. AI-Assisted UI Design & Styling

The visual architecture and design system of Netflix-Lite were iteratively generated and refined in collaboration with AI code generation models. 

### Design Philosophy
- **Rich Aesthetics**: A dark glassmorphic interface inspired by modern premium streaming apps. Uses deep dark backgrounds (`#141414`) contrasted with custom violet gradients for AI actions and Netflix-red accent styling.
- **Tailwind-Free Custom CSS**: Styles are written entirely in custom Vanilla CSS to maximize control and minimize compile overhead. They are divided into modular stylesheets under `src/styles/` (such as `Header.css`, `Modals.css`, and `MovieGrid.css`).
- **Micro-Animations**:
  - **Dynamic Card Hovers**: Vertical transition scales and scale-up shadow depth shifts on movie cards.
  - **Poster Fade-ins**: Transition overlays fade from transparent to solid after the movie poster fully registers in the DOM.
  - **Glassmorphic Blur**: A sticky frosted-glass header using browser-native `backdrop-filter`.
