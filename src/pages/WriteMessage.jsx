import React, { useState, useEffect } from 'react';
import MoodSelector, { MOODS } from '../components/MoodSelector.jsx';

const MIN_DATE = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
}

export default function WriteMessage({ navigate, onSave, onUpdate, editingMessage, clearEditing }) {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('happy');
  const [unlockDate, setUnlockDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const isEditing = !!editingMessage;

  useEffect(() => {
    if (editingMessage) {
      setText(editingMessage.text);
      setMood(editingMessage.mood);
      setUnlockDate(new Date(editingMessage.unlockDate).toISOString().split('T')[0]);
    }
  }, [editingMessage]);

  const selectedMood = MOODS.find(m => m.id === mood);
  const canSend = text.trim().length >= 10 && unlockDate;

  const handleSend = () => {
    if (!canSend) return;

    if (isEditing) {
      onUpdate({
        ...editingMessage,
        text: text.trim(),
        mood,
        unlockDate: new Date(unlockDate).toISOString(),
      });
    } else {
      onSave({
        id: generateId(),
        text: text.trim(),
        mood,
        unlockDate: new Date(unlockDate).toISOString(),
        createdAt: new Date().toISOString(),
        isUnlocked: false,
      });
    }

    setShowSuccess(true);
  };

  const handleSuccessDone = () => {
    setShowSuccess(false);
    clearEditing();
    navigate('dashboard');
  };

  const handleCancel = () => {
    clearEditing();
    navigate('dashboard');
  };

  return (
    <>
      <div className="write-page">
        <div className="write-header">
          <h1 className="write-title">{isEditing ? 'Edit Message' : 'Write to Future You'}</h1>
          <p className="write-subtitle">Seal your thoughts in time. Choose when to open them.</p>
        </div>

        <div className="write-card">
          {/* Message textarea */}
          <div className="write-section">
            <label className="write-label">Your Message</label>
            <textarea
              className="write-textarea"
              placeholder="Dear future me... What do you want to remember? What are you hoping for? What advice do you have?"
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={2000}
            />
            <div className="char-count">{text.length} / 2000</div>
          </div>

          {/* Mood */}
          <div className="write-section">
            <label className="write-label">How are you feeling?</label>
            <MoodSelector selected={mood} onChange={setMood} />
          </div>

          {/* Date */}
          <div className="write-section">
            <label className="write-label">Unlock Date</label>
            <input
              type="date"
              className="date-input"
              value={unlockDate}
              min={MIN_DATE}
              onChange={e => setUnlockDate(e.target.value)}
            />
          </div>

          {/* Preview */}
          {(text || unlockDate) && (
            <div className="write-section">
              <label className="write-label">Preview</label>
              <div className="preview-box">
                <div className="preview-label">📬 Letter Preview</div>
                <p className="preview-content">
                  {text || <span style={{ opacity: 0.4 }}>Your message will appear here…</span>}
                </p>
                {(mood || unlockDate) && (
                  <div className="preview-meta">
                    {mood && (
                      <div className="preview-meta-item">
                        <span>{selectedMood?.emoji}</span>
                        <span style={{ textTransform: 'capitalize' }}>{mood}</span>
                      </div>
                    )}
                    {unlockDate && (
                      <div className="preview-meta-item">
                        <span>📅</span>
                        <span>Opens {formatDate(unlockDate)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="write-actions">
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn-send" onClick={handleSend} disabled={!canSend}>
              {isEditing ? '💾 Save Changes' : '🚀 Send to Future'}
            </button>
          </div>
        </div>
      </div>

      {/* Success overlay */}
      {showSuccess && (
        <div className="success-overlay" onClick={handleSuccessDone}>
          <div className="success-card" onClick={e => e.stopPropagation()}>
            <span className="success-icon">🚀</span>
            <h2 className="success-title">
              {isEditing ? 'Message Updated!' : 'Sent to the Future!'}
            </h2>
            <p className="success-desc">
              {isEditing
                ? 'Your message has been updated and resealed.'
                : `Your letter is sealed until ${formatDate(unlockDate)}. Future you is waiting.`
              }
            </p>
            <button className="success-btn" onClick={handleSuccessDone}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
}
