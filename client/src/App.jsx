import { useState, useCallback } from 'react';
import PersonaSwitcher from './components/PersonaSwitcher';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import personas from './data/personas';
import './App.css';

// Use env variable for API URL, fallback to relative path (handled by Vite proxy in dev)
const API_URL = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [activeSlug, setActiveSlug] = useState(personas[0].slug);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const activePersona = personas.find((p) => p.slug === activeSlug);

  // ── Switch persona → clear chat ──────────────────────────────────
  const handlePersonaSwitch = useCallback((slug) => {
    if (slug === activeSlug) return;
    setActiveSlug(slug);
    setMessages([]);
  }, [activeSlug]);

  // ── Send message ─────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const userMsg = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history for the API (exclude the new message)
      const history = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: m.text,
      }));

      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: activeSlug,
          message: text,
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      const aiMsg = { role: 'model', text: data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        role: 'model',
        text: `⚠️ ${err.message || 'Failed to get a response. Please try again.'}`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [activeSlug, messages]);

  return (
    <div className="app">
      {/* Decorative background orbs */}
      <div className="bg-orb bg-orb--purple" />
      <div className="bg-orb bg-orb--blue" />
      <div className="bg-orb bg-orb--cyan" />

      <div className="app__container">
        {/* Header */}
        <header className="app__header" id="app-header">
          <div className="app__header-top">
            <h1 className="app__title">Persona AI</h1>
            <div className="app__active-badge" style={{ '--badge-color': activePersona.color }}>
              <span className="app__active-emoji">{activePersona.emoji}</span>
              <span className="app__active-name">{activePersona.name}</span>
            </div>
          </div>
          <PersonaSwitcher
            personas={personas}
            activeSlug={activeSlug}
            onSwitch={handlePersonaSwitch}
          />
        </header>

        {/* Chat area */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          suggestions={activePersona.suggestions}
          onSuggestionSelect={sendMessage}
        />

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
