"use client";

import { Suspense, useState, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import dynamic from "next/dynamic";

const Truck = dynamic(() => import("./Truck"), { ssr: false });

/* ── WebGL error boundary ─────────────────────────────────────────── */
class WebGLBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? (this.props.fallback ?? null) : this.props.children; }
}

type Variant = "semi" | "reefer" | "tanker";

const VARIANTS: { id: Variant; label: string; desc: string }[] = [
  { id: "semi",   label: "Container",    desc: "40ft dry van — the workhorse of long-haul freight" },
  { id: "reefer", label: "Refrigerated", desc: "Temperature-controlled unit for perishable cargo"   },
  { id: "tanker", label: "Tanker",       desc: "Liquid & bulk transport with sealed pressured tank"  },
];

export default function TruckScene() {
  const [active, setActive] = useState<Variant>("semi");
  const current = VARIANTS.find(v => v.id === active)!;

  return (
    <div style={{ width: "100%", background: "var(--gray-900)", position: "relative" }}>

      {/* Canvas */}
      <div style={{ width: "100%", height: "70vh", minHeight: 480 }}>
        <WebGLBoundary>
        <Canvas
          shadows
          camera={{ position: [8, 4, 12], fov: 38 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#0A0A0A" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[8, 12, 6]}
              intensity={1.8}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.0004}
            />
            <directionalLight position={[-6, 4, -8]} intensity={0.5} color="#aac8ff" />
            <pointLight position={[0, 6, 0]} intensity={0.4} color="#ffffff" />

            <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.15}>
              <Truck
                variant={active}
                rotate={false}
                bodyColor="#1A1B1F"
                trailerColor="#141518"
                accent="#FFFFFF"
              />
            </Float>

            <ContactShadows
              position={[0, -0.01, 0]}
              opacity={0.6}
              scale={28}
              blur={2.5}
              far={6}
              color="#000000"
            />

            <Environment preset="warehouse" />

            <EffectComposer>
              <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.9} intensity={0.6} />
              <Vignette eskil={false} offset={0.25} darkness={0.7} />
            </EffectComposer>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate
              autoRotateSpeed={0.6}
            />
          </Suspense>
        </Canvas>
        </WebGLBoundary>
      </div>

      {/* Controls overlay */}
      <div style={{ padding: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>

        {/* Left: description */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-600)", marginBottom: 8 }}>Fleet Type</p>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--white)", marginBottom: 6 }}>
            {current.label}
          </h3>
          <p style={{ fontSize: 14, color: "var(--gray-500)", maxWidth: 360 }}>{current.desc}</p>
        </div>

        {/* Right: variant switcher */}
        <div style={{ display: "flex", gap: 8 }}>
          {VARIANTS.map(v => (
            <button
              key={v.id}
              onClick={() => setActive(v.id)}
              style={{
                padding: "10px 20px",
                background: active === v.id ? "var(--white)" : "transparent",
                color: active === v.id ? "var(--black)" : "var(--gray-500)",
                border: `1.5px solid ${active === v.id ? "var(--white)" : "var(--gray-700)"}`,
                borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600,
                transition: "all 0.2s", fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={e => { if (active !== v.id) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-500)"; }}
              onMouseLeave={e => { if (active !== v.id) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gray-700)"; }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
