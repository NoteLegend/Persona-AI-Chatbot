import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestionChips from './SuggestionChips';
import './ChatWindow.css';

export default function ChatWindow({ messages, isLoading, suggestions, onSuggestionSelect }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const showSuggestions = messages.length === 0 && !isLoading;

  return (
    <div className="chat-window" id="chat-window">
      {showSuggestions ? (
        <div className="chat-window__empty">
          <div className="chat-window__welcome">
            <h2 className="chat-window__welcome-title">Start a conversation</h2>
            <p className="chat-window__welcome-sub">
              Select a persona above and ask anything to get started.
            </p>
          </div>
          <SuggestionChips suggestions={suggestions} onSelect={onSuggestionSelect} />
        </div>
      ) : (
        <div className="chat-window__messages">
          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} text={msg.text} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
