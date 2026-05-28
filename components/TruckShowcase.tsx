"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { RipplePulseLoader } from "@/components/ui/ripple-pulse-loader";

const TruckScene = dynamic(() => import("./three/TruckScene"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: "70vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
      <RipplePulseLoader color="#ffffff" />
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gray-600)" }}>Loading fleet…</span>
    </div>
  ),
});

/* ── WebGL fallback ───────────────────────────────────────────────── */
function FleetFallback() {
  return (
    <div style={{ width: "100%", height: "60vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
      <svg width="120" height="68" viewBox="0 0 120 68" fill="none" opacity={0.18}>
        <rect x="2" y="22" width="70" height="36" rx="4" fill="white"/>
        <rect x="72" y="30" width="44" height="28" rx="4" fill="white"/>
        <rect x="80" y="22" width="34" height="10" rx="2" fill="white"/>
        <circle cx="18" cy="62" r="7" fill="#171717" stroke="white" strokeWidth="2.5"/>
        <circle cx="54" cy="62" r="7" fill="#171717" stroke="white" strokeWidth="2.5"/>
        <circle cx="96" cy="62" r="7" fill="#171717" stroke="white" strokeWidth="2.5"/>
      </svg>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gray-600)" }}>
        3D viewer requires WebGL
      </p>
    </div>
  );
}

/* ── Detect WebGL ─────────────────────────────────────────────────── */
function canUseWebGL(): boolean {
  try {
    if (!window.WebGLRenderingContext) return false;
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
    if (!gl) return false;
    // Release the test context immediately so Three.js can create its own
    (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch { return false; }
}

export default function TruckShowcase() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => { setWebgl(canUseWebGL()); }, []);

  return (
    <section id="fleet" style={{ background: "var(--gray-900)", borderTop: "1px solid var(--gray-800)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 40px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-600)", marginBottom: 16 }}>Our Fleet</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 120px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--white)" }}>
              Built for every<br />cargo type.
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--gray-500)", maxWidth: 340, lineHeight: 1.7 }}>
            From dry van to refrigerated to liquid bulk — we brand, operate, and optimize every class of vehicle.
          </p>
        </div>
      </div>

      {webgl === null && (
        <div style={{ width: "100%", height: "70vh", background: "#0A0A0A" }} />
      )}
      {webgl === false && <FleetFallback />}
      {webgl === true  && <TruckScene />}
    </section>
  );
}
