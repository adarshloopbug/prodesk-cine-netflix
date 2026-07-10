export const GENRES_MAP = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance",
  878: "Science Fiction", 10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

export async function fetchFromTMDB(endpoint, apiKey, queryParams = {}) {
  const params = new URLSearchParams({ api_key: apiKey, language: 'en-US', ...queryParams });
  const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?${params}`);
  if (!response.ok) throw new Error(`TMDB API request failed with status: ${response.status}`);
  return response.json();
}

export async function fetchAiRecommendation(prompt, geminiApiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `Based on this user mood or request: "${prompt}". Recommending exactly one popular movie. Return ONLY the title of the movie as a plain string, with absolutely no other text, markdown formatting, explanations, punctuation or quotes. Be extremely direct.` }] }]
    })
  });
  if (!response.ok) throw new Error(`Gemini API request failed with status: ${response.status}`);
  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response candidate received from Gemini AI");
  return text.trim().replace(/^["']|["']$/g, '');
}
