import { motion } from "framer-motion";
import storyBg from "../assets/story-bck.png";

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] } },
};

const facts = [
  {
    num: "01",
    title: "Named after the Spiral Bridge",
    body: "An iconic piece of Hastings history that gave the brewery its name.",
  },
  {
    num: "02",
    title: "Brewing roots since the late 1800s",
    body: "Hastings had a thriving brewing scene long before Prohibition.",
  },
  {
    num: "03",
    title: "Community taproom in Hastings",
    body: "A gathering place built for live events, local pride, and great beer.",
  },
];

export default function Story() {
  return (
    <section id="story" className="sb-story">
      <div
        className="sb-story__bg"
        style={{ backgroundImage: `url(${storyBg})` }}
        aria-hidden="true"
      />
      <div className="sb-story__overlay" aria-hidden="true" />
      <div className="container-xxl">
        <motion.div
          className="sb-story__inner"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div className="sb-eyebrow sb-story__eyebrow" variants={fadeUp}>
            Chapter 01 — The Story
          </motion.div>

          <motion.h2 className="sb-story__title" variants={fadeUp}>
            Hastings had beer <br />
            before Prohibition. <br />
            <span className="accent">Spiral brought it back.</span>
          </motion.h2>

          <motion.div className="sb-story__est" variants={fadeUp}>
            <span className="sb-story__est-line" />
            <span className="sb-story__est-text">
              EST. 1895 · BREWING HERITAGE · HASTINGS, MN
            </span>
            <span className="sb-story__est-line" />
          </motion.div>

          <motion.p className="sb-story__body" variants={fadeUp}>
            Named after the historic <strong>Spiral Bridge</strong>, Spiral
            Brewery was built around a simple idea: bring local brewing back to
            Hastings and make the taproom a place for the community again.
          </motion.p>

          <motion.p className="sb-story__body" variants={fadeUp}>
            The city once had a strong brewing culture in the late 1800s,
            before Prohibition wiped out local breweries across the country.
            Spiral Brewery opened a new chapter — quality beer, local history,
            live events, and a taproom built for gathering.
          </motion.p>

          <motion.div className="sb-story__facts" variants={fadeUp}>
            {facts.map((f) => (
              <div className="sb-story__fact" key={f.num}>
                <div className="sb-story__fact-num">{f.num}</div>
                <div className="sb-story__fact-body">
                  <div className="sb-story__fact-title">{f.title}</div>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div className="sb-story__closing" variants={fadeUp}>
            Born in Hastings.
            <br />
            Named for the bridge.
            <br />
            <span className="accent">Brewed for the people.</span>
          </motion.div>

          <motion.div variants={fadeUp} className="sb-story__cta">
            <button className="sb-btn sb-btn--ghost" type="button">
              Read Our Story
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
