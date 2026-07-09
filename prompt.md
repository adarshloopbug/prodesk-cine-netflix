# Gemini AI Movie Suggestion Prompt

Inside Netflix-Lite, the Google Gemini Flash API is queried to fetch personalized movie suggestions based on user feelings or query vibes.

## System Prompt Definition

The prompt query format sent to the Google Gemini API:

```text
Based on this user mood or request: "${prompt}". Recommending exactly one popular movie. Return ONLY the title of the movie as a plain string, with absolutely no other text, markdown formatting, explanations, punctuation or quotes. Be extremely direct.
```

## Features and Guidelines

- **Direct Answers**: Strips off greeting lines, description synopses, and quotation marks.
- **Tolerant Inputs**: Resolves vague vibes like `"cozy retro sci-fi"` or `"sad but want an action movie"` into a concrete film title.
- **Searchable Returns**: The returned title is immediately fed into the TMDB search API to load corresponding posters, ratings, and synopses dynamically.
