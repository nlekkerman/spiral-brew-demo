import { motion } from "framer-motion";

/**
 * BeerImage — themable presentation of a real product photo.
 * Adds a soft accent halo + drop shadow so the can feels lit by its world.
 */
export default function BeerImage({
  src,
  alt,
  accent = "#c8843c",
  glow,
  width = 360,
  hover = true,
  className = "",
  style = {},
}) {
  const haloGlow = glow || `${accent}88`;
  return (
    <motion.div
      className={`sb-beerimg ${className} d-flex justify-content-center align-items-center`}
      style={{ width, "--sb-accent": accent, "--sb-glow": haloGlow, ...style }}
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={hover ? { rotate: -2, y: -6 } : {}}
    >
      <div className="sb-beerimg__halo" />
      <img className="sb-beerimg__img" src={src} alt={alt} draggable="false" />
      <div className="sb-beerimg__shadow" />
    </motion.div>
  );
}
