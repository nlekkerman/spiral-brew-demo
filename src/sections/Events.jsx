import { motion } from "framer-motion";
import eventsBg from "../assets/events-bck.png";

const events = [
  {
    id: "e1",
    day: "14",
    month: "MAY",
    weekday: "FRI",
    title: "Slow Train Sessions",
    sub: "Live Vinyl · Delta Soul",
    time: "21:00 — LATE",
    room: "Boiler Room",
    color: "#F5B642",
    glow: "rgba(245,182,66,0.35)",
    tag: "LIVE TONIGHT",
  },
  {
    id: "e2",
    day: "18",
    month: "MAY",
    weekday: "TUE",
    title: "Cellar Tour: The Bottoms",
    sub: "Tasting Flight · 5 Pours",
    time: "19:30",
    room: "Cellar 02",
    color: "#C8843C",
    glow: "rgba(200,132,60,0.35)",
    tag: "LIMITED · 24",
  },
  {
    id: "e3",
    day: "22",
    month: "MAY",
    weekday: "SAT",
    title: "Hard Left × Motor Club",
    sub: "Vintage Cars · DJs · Smoke",
    time: "16:00 — 23:00",
    room: "Loading Dock",
    color: "#FF6A1A",
    glow: "rgba(255,106,26,0.4)",
    tag: "BLOCK PARTY",
  },
  {
    id: "e4",
    day: "29",
    month: "MAY",
    weekday: "SAT",
    title: "Neon Spiral Late Night",
    sub: "Synthwave · DJ Halo Carrier",
    time: "22:00 — 02:00",
    room: "Mezzanine",
    color: "#FF2E8A",
    glow: "rgba(255,46,138,0.4)",
    tag: "21+ ONLY",
  },
];

export default function Events() {
  return (
    <section id="events" className="sb-events">
      <div
        className="sb-events__bg"
        style={{ backgroundImage: `url(${eventsBg})` }}
        aria-hidden="true"
      />
      <div className="sb-events__overlay" aria-hidden="true" />
      <div className="container-xxl">
        <motion.div
          className="sb-events__head"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div>
            <div className="sb-eyebrow mb-3">
              <span style={{ color: "#F5B642" }}>●</span>&nbsp;&nbsp;LIVE FROM THE TAPROOM
            </div>
            <h2 className="sb-headline-lg m-0">
              Tonight at <span className="sb-accent-text">Spiral.</span>
            </h2>
          </div>
          <div className="sb-mono sb-ink-dim">
            Programme · May 26 · Updated hourly
          </div>
        </motion.div>

        <div className="row g-4">
          {events.map((ev, i) => (
            <motion.div
              key={ev.id}
              className="col-12 col-md-6 col-lg-3"
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div
                className="sb-event"
                style={{
                  "--event-color": ev.color,
                  "--event-glow": ev.glow,
                }}
              >
                <div className="sb-event__tag">{ev.tag}</div>
                <div className="sb-event__date">
                  <small>
                    {ev.weekday} · {ev.month}
                  </small>
                  {ev.day}
                </div>
                <div>
                  <div className="sb-event__title">{ev.title}</div>
                  <div className="sb-mono sb-ink-dim mt-2" style={{ letterSpacing: "0.18em", fontSize: "0.7rem" }}>
                    {ev.sub}
                  </div>
                  <div className="sb-event__meta">
                    <span>{ev.time}</span>
                    <span>{ev.room}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
