import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import brandMark from "../assets/lgo-spiral.png";

const NAV_LINKS = [
  { id: "beers", label: "Beers" },
  { id: "story", label: "Story" },
  { id: "events", label: "Events" },
  { id: "taproom", label: "Taproom" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
      setOpen(false);
    }
  };

  return (
    <motion.nav
      className="sb-nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="sb-nav__brand">
        <img
          src={brandMark}
          alt="Spiral Brewery"
          className="sb-nav__brand-mark"
          draggable="false"
        />
        <span>SPIRAL&nbsp;BREWERY</span>
      </div>
      <div className={`sb-nav__links ${open ? "is-open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => handleClick(e, l.id)}
            className={active === l.id ? "is-active" : ""}
            aria-current={active === l.id ? "page" : undefined}
          >
            {l.label}
          </a>
        ))}
      </div>
      <button className="sb-nav__cta" type="button">
        Visit Us
      </button>
      <button
        type="button"
        className={`sb-nav__toggle ${open ? "is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </motion.nav>
  );
}
