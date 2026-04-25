import React, { useState } from 'react';
import { MOODS } from './MoodSelector.jsx';

const FUTURE_REPLIES = [
  "You made it. The thing you were so scared of? You handled it with grace you didn't know you had.",
  "Look at how far you've come. That person writing to you? They'd be so proud of who you are today.",
  "The storm passed. And you — you grew roots in it.",
  "You were right to believe in yourself. Even on the days you didn't.",
  "The answer to your question: yes. A thousand times yes.",
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

function getDaysUntil(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function TimelineItem({ message, index }) {
  const [reply, setReply] = useState(null);
  const [generating, setGenerating] = useState(false);

  const mood = MOODS.find(m => m.id === message.mood) || MOODS[0];
  const daysUntil = getDaysUntil(message.unlockDate);
  const isPast = message.isUnlocked;

  const generateReply = () => {
    setGenerating(true);
    setTimeout(() => {
      setReply(FUTURE_REPLIES[index % FUTURE_REPLIES.length]);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="timeline-item" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="timeline-dot-wrap">
        <div className={`timeline-dot dot-${message.mood}`}>
          {mood.emoji}
        </div>
      </div>

      <div className="timeline-card">
        <div className={`message-card-top-bar bar-${message.mood}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', borderRadius: 0 }} />

        <div className="timeline-card-header">
          <span className="timeline-card-mood">{mood.label} · {message.isUnlocked ? 'Unlocked' : `${daysUntil}d away`}</span>
          <span className="timeline-card-date">
            {isPast ? `Sent ${formatDate(message.createdAt)}` : `Opens ${formatDate(message.unlockDate)}`}
          </span>
        </div>

        {message.isUnlocked ? (
          <>
            <p className="timeline-card-text">{message.text}</p>

            {!reply && (
              <button className="btn-generate-reply" onClick={generateReply} disabled={generating}>
                {generating ? '✨ Generating...' : '✨ Get Future Reply'}
              </button>
            )}

            {reply && (
              <div className="future-reply">
                <div className="future-reply-label">
                  <span>🔮</span> Future You Replies
                </div>
                <p className="future-reply-text">"{reply}"</p>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="timeline-card-text blurred">{message.text}</p>
            <div className="timeline-locked-badge">
              🔒 Opens {formatDate(message.unlockDate)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
