import { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Particles — slowly floating embers / dust motes.
 * Deterministic random per-mount via useMemo.
 */
export default function Particles({ count = 28 }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 6,
        duration: 9 + Math.random() * 10,
        drift: -40 + Math.random() * 80,
      })),
    [count]
  );

  return (
    <div className="sb-particles" aria-hidden="true">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="sb-particle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{
            y: [0, -120, 0],
            x: [0, d.drift, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
