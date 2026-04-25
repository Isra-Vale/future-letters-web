import React from 'react';

export default function Navbar({ currentPage, navigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('landing')}>
        Future Me
      </div>

      <div className="navbar-tabs">
        {['dashboard', 'write', 'timeline'].map((p) => (
          <button
            key={p}
            className={`navbar-tab ${currentPage === p ? 'active' : ''}`}
            onClick={() => navigate(p)}
          >
            {p === 'write' ? 'Write' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <button className="navbar-cta" onClick={() => navigate('write')}>
        + New Message
      </button>
    </nav>
  );
}
