import React from 'react';

export const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#10b981' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: '#3b82f6' },
  { id: 'excited', emoji: '🚀', label: 'Excited', color: '#ec4899' },
  { id: 'stressed', emoji: '😤', label: 'Stressed', color: '#f97316' },
  { id: 'sad', emoji: '💙', label: 'Sad', color: '#8b5cf6' },
];

export default function MoodSelector({ selected, onChange }) {
  return (
    <div className="mood-grid">
      {MOODS.map((mood) => (
        <button
          key={mood.id}
          className={`mood-option mood-${mood.id} ${selected === mood.id ? 'selected' : ''}`}
          style={{ '--mood-color': mood.color }}
          onClick={() => onChange(mood.id)}
          type="button"
        >
          <span className="mood-emoji">{mood.emoji}</span>
          <span className="mood-name">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
