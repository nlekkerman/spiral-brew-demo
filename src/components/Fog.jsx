/**
 * Fog — atmospheric layered drift overlay.
 * Uses --sb-glow for accent-tinted volume.
 */
export default function Fog() {
  return (
    <div className="sb-fog" aria-hidden="true">
      <div className="sb-fog__layer" />
      <div className="sb-fog__layer sb-fog__layer--2" />
    </div>
  );
}
