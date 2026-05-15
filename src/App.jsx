import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import beers from "./data/beers.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import BeerSelector from "./sections/BeerSelector.jsx";
import Story from "./sections/Story.jsx";
import FeaturedBeers from "./sections/FeaturedBeers.jsx";
import Events from "./sections/Events.jsx";
import Footer from "./sections/Footer.jsx";
import BeerViewer from "./components/BeerViewer.jsx";

/**
 * App — orchestrates the Spiral Brewery cinematic homepage.
 * The active beer drives theme variables that ripple through every section.
 */
function App() {
  const [activeId, setActiveId] = useState(beers[0].id);
  const [viewerId, setViewerId] = useState(null);
  const active = useMemo(
    () => beers.find((b) => b.id === activeId) ?? beers[0],
    [activeId]
  );
  const viewerBeer = useMemo(
    () => (viewerId ? beers.find((b) => b.id === viewerId) ?? null : null),
    [viewerId]
  );

  const openViewer = (id) => {
    setActiveId(id);
    setViewerId(id);
  };
  const closeViewer = () => setViewerId(null);

  const themeVars = {
    "--sb-accent": active.accent,
    "--sb-accent-soft": active.accentSoft,
    "--sb-glow": active.glow,
    "--sb-bg-far": active.bgFar,
    "--sb-bg-near": active.bgNear,
  };

  return (
    <motion.div
      className="sb-app"
      style={themeVars}
      animate={themeVars}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Hero
            beer={active}
            beers={beers}
            activeId={activeId}
            onChange={setActiveId}
          />
        </motion.div>
      </AnimatePresence>

      <Story />
      <FeaturedBeers
        beers={beers}
        onSelect={openViewer}
      />
      <Events />
      <Footer />
      <BeerViewer beer={viewerBeer} onClose={closeViewer} />
    </motion.div>
  );
}

export default App;
