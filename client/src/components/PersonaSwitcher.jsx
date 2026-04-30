import './PersonaSwitcher.css';

export default function PersonaSwitcher({ personas, activeSlug, onSwitch }) {
  return (
    <div className="persona-switcher" id="persona-switcher">
      <div className="persona-switcher__label">Choose a Persona</div>
      <div className="persona-switcher__tabs">
        {personas.map((p) => (
          <button
            key={p.slug}
            id={`persona-tab-${p.slug}`}
            className={`persona-tab ${activeSlug === p.slug ? 'persona-tab--active' : ''}`}
            onClick={() => onSwitch(p.slug)}
            style={{
              '--tab-color': p.color,
            }}
          >
            <span className="persona-tab__emoji">{p.emoji}</span>
            <div className="persona-tab__info">
              <span className="persona-tab__name">{p.name}</span>
              <span className="persona-tab__subtitle">{p.subtitle}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
