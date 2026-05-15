import { Component, Suspense, useEffect, useMemo } from "react";
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

            <div className="sb-viewer3d__meta">
              <div className="sb-eyebrow" style={{ color: beer.accent }}>
                ● {beer.mood}
              </div>
              <h3 className="sb-viewer3d__title">{beer.name}</h3>
              <div className="sb-viewer3d__sub">
                {beer.style} · {beer.abv}
              </div>
            </div>

            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0.9, 2.6], fov: 28 }}
              gl={{ antialias: true, alpha: true }}
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
                  <ModelErrorBoundary fallback={<ProceduralCan beer={beer} />}>
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
                target={[0, 0.9, 0]}
              />
            </Canvas>

            <div className="sb-viewer3d__hint">
              <span className="sb-viewer3d__hint-icon" aria-hidden="true">↻</span>
              Drag to rotate · Scroll to zoom
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GLBModel({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf]);

  // Auto-center + normalize scale so every can fills the same volume,
  // regardless of how the source GLB was exported.
  const { centeredScene, scale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // shift so the model's center sits at the origin
    scene.position.sub(center);

    // normalize so the tallest dimension is ~1.7 units (a beer can)
    const targetHeight = 1.7;
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = targetHeight / maxDim;

    return { centeredScene: scene, scale: s };
  }, [scene]);

  return (
    <primitive
      object={centeredScene}
      scale={scale}
      position={[0, 0.9, 0]}
    />
  );
}

/**
 * ProceduralCan — themed 3D can rendered with primitives so the viewer
 * always has something cinematic to show, even before GLBs are added.
 */
function ProceduralCan({ beer }) {
  const accent = new THREE.Color(beer.accent);
  return (
    <group position={[0, -0.1, 0]}>
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
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    // swallow — fallback handles UX
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
