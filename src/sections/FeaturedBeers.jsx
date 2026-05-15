import { motion } from "framer-motion";
import BeerImage from "../components/BeerImage.jsx";
import beersBg from "../assets/beers-bcg.png";

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};

export default function FeaturedBeers({ beers, onSelect }) {
  return (
    <section id="beers" className="sb-featured">
      <div
        className="sb-featured__bg"
        style={{ backgroundImage: `url(${beersBg})` }}
        aria-hidden="true"
      />
      <div className="sb-featured__overlay" aria-hidden="true" />
      <div className="container-xxl">
        <motion.div
          className="sb-featured__head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <div>
            <motion.div className="sb-eyebrow mb-3" variants={fadeUp}>
              The Lineup — {String(beers.length).padStart(3, "0")} / {String(beers.length).padStart(3, "0")}
            </motion.div>
            <motion.h2 className="sb-featured__title" variants={fadeUp}>
              Collect the <br />
              <span className="sb-accent-text">spiral.</span>
            </motion.h2>
          </div>
          <motion.p className="sb-ink-dim sb-serif" variants={fadeUp} style={{ maxWidth: "34ch", fontSize: "1.05rem" }}>
            Five cans. Five worlds. Each one engineered to taste the way a memory
            sounds. Tap a can to load its universe upstairs.
          </motion.p>
        </motion.div>

        <div className="row g-4">
          {beers.map((b, i) => (
            <motion.div
              className="col-12 col-sm-6 col-lg-4"
              key={b.id}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <button
                type="button"
                className="sb-card w-100 text-start"
                onClick={() => onSelect?.(b.id)}
                style={{
                  "--accent": b.accent,
                  "--accent-glow": b.glow,
                }}
              >
                <div className="sb-card__id">
                  <span>NO. {String(i + 1).padStart(3, "0")}</span>
                  <span>{b.poster}</span>
                </div>
                <div className="sb-card__can">
                  <BeerImage
                    src={b.image}
                    alt={`${b.name} — ${b.style}`}
                    accent={b.accent}
                    glow={b.glow}
                    width={150}
                    hover={false}
                  />
                </div>
                <div className="sb-card__name">{b.name}</div>
                <div className="sb-card__style">{b.style}</div>
                <div className="sb-card__footer">
                  <span>{b.mood}</span>
                  <span className="sb-card__abv">{b.abv}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
