import './SuggestionChips.css';

export default function SuggestionChips({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="suggestion-chips" id="suggestion-chips">
      <p className="suggestion-chips__label">Try asking:</p>
      <div className="suggestion-chips__list">
        {suggestions.map((text, i) => (
          <button
            key={i}
            className="suggestion-chip"
            id={`suggestion-chip-${i}`}
            onClick={() => onSelect(text)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
