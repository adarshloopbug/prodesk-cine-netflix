import React, { useState } from 'react';
import { fetchAiRecommendation } from '../utils/api';

export default function MoodMatcher({ geminiApiKey, onAiRecommendation }) {
  const [moodPrompt, setMoodPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);

  if (!geminiApiKey) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = moodPrompt.trim();
    if (!prompt || isAiLoading) return;
    setIsAiLoading(true);
    setIsError(false);
    setStatusMsg('Consulting Gemini AI...');
    try {
      const title = await fetchAiRecommendation(prompt, geminiApiKey);
      setStatusMsg(`AI suggested: ${title}. Searching...`);
      onAiRecommendation(title);
      setTimeout(() => setStatusMsg(''), 2000);
      setMoodPrompt('');
    } catch {
      setIsError(true);
      setStatusMsg('AI suggestion failed. Check your Gemini API Key.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="mood-matcher-banner" id="mood-matcher-section">
      <div className="mood-content">
        <div className="mood-badge"><i className="fa-solid fa-wand-magic-sparkles" /> AI Recommendation</div>
        <h3>What are you in the mood for?</h3>
        <p>Describe your vibe or feelings, and our Gemini AI will pick the perfect film suggestion.</p>
        <form className="mood-form" id="mood-matcher-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="mood-input"
            placeholder="e.g. 'I am feeling sad but want an action movie' or 'cozy retro sci-fi'..."
            value={moodPrompt}
            onChange={(e) => setMoodPrompt(e.target.value)}
            disabled={isAiLoading}
            required
            autoComplete="off"
          />
          <button type="submit" className="mood-submit-btn" disabled={isAiLoading}>
            {isAiLoading ? (
              <span className="btn-loader"><i className="fa-solid fa-circle-notch fa-spin" /></span>
            ) : (
              <span className="btn-text">Match Mood</span>
            )}
          </button>
        </form>
        {statusMsg && (
          <div id="mood-status-msg" className="mood-status" style={isError ? { color: '#ff5252' } : undefined}>
            <i className={`fa-solid ${isError ? 'fa-triangle-exclamation' : 'fa-wand-magic-sparkles fa-spin'}`} /> {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}
