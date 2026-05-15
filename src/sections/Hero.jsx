import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import BeerImage from "../components/BeerImage.jsx";
import Fog from "../components/Fog.jsx";
import Particles from "../components/Particles.jsx";
import spiralHeroBg from "../assets/spiral-hero.png";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const rise = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function Hero({ beer, beers, activeId, onChange }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 14 });
  const sy = useSpring(my, { stiffness: 60, damping: 14 });

  const canX = useTransform(sx, [-1, 1], [-22, 22]);
  const canY = useTransform(sy, [-1, 1], [-12, 12]);
  const canRot = useTransform(sx, [-1, 1], [-3, 3]);
  const glowX = useTransform(sx, [-1, 1], [-40, 40]);
  const glowY = useTransform(sy, [-1, 1], [-30, 30]);

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={ref}
      className="sb-hero"
      key={beer.id}
    >
      <div className="sb-hero__bg-layers">
        <motion.div
          className="sb-hero__bgimg"
          style={{ backgroundImage: `url(${spiralHeroBg})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        />
        <motion.div
          className="sb-hero__glow"
          style={{ x: glowX, y: glowY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        />
        <div className="sb-hero__grid" />
        <Fog />
        <Particles count={32} />
      </div>

      <div className="sb-hero__poster" aria-hidden="true">{beer.poster}</div>
      <div className="sb-hero__vignette" />

      <div className="sb-hero__content">
        <div className="sb-hero__layout">

          <motion.div
            className="sb-hero__copy"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={rise} className="sb-eyebrow sb-hero__eyebrow">
              <span style={{ color: beer.accent, marginRight: 12 }}>&#9679;</span>
              CRAFTED IN THE DELTA &middot; {beer.mood}
            </motion.div>

            <motion.h1 variants={rise} className="sb-hero__title">
              <span className="stroke">Drink</span>
              <span>The</span>
              <span className="accent">Spiral</span>
            </motion.h1>

            <motion.p variants={rise} className="sb-hero__tagline">
              &ldquo;{beer.tagline}&rdquo;
            </motion.p>
          </motion.div>

          <div className="sb-hero__product-zone">
            <motion.div
              className="sb-hero__stage"
              style={{ x: canX, y: canY, rotate: canRot }}
            >
              <BeerImage
                src={beer.image}
                alt={`${beer.name} \u2014 ${beer.style}`}
                accent={beer.accent}
                glow={beer.glow}
              />
            </motion.div>

            {/* Beer selector ribbon */}
            <div className="sb-hero__ribbon" role="group" aria-label="Select beer">
              {beers.map((b) => {
                const isActive = b.id === activeId;
                return (
                  <button
                    key={b.id}
                    className={`sb-ribbon__item ${isActive ? "is-active" : ""}`}
                    onClick={() => onChange(b.id)}
                    aria-label={`Select ${b.name}`}
                    aria-pressed={isActive}
                    type="button"
                    style={{ "--sb-ribbon-accent": b.accent, "--sb-ribbon-glow": b.glow }}
                  >
                    <img
                      className="sb-ribbon__can"
                      src={b.image}
                      alt=""
                      draggable="false"
                    />
                    <span className="sb-ribbon__label">{b.name}</span>
                  </button>
                );
              })}
            </div>

            <motion.div
              className="sb-hero__product-panel"
              style={{ "--sb-panel-accent": beer.accent, "--sb-panel-glow": beer.glow }}
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={rise} className="sb-hero__panel-meta">
                <div className="sb-hero__panel-pouring">
                  <span className="sb-hero__panel-label">Now Pouring</span>
                  <strong className="sb-hero__panel-name">{beer.name}</strong>
                </div>
                <div className="sb-hero__panel-attrs">
                  <div>
                    <span className="sb-hero__panel-label">Style</span>
                    <strong>{beer.style}</strong>
                  </div>
                  <div>
                    <span className="sb-hero__panel-label">ABV</span>
                    <strong>{beer.abv}</strong>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={rise} className="sb-hero__ctas">
                <button
                  className="sb-btn"
                  type="button"
                  style={{ background: beer.accent }}
                >
                  Explore the Lineup
                </button>
                <button className="sb-btn sb-btn--ghost" type="button">
                  Find the Taproom
                </button>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      <div className="sb-hero__scroll">Scroll &middot; Issue 0{beerIndex(beer.id)}</div>
    </section>
  );
}

function beerIndex(id) {
  const order = [
    "the-bottoms",
    "buckhorn-brown",
    "double-downward-spiral",
    "downward-spiral",
    "hard-left",
    "townie",
  ];
  const i = order.indexOf(id);
  return (i < 0 ? 1 : i + 1).toString().padStart(2, "0");
}