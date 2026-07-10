import React, { useState } from 'react';
import { fetchAiRecommendation } from '../utils/api';

export default function MoodMatcher({ geminiApiKey, onAiRecommendation }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);

  if (!geminiApiKey) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = prompt.trim();
    if (!val || loading) return;
    setLoading(true);
    setIsError(false);
    setMsg('Consulting Gemini AI...');
    try {
      const title = await fetchAiRecommendation(val, geminiApiKey);
      setMsg(`AI suggested: ${title}. Searching...`);
      onAiRecommendation(title);
      setTimeout(() => setMsg(''), 2000);
      setPrompt('');
    } catch {
      setIsError(true);
      setMsg('AI suggestion failed. Check your Gemini API Key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-matcher-banner" id="mood-matcher-section">
      <div className="mood-content">
        <div className="mood-badge"><i className="fa-solid fa-wand-magic-sparkles" /> AI Recommendation</div>
        <h3>What are you in the mood for?</h3>
        <p>Describe your vibe or feelings, and our Gemini AI will pick the perfect film suggestion.</p>
        <form className="mood-form" id="mood-matcher-form" onSubmit={handleSubmit}>
          <input type="text" id="mood-input" placeholder="e.g. 'I am feeling sad but want an action movie' or 'cozy retro sci-fi'..." value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={loading} required autoComplete="off" />
          <button type="submit" className="mood-submit-btn" disabled={loading}>
            {loading ? <span className="btn-loader"><i className="fa-solid fa-circle-notch fa-spin" /></span> : <span className="btn-text">Match Mood</span>}
          </button>
        </form>
        {msg && (
          <div id="mood-status-msg" className="mood-status" style={isError ? { color: '#ff5252' } : undefined}>
            <i className={`fa-solid ${isError ? 'fa-triangle-exclamation' : 'fa-wand-magic-sparkles fa-spin'}`} /> {msg}
          </div>
        )}
      </div>
    </div>
  );
}
