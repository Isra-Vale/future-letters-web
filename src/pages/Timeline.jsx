import React from 'react';
import TimelineItem from '../components/TimelineItem.jsx';

export default function Timeline({ messages, navigate }) {
  const sorted = [...messages].sort(
    (a, b) => new Date(a.unlockDate) - new Date(b.unlockDate)
  );

  const past = sorted.filter(m => m.isUnlocked);
  const future = sorted.filter(m => !m.isUnlocked);

  return (
    <div className="timeline-page">
      <div className="timeline-header">
        <h1 className="timeline-title">Your Timeline</h1>
        <p className="timeline-subtitle">A journey through past reflections and future hopes.</p>
      </div>

      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌌</div>
          <div className="empty-state-title">Your timeline is empty</div>
          <p className="empty-state-desc">Start writing messages to build your personal history.</p>
          <button className="btn-new-message" onClick={() => navigate('write')} style={{ margin: '0 auto' }}>
            + Write First Message
          </button>
        </div>
      ) : (
        <div className="timeline-container">
          <div className="timeline-line" />

          {past.length > 0 && (
            <>
              <div className="timeline-section-label">✅ Opened Messages</div>
              {past.map((msg, i) => (
                <TimelineItem key={msg.id} message={msg} index={i} />
              ))}
            </>
          )}

          {future.length > 0 && (
            <>
              <div className="timeline-section-label">🔒 Sealed Letters</div>
              {future.map((msg, i) => (
                <TimelineItem key={msg.id} message={msg} index={past.length + i} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
