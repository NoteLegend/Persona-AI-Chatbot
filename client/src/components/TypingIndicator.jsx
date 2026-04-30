import './TypingIndicator.css';

export default function TypingIndicator() {
  return (
    <div className="message-row message-row--ai">
      <div className="typing-indicator" id="typing-indicator">
        <span className="typing-indicator__dot"></span>
        <span className="typing-indicator__dot"></span>
        <span className="typing-indicator__dot"></span>
      </div>
    </div>
  );
}
