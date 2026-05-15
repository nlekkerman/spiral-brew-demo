import { FaInstagram, FaSpotify, FaUntappd, FaYoutube } from "react-icons/fa";
import taproomBg from "../assets/taproom.png";

export default function Footer() {
  return (
    <footer id="taproom" className="sb-footer">
      <div
        className="sb-footer__bg"
        style={{ backgroundImage: `url(${taproomBg})` }}
        aria-hidden="true"
      />
      <div className="sb-footer__overlay" aria-hidden="true" />
      <div className="container-xxl">
        <div className="sb-footer__big">Spiral Brewery</div>

        <div className="sb-footer__row">
          <div className="sb-footer__col">
            <h6>Taproom</h6>
            <p>
              412 Levee Road
              <br />
              Memphis, TN 38103
            </p>
            <p>Thu–Sun · 4pm — late</p>
          </div>
          <div className="sb-footer__col">
            <h6>Wholesale</h6>
            <a href="#">trade@spiralbrewery.co</a>
            <a href="#">Distribution Map</a>
            <a href="#">Press Kit</a>
          </div>
          <div className="sb-footer__col">
            <h6>Universe</h6>
            <a href="#beers">The Lineup</a>
            <a href="#story">Manifesto</a>
            <a href="#events">Calendar</a>
            <a href="#">Members Club</a>
          </div>
          <div className="sb-footer__col">
            <h6>Follow</h6>
            <div className="sb-socials mt-2">
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Spotify"><FaSpotify /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
              <a href="#" aria-label="Untappd"><FaUntappd /></a>
            </div>
          </div>
        </div>

        <div className="sb-footer__base">
          <div>© 2026 Spiral Brewery Co. · All Rights Reserved</div>
          <div>Please Drink Responsibly · 21+</div>
          <div>Built in the Delta</div>
        </div>
      </div>
    </footer>
  );
}
