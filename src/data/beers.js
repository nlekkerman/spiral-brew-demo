import bottoms from "../assets/beers/bottoms.png";
import buckhorn from "../assets/beers/buckhorn.png";
import downwardDouble from "../assets/beers/downward-double.png";
import downwardSpiral from "../assets/beers/downward-spiral.png";
import hardLeft from "../assets/beers/hard-left.png";
import townie from "../assets/beers/townie.png";

/**
 * Spiral Brewery — beer universe data.
 * Each beer drives a full visual theme (background, accents, glow, tagline).
 * `image` is the imported product photo used everywhere a can is rendered.
 */
const beers = [
  {
    id: "the-bottoms",
    name: "The Bottoms",
    style: "American Porter",
    abv: "6.1%",
    image: bottoms,
    model: `${import.meta.env.BASE_URL}models/bottom-3d.glb`,
    tagline: "Down by the water. Where the saxophone bleeds.",
    description:
      "A noir American porter — dark cherry, tobacco, and bittersweet chocolate. Built for slow rooms and long stories.",
    accent: "#C8252B",
    accentSoft: "#FF5A60",
    bgFar: "#0a0202",
    bgNear: "#2a0808",
    glow: "rgba(200,37,43,0.55)",
    mood: "noir jazz · deep river",
    poster: "BOTTOMS",
  },
  {
    id: "buckhorn-brown",
    name: "Buckhorn Brown",
    style: "Brown Ale",
    abv: "5.5%",
    image: buckhorn,
    model: `${import.meta.env.BASE_URL}models/buckhorn-3d.glb`,
    tagline: "Above the timberline. Below the stars.",
    description:
      "A crisp brown ale — toasted malt, pine resin, and a clean snap of altitude. Brewed for the long walk home.",
    accent: "#A86B3C",
    accentSoft: "#E0A878",
    bgFar: "#0e0a06",
    bgNear: "#2a1a0e",
    glow: "rgba(168,107,60,0.55)",
    mood: "wilderness · mountain air",
    poster: "BUCK",
  },
  {
    id: "double-downward-spiral",
    name: "Double Downward Spiral",
    style: "Double IPA",
    abv: "9.5%",
    image: downwardDouble,
    model: `${import.meta.env.BASE_URL}models/doble-spiral-3d.glb`,
    tagline: "Twice the voltage. Twice the descent.",
    description:
      "A double IPA wired for late hours — tropical citrus, resin, and a long electric finish. 9.5% and unblinking.",
    accent: "#FF2E8A",
    accentSoft: "#FF7AB6",
    bgFar: "#10031f",
    bgNear: "#3a0a55",
    glow: "rgba(255,46,138,0.6)",
    mood: "neon · synthwave · deep night",
    poster: "DOUBLE",
  },
  {
    id: "downward-spiral",
    name: "Downward Spiral",
    style: "American IPA",
    abv: "7.4%",
    image: downwardSpiral,
    model: `${import.meta.env.BASE_URL}models/downward-3d.glb`,
    tagline: "Neon rain. Hazy nights. The city never closes.",
    description:
      "An American IPA built from midnight citrus and humming voltage — bright, electric, dangerously easy.",
    accent: "#7A4BFF",
    accentSoft: "#B89BFF",
    bgFar: "#0a0420",
    bgNear: "#2a0a55",
    glow: "rgba(122,75,255,0.55)",
    mood: "neon · urban · synthwave",
    poster: "SPIRAL",
  },
  {
    id: "hard-left",
    name: "Hard Left",
    style: "American Stout",
    abv: "6.5%",
    image: hardLeft,
    model: `${import.meta.env.BASE_URL}models/hardleft-3d.glb`,
    tagline: "Take the curve. Burn the rubber. Drink the asphalt.",
    description:
      "An American stout forged for the back straight. Charred malt, oak, and a finish like spent rubber on hot tarmac.",
    accent: "#FF6A1A",
    accentSoft: "#FFB070",
    bgFar: "#1a0a05",
    bgNear: "#3a160a",
    glow: "rgba(255,106,26,0.55)",
    mood: "racing · asphalt · smoke",
    poster: "HARD LEFT",
  },
  {
    id: "townie",
    name: "Töwnie",
    style: "Kölsch-Style Ale",
    abv: "5.0%",
    image: townie,
    model: `${import.meta.env.BASE_URL}models/townie-3d.glb`,
    tagline: "A round for the regulars. Lights low. Talk easy.",
    description:
      "A clean Kölsch-style ale — soft bread, white grape, and a quiet finish. The neighborhood pour.",
    accent: "#F5B642",
    accentSoft: "#FFE3A1",
    bgFar: "#1a140a",
    bgNear: "#4a3818",
    glow: "rgba(245,182,66,0.55)",
    mood: "golden hour · easy room",
    poster: "TÖWNIE",
  },
];

export default beers;
