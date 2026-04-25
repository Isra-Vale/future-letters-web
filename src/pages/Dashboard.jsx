import React, { useState } from 'react';
import MessageCard from '../components/MessageCard.jsx';

export default function Dashboard({ messages, navigate, onEdit, onDelete, onUpdate }) {
  const [filter, setFilter] = useState('all');

  const locked = messages.filter(m => !m.isUnlocked);
  const unlocked = messages.filter(m => m.isUnlocked);
  const upcoming = messages.filter(m => {
    const days = Math.ceil((new Date(m.unlockDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days <= 30 && days > 0;
  });

  const filtered = filter === 'all' ? messages
    : filter === 'unlocked' ? unlocked
    : filter === 'locked' ? locked
    : upcoming;

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Your Messages</h1>
        <p className="dashboard-subtitle">Letters sealed across time, waiting to be opened.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">💬</div>
          <div className="stat-info">
            <div className="stat-value">{messages.length}</div>
            <div className="stat-label">Messages Sent</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">🔓</div>
          <div className="stat-info">
            <div className="stat-value">{unlocked.length}</div>
            <div className="stat-label">Unlocked</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pink">📅</div>
          <div className="stat-info">
            <div className="stat-value">{upcoming.length}</div>
            <div className="stat-label">Upcoming (30d)</div>
          </div>
        </div>
      </div>

      {/* Filter + New */}
      <div className="messages-header">
        <div className="messages-title">
          <span>{filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1)} Messages</span>
          <span style={{ marginLeft: 8, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
            ({filtered.length})
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 50, padding: 4 }}>
            {['all', 'unlocked', 'locked'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '6px 16px',
                borderRadius: 50,
                border: 'none',
                background: filter === f ? 'rgba(155,92,246,0.25)' : 'transparent',
                color: filter === f ? 'var(--purple-light)' : 'var(--text-secondary)',
                fontSize: 13,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontWeight: filter === f ? 600 : 400,
              }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <button className="btn-new-message" onClick={() => navigate('write')}>
            + New Message
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="messages-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✉️</div>
            <div className="empty-state-title">No messages yet</div>
            <p className="empty-state-desc">Write your first letter to your future self.</p>
            <button className="btn-new-message" onClick={() => navigate('write')} style={{ margin: '0 auto' }}>
              + Write a Message
            </button>
          </div>
        ) : (
          filtered.map((msg, i) => (
            <MessageCard
              key={msg.id}
              message={msg}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdate={onUpdate}
              delay={i * 60}
            />
          ))
        )}
      </div>
    </div>
  );
}
