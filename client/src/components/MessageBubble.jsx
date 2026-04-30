import './MessageBubble.css';

export default function MessageBubble({ role, text }) {
  const isUser = role === 'user';

  return (
    <div className={`message-row ${isUser ? 'message-row--user' : 'message-row--ai'}`}>
      <div className={`message-bubble ${isUser ? 'message-bubble--user' : 'message-bubble--ai'}`}>
        {!isUser && <span className="message-bubble__label">AI</span>}
        <p className="message-bubble__text">{text}</p>
      </div>
    </div>
  );
}
