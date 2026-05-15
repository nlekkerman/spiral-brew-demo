import { Component, Suspense, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

/**
 * BeerViewer — cinematic click-to-open 3D showcase of a beer.
 *
 * - Lazy: only mounts when a `beer` is passed in.
 * - Suspense + AnimatePresence for smooth enter/exit.
 * - Falls back to a procedural themed can if the GLB fails to load.
 * - Closes on backdrop click, close button, or Escape.
 */
export default function BeerViewer({ beer, onClose }) {
  const [loadError, setLoadError] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Reset error state whenever the viewer opens a new beer
  useEffect(() => {
    setLoadError(null);
  }, [beer?.id]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Camera is centered.
  const cameraPos = isMobile ? [0, 0, 6.2] : [0, 0, 5.2];

  useEffect(() => {
    if (!beer) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    // lock body scroll while the modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [beer, onClose]);

  return (
    <AnimatePresence>
      {beer && (
        <motion.div
          key={beer.id}
          className="sb-viewer3d"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: "100vw",
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "rgba(7,7,10,0.92)",
            overflow: "auto"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={`${beer.name} 3D viewer`}
          onClick={onClose}
        >
          <motion.div
            className="sb-viewer3d__stage"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "0 auto",
              background: "none"
            }}
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 10, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="sb-viewer3d__close"
              onClick={onClose}
              aria-label="Close 3D viewer"
            >
              ×
            </button>

            {/* Stack: 3D canvas centered, then text meta below */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <div
                style={{
                  width: "min(82vw, 420px)",
                  height: "min(82vw, 520px)",
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Canvas
                  dpr={[1, 2]}
                  camera={{ position: cameraPos, fov: 28 }}
                  gl={{ antialias: true, alpha: true }}
                  style={{ display: "block", margin: "auto", width: "100%", height: "100%" }}
                >
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[3, 4, 5]} intensity={1.2} />
                    <directionalLight
                      position={[-3, -2, -2]}
                      intensity={0.4}
                      color={beer.accent}
                    />
                    <Suspense fallback={null}>
                      <Float
                        speed={1.1}
                        rotationIntensity={0.3}
                        floatIntensity={0.7}
                        floatingRange={[-0.06, 0.06]}
                      >
                        <ModelErrorBoundary
                          fallback={<ProceduralCan beer={beer} positionY={0} />}
                          modelUrl={beer.model}
                          onError={(err) => setLoadError(err)}
                        >
                          <GLBModel url={beer.model} />
                        </ModelErrorBoundary>
                      </Float>
                      <Environment preset="city" />
                    </Suspense>
                    <OrbitControls
                      enablePan={false}
                      enableZoom
                      zoomSpeed={0.5}
                      enableRotate
                      rotateSpeed={0.7}
                      target={[0, 0, 0]} // always center controls on model
                    />
                  </Canvas>
                </div>
              </div>
              <div className="sb-viewer3d__hint">
                <span className="sb-viewer3d__hint-icon" aria-hidden="true">↻</span>
                Drag to rotate · Scroll to zoom
              </div>
              {loadError && (
                <div className="sb-viewer3d__error" role="alert">
                  <strong>GLB failed to load — showing fallback can.</strong>
                  <div className="sb-viewer3d__error-url">{beer.model}</div>
                  <div className="sb-viewer3d__error-msg">
                    {String(loadError?.message || loadError)}
                  </div>
                </div>
              )}
              <div className="sb-viewer3d__meta" style={{ marginTop: 32, marginBottom: 0, textAlign: "center" }}>
                <div className="sb-eyebrow" style={{ color: beer.accent }}>
                  ● {beer.mood}
                </div>
                <h3 className="sb-viewer3d__title">{beer.name}</h3>
                <div className="sb-viewer3d__sub">
                  {beer.style} · {beer.abv}
                </div>
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function GLBModel({ url }) {
  const gltf = useLoader(GLTFLoader, url);

  const { scene, scale, offset } = useMemo(() => {
    const cloned = gltf.scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const targetHeight = 2.2;
    const scale = targetHeight / (size.y || 1);

    return {
      scene: cloned,
      scale,
      offset: [
        -center.x * scale,
        -center.y * scale,
        -center.z * scale,
      ],
    };
  }, [gltf.scene]);

  // Rotate top toward viewer by 10 degrees (radians)
  return (
    <group position={[0, 0, 0]}>
      <primitive
        object={scene}
        scale={scale}
        position={offset}
        rotation={new THREE.Euler(-Math.PI / 18, 0, 0)} // -10 degrees around X
      />
    </group>
  );
}

/**
 * ProceduralCan — themed 3D can rendered with primitives so the viewer
 * always has something cinematic to show, even before GLBs are added.
 */
function ProceduralCan({ beer, positionY = -0.1 }) {
  const accent = new THREE.Color(beer.accent);
  return (
    <group position={[0, positionY, 0]}>
      {/* body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 1.7, 64, 1, false]} />
        <meshStandardMaterial
          color={"#141414"}
          metalness={0.85}
          roughness={0.28}
        />
      </mesh>
      {/* top color band */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.555, 0.555, 0.28, 64, 1, true]} />
        <meshStandardMaterial
          color={accent}
          metalness={0.7}
          roughness={0.35}
          emissive={accent}
          emissiveIntensity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* top lid */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.04, 64]} />
        <meshStandardMaterial color={"#9a9a9a"} metalness={1} roughness={0.25} />
      </mesh>
      {/* bottom rim */}
      <mesh position={[0, -0.86, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.04, 64]} />
        <meshStandardMaterial color={"#2a2a2a"} metalness={1} roughness={0.3} />
      </mesh>
      {/* accent ring */}
      <mesh position={[0, 0.46, 0]}>
        <torusGeometry args={[0.56, 0.012, 12, 64]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.6}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // Surface the real reason the GLB failed so we don't silently show the procedural fallback.
    // eslint-disable-next-line no-console
    console.error(
      `[BeerViewer] GLB failed to load: ${this.props.modelUrl}`,
      error,
      info
    );
    this.props.onError?.(error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
