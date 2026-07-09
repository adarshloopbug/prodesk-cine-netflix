import React, { useState, useEffect } from 'react';

export default function SettingsModal({
  isOpen,
  onClose,
  tmdbKey,
  geminiKey,
  onSave
}) {
  const [inputTmdb, setInputTmdb] = useState(tmdbKey);
  const [inputGemini, setInputGemini] = useState(geminiKey);

  useEffect(() => {
    if (isOpen) {
      setInputTmdb(tmdbKey);
      setInputGemini(geminiKey);
    }
  }, [isOpen, tmdbKey, geminiKey]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSave(inputTmdb, inputGemini);
  };

  return (
    <div
      className="modal-overlay"
      id="settings-modal"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content settings-modal-box">
        <div className="modal-header">
          <h3><i className="fa-solid fa-gears"></i> API Settings</h3>
          <button className="close-btn" id="close-settings-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body">
            {[
              { label: 'Enter TMDB Key', id: 'settings-tmdb-key', val: inputTmdb, setVal: setInputTmdb },
              { label: 'Enter Google Gemini Key', id: 'settings-gemini-key', val: inputGemini, setVal: setInputGemini }
            ].map(({ label, id, val, setVal }) => (
              <div key={id} className="input-group">
                <label htmlFor={id}>{label}</label>
                <input
                  type="password"
                  id={id}
                  placeholder={`${label}...`}
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" className="secondary-btn" id="cancel-settings-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn" id="save-settings-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
