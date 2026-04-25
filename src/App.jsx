import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import WriteMessage from './pages/WriteMessage.jsx';
import Timeline from './pages/Timeline.jsx';

const SAMPLE_MESSAGES = [
  {
    id: '1',
    text: "Hey future me, I hope you remember how hard things felt right now — the uncertainty, the late nights, the self-doubt. I want you to know that the person writing this believed in you even when it was hard to believe in yourself. Did you make it? I think you did.",
    mood: 'happy',
    unlockDate: new Date(Date.now() + 41 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    isUnlocked: false,
  },
  {
    id: '2',
    text: "Remember when you were struggling with the big decision? I hope by now you've found your peace with it. The calm after the storm is worth it. Don't rush the journey.",
    mood: 'calm',
    unlockDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    isUnlocked: true,
  },
  {
    id: '3',
    text: "I'm writing this at the most stressed I've ever been. Job applications, family pressure, financial worries. I'm exhausted. Future me — please tell me it got better. Please.",
    mood: 'stressed',
    unlockDate: new Date(Date.now() + 77 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isUnlocked: false,
  },
  {
    id: '4',
    text: "Writing this on a good day. Feeling genuinely happy and I want to bottle this feeling for you. Go outside. Call someone you love. Smile at a stranger. The small things matter.",
    mood: 'happy',
    unlockDate: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isUnlocked: false,
  },
];

export default function App() {
  const [page, setPage] = useState('landing');
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('futureMe_messages');
      return stored ? JSON.parse(stored) : SAMPLE_MESSAGES;
    } catch {
      return SAMPLE_MESSAGES;
    }
  });
  const [editingMessage, setEditingMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('futureMe_messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (msg) => {
    setMessages(prev => [msg, ...prev]);
  };

  const updateMessage = (updated) => {
    setMessages(prev => prev.map(m => m.id === updated.id ? updated : m));
  };

  const deleteMessage = (id) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {page !== 'landing' && (
        <Navbar currentPage={page} navigate={navigate} />
      )}
      <div className={`page-wrapper ${page !== 'landing' ? 'with-nav' : ''}`}>
        {page === 'landing' && <Landing navigate={navigate} />}
        {page === 'dashboard' && (
          <Dashboard
            messages={messages}
            navigate={navigate}
            onEdit={(msg) => { setEditingMessage(msg); navigate('write'); }}
            onDelete={deleteMessage}
            onUpdate={updateMessage}
          />
        )}
        {page === 'write' && (
          <WriteMessage
            navigate={navigate}
            onSave={addMessage}
            onUpdate={updateMessage}
            editingMessage={editingMessage}
            clearEditing={() => setEditingMessage(null)}
          />
        )}
        {page === 'timeline' && (
          <Timeline messages={messages} navigate={navigate} />
        )}
      </div>
    </div>
  );
}
