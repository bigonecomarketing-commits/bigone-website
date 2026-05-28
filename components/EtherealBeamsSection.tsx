"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { RippleButton } from "@/components/ui/ripple-button";

const EtherealBeamsHero = dynamic(
  () => import("@/components/ui/ethereal-beams-hero"),
  { ssr: false, loading: () => <HeroDark loading /> }
);

/* ── Fallback hero (shown while loading or when WebGL unavailable) ── */
function HeroDark({ loading = false }: { loading?: boolean }) {
  return (
    <div style={{
      minHeight: "100vh", background: "#000000",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "120px 24px 80px", textAlign: "center", gap: 28,
      opacity: loading ? 0 : 1, transition: "opacity 0.4s",
    }}>
      <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#404040" }}>
        Marketing Agency for Logistics Companies
      </p>
      <h1 style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(52px, 8vw, 200px)", letterSpacing: "-0.04em",
        lineHeight: 1.0, color: "#ffffff", maxWidth: 900, margin: 0,
      }}>
        BIG ONE<br />
        <span style={{ color: "#444" }}>Marketing Company<br />for Trucking Companies</span>
      </h1>
      <p style={{ fontSize: "clamp(16px, 1.4vw, 28px)", color: "#555", lineHeight: 1.7, maxWidth: 440, margin: 0 }}>
        BigOne handles all the marketing so trucking and freight companies can focus on the road.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        <RippleButton
          variant="default"
          rippleColor="rgba(0,0,0,0.25)"
          onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          style={{ padding: "14px 28px", background: "#ffffff", color: "#000000", fontSize: 15, fontWeight: 600, borderRadius: 8 }}
        >
          Start a project →
        </RippleButton>
        <RippleButton
          variant="ghost"
          onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
          style={{ padding: "14px 28px", color: "#ffffff", border: "1.5px solid #333", fontSize: 15, fontWeight: 600, borderRadius: 8 }}
        >
          See case studies
        </RippleButton>
      </div>
    </div>
  );
}

/* ── Detect WebGL support once on the client ─────────────────────── */
function canUseWebGL(): boolean {
  try {
    if (!window.WebGLRenderingContext) return false;
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
    if (!gl) return false;
    // Release the test context immediately so Three.js can create its own
    (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function EtherealBeamsSection() {
  // null = not yet checked (SSR / first paint), true/false = result
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(canUseWebGL());
  }, []);

  // Server / first paint → show dark placeholder so layout doesn't jump
  if (webgl === null) {
    return <div className="-mt-16"><HeroDark loading /></div>;
  }

  // WebGL unavailable → show clean fallback, no Three.js Canvas mounted
  if (!webgl) {
    return <div className="-mt-16"><HeroDark /></div>;
  }

  // WebGL OK → render the full 3D beams hero
  return <div className="-mt-16"><EtherealBeamsHero /></div>;
}
