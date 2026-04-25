import React, { useState } from 'react';
import { MOODS } from './MoodSelector.jsx';

function getDaysUntil(dateStr) {
  const now = new Date();
  const unlock = new Date(dateStr);
  const diff = Math.ceil((unlock - now) / (1000 * 60 * 60 * 24));
  return diff;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
}

export default function MessageCard({ message, onEdit, onDelete, onUpdate, delay = 0 }) {
  const [unlocking, setUnlocking] = useState(false);
  const mood = MOODS.find(m => m.id === message.mood) || MOODS[0];
  const daysUntil = getDaysUntil(message.unlockDate);
  const isUnlockable = daysUntil <= 0 && !message.isUnlocked;

  const handleUnlock = (e) => {
    e.stopPropagation();
    if (!isUnlockable) return;
    setUnlocking(true);
    setTimeout(() => {
      onUpdate({ ...message, isUnlocked: true });
      setUnlocking(false);
    }, 800);
  };

  return (
    <div
      className={`message-card ${message.isUnlocked ? 'unlocked' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`message-card-top-bar bar-${message.mood}`} />

      <div className="message-card-body">
        <div className="message-card-header">
          <div className="message-mood">
            <div className={`mood-avatar avatar-${message.mood}`}>
              {mood.emoji}
            </div>
            <span className="mood-label">{mood.label}</span>
          </div>

          {!message.isUnlocked && daysUntil > 0 && (
            <div className="message-countdown">
              <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
              </svg>
              {daysUntil}d
            </div>
          )}

          {message.isUnlocked && (
            <div className="message-countdown" style={{ borderColor: 'rgba(16,185,129,0.3)', color: '#10b981' }}>
              ✓ Unlocked
            </div>
          )}

          {isUnlockable && (
            <div className="message-countdown" style={{ borderColor: 'rgba(155,92,246,0.4)', color: '#b97aff' }}>
              ✨ Ready!
            </div>
          )}
        </div>

        <div className="message-content">
          {message.isUnlocked ? (
            <p className="message-text">{message.text}</p>
          ) : (
            <>
              <p className="message-text blurred">{message.text}</p>
              <div className="lock-overlay" onClick={isUnlockable ? handleUnlock : undefined}
                style={{ cursor: isUnlockable ? 'pointer' : 'default' }}>
                <span className="lock-icon">{unlocking ? '🔓' : isUnlockable ? '🔓' : '🔒'}</span>
                {isUnlockable
                  ? <span style={{ color: '#b97aff', fontWeight: 600 }}>Tap to unlock</span>
                  : <span>Unlocks {formatDate(message.unlockDate)}</span>
                }
              </div>
            </>
          )}
        </div>

        <div className="message-footer">
          <div className="message-date">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            {formatDate(message.unlockDate)}
          </div>

          <div className="message-actions">
            <button className="action-btn" title="Edit" onClick={(e) => { e.stopPropagation(); onEdit(message); }}>
              ✏️
            </button>
            <button className="action-btn delete" title="Delete" onClick={(e) => { e.stopPropagation(); onDelete(message.id); }}>
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
