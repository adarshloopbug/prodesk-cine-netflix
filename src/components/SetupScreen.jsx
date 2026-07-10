import React from 'react';
export default function SetupScreen({ onSettingsClick }) {
  return (
    <section id="setup-screen" className="setup-container">
      <div className="setup-card">
        <div className="setup-logo"><i className="fa-solid fa-clapperboard" /></div>
        <h2>Unlock Netflix-Lite</h2>
        <p>This Single Page Application uses live metadata from <strong>The Movie Database (TMDB)</strong> and personalized AI recommendations from <strong>Google Gemini</strong>.</p>
        <p className="setup-hint">To begin browsing and searching, please enter your free API keys in the settings.</p>
        <button className="primary-btn" id="setup-keys-btn" onClick={onSettingsClick}><i className="fa-solid fa-key" /> Set Up API Keys</button>
      </div>
    </section>
  );
}
