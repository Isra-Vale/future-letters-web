import React from 'react';

export default function Landing({ navigate }) {
  return (
    <div className="landing">
      {/* Background */}
      <div className="landing-bg">
        <div className="landing-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Nav */}
      <div className="landing-nav">
        <div className="landing-logo">Future Letters</div>
        <div className="landing-nav-links">
          <button className="landing-nav-link" onClick={() => navigate('dashboard')}>Dashboard</button>
          <button className="landing-nav-link" onClick={() => navigate('timeline')}>Timeline</button>
          <button className="landing-nav-link primary" onClick={() => navigate('write')}>
            Start Writing →
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="landing-hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Time-locked letters to yourself
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line1">Write to the person</span>
          <span className="hero-title-line2">you're becoming.</span>
        </h1>

        <p className="hero-subtitle">
          Seal your thoughts, hopes, and dreams in a letter to your future self.
          Choose when to open it. Discover who you've grown into.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('write')}>
            <span>Write Your First Message →</span>
          </button>
          <button className="btn-secondary" onClick={() => navigate('dashboard')}>
            View Messages
          </button>
        </div>

        {/* Preview cards */}
        <div className="hero-preview">
          <div className="hero-preview-cards">
            <div className="preview-card purple">
              <div className="preview-card-icon">💬</div>
              <div className="preview-card-label">Messages Sent</div>
              <div className="preview-card-value">4</div>
            </div>
            <div className="preview-card blue">
              <div className="preview-card-icon">🔓</div>
              <div className="preview-card-label">Unlocked</div>
              <div className="preview-card-value">1</div>
            </div>
            <div className="preview-card pink">
              <div className="preview-card-icon">📅</div>
              <div className="preview-card-label">Upcoming</div>
              <div className="preview-card-value">3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="landing-features">
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <div className="feature-title">Time-Locked Letters</div>
          <p className="feature-desc">
            Write a message today and choose when your future self can open it. Days, months, or years — you decide.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎭</div>
          <div className="feature-title">Mood Capture</div>
          <p className="feature-desc">
            Tag each message with how you're feeling right now. Watch the emotional arc of your journey over time.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔮</div>
          <div className="feature-title">Future Replies</div>
          <p className="feature-desc">
            Receive a reply from your future self when you unlock a message. A gift of perspective across time.
          </p>
        </div>
      </div>
    </div>
  );
}
