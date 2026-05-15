import { motion } from "framer-motion";

/**
 * SpiralCan — stylized SVG beer can placeholder.
 * Re-themes via `accent`, `base`, `band`, and `label` props.
 * No external assets required.
 */
export default function SpiralCan({
  accent = "#c8843c",
  base = "#1a120a",
  band = "#c8843c",
  label = "SPIRAL",
  subLabel = "BREWERY",
  width = 360,
  spin = true,
  className = "",
  style = {},
}) {
  return (
    <motion.svg
      viewBox="0 0 220 480"
      width={width}
      className={`sb-can ${className}`}
      style={{ "--sb-glow": `${accent}88`, ...style }}
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={spin ? { rotate: -3, y: -6 } : {}}
      aria-label={`${label} beer can`}
    >
      <defs>
        <linearGradient id={`body-${label}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.85" />
          <stop offset="18%" stopColor={base} />
          <stop offset="48%" stopColor={base} />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="62%" stopColor={base} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`top-${label}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#9a9a9a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id={`band-${label}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.6" />
          <stop offset="50%" stopColor={band} />
          <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={`gloss-${label}`} cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* top rim */}
      <ellipse cx="110" cy="22" rx="78" ry="10" fill={`url(#top-${label})`} />
      <ellipse cx="110" cy="20" rx="74" ry="6" fill="#0a0a0a" />
      <ellipse cx="110" cy="20" rx="74" ry="6" fill="none" stroke="#3a3a3a" strokeWidth="0.6" />

      {/* body */}
      <rect x="32" y="20" width="156" height="430" rx="6" fill={`url(#body-${label})`} />

      {/* top color band */}
      <rect x="32" y="40" width="156" height="38" fill={`url(#band-${label})`} opacity="0.9" />
      <rect x="32" y="40" width="156" height="2" fill={accent} opacity="0.8" />
      <rect x="32" y="76" width="156" height="2" fill="#000" opacity="0.6" />

      {/* main label panel */}
      <rect x="38" y="110" width="144" height="260" fill="#000" opacity="0.32" />
      <rect x="38" y="110" width="144" height="260" fill="none" stroke={accent} strokeOpacity="0.45" strokeWidth="0.8" />

      {/* spiral mark */}
      <g transform="translate(110 160)" opacity="0.95">
        <circle r="22" fill="none" stroke={accent} strokeWidth="1.4" />
        <path
          d="M -16 0 a 16 16 0 1 1 12 14 a 10 10 0 1 1 -6 -10 a 5 5 0 1 1 3 5"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>

      {/* label text */}
      <text
        x="110"
        y="232"
        textAnchor="middle"
        fontFamily="Anton, Bebas Neue, sans-serif"
        fontSize="30"
        fill="#f4ede0"
        letterSpacing="2"
      >
        {label}
      </text>
      <text
        x="110"
        y="256"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="9"
        fill={accent}
        letterSpacing="4"
      >
        {subLabel}
      </text>

      {/* divider */}
      <line x1="60" y1="278" x2="160" y2="278" stroke={accent} strokeOpacity="0.5" />

      <text
        x="110"
        y="298"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="7"
        fill="#b6ae9e"
        letterSpacing="3"
      >
        SMALL BATCH · EST. 2017
      </text>

      {/* barcode-ish */}
      <g transform="translate(70 330)">
        {Array.from({ length: 28 }).map((_, i) => (
          <rect
            key={i}
            x={i * 3}
            y="0"
            width={i % 4 === 0 ? 2 : 1}
            height="22"
            fill="#f4ede0"
            opacity="0.85"
          />
        ))}
      </g>

      {/* bottom band */}
      <rect x="32" y="400" width="156" height="32" fill="#000" opacity="0.5" />
      <text
        x="110"
        y="421"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="8"
        fill="#b6ae9e"
        letterSpacing="3"
      >
        12 FL OZ · 355 ML
      </text>

      {/* bottom rim */}
      <ellipse cx="110" cy="450" rx="78" ry="8" fill="#0a0a0a" />
      <ellipse cx="110" cy="450" rx="78" ry="8" fill="none" stroke="#222" />

      {/* gloss */}
      <rect x="32" y="20" width="156" height="430" rx="6" fill={`url(#gloss-${label})`} />
      <rect x="46" y="28" width="6" height="416" fill="#fff" opacity="0.08" />
      <rect x="168" y="28" width="3" height="416" fill="#000" opacity="0.5" />
    </motion.svg>
  );
}
