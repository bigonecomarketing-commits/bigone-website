"use client";
import { useEffect, useRef } from "react";
import { RippleButton } from "@/components/ui/ripple-button";

const STATS = [
  { val: "500+", label: "Shipments / day" },
  { val: "98%",  label: "On-time delivery" },
  { val: "40+",  label: "Countries served" },
  { val: "12yr", label: "In the industry"  },
];

export default function Hero() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headRef.current, subRef.current, ctaRef.current, statRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        if (!el) return;
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 120 + i * 110);
    });
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-end pt-28 pb-16 md:pb-20 px-5 md:px-10" style={{
      background: "var(--white)",
      borderBottom: "1px solid var(--gray-200)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>

        {/* Label */}
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 32 }}>
          Full-Service Logistics Agency
        </p>

        {/* Headline */}
        <h1 ref={headRef} style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "clamp(52px, 8vw, 220px)", letterSpacing: "-0.04em",
          lineHeight: 1.0, color: "var(--black)", marginBottom: 32,
          maxWidth: 900,
        }}>
          Moving freight.<br />
          <span style={{ color: "var(--gray-400)" }}>Building brands.</span>
        </h1>

        {/* Sub + CTA row */}
        <div ref={subRef} style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 48, marginBottom: 80 }}>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 28px)", color: "var(--gray-500)", lineHeight: 1.7, maxWidth: 440 }}>
            We embed across every function of your logistics business — brand, software, operations, and growth — so you can focus on the road ahead.
          </p>
          <div ref={ctaRef} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <RippleButton
              variant="default"
              rippleColor="rgba(255,255,255,0.3)"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "14px 28px", background: "var(--black)", color: "var(--white)", fontSize: 15, fontWeight: 600, borderRadius: 8 }}
              className="text-base"
            >
              Start a project
            </RippleButton>
            <RippleButton
              variant="hoverborder"
              hoverBorderEffectColor="rgba(0,0,0,0.4)"
              onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "14px 28px", color: "var(--black)", border: "1.5px solid var(--gray-300)", fontSize: 15, fontWeight: 600, borderRadius: 8 }}
              className="text-base"
            >
              View our work
            </RippleButton>
          </div>
        </div>

        {/* Stats */}
        <div ref={statRef} className="grid grid-cols-2 sm:grid-cols-4 pt-10 border-t border-gray-200">
          {STATS.map((s, i) => (
            <div key={i} className={`py-2 pr-4 sm:pr-8 ${i > 0 ? "pl-4 sm:pl-8 border-l border-gray-200" : ""}`}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 80px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--black)", marginBottom: 6 }}>{s.val}</p>
              <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-400)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
