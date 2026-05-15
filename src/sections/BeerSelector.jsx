import { motion } from "framer-motion";

export default function BeerSelector({ beers, activeId, onChange }) {
  return (
    <motion.aside
      className="sb-selector"
      aria-label="Beer selector"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {beers.map((b) => {
        const active = b.id === activeId;
        return (
          <button
            key={b.id}
            className={`sb-selector__item ${active ? "is-active" : ""}`}
            onClick={() => onChange(b.id)}
            aria-label={`Select ${b.name}`}
            aria-pressed={active}
            type="button"
          >
            <span
              className="sb-selector__dot"
              style={{ background: b.accent, color: b.accent }}
            />
            <span className="sb-selector__label">{b.name}</span>
          </button>
        );
      })}
    </motion.aside>
  );
}
