"use client";
import { useEffect, useRef } from "react";
import { TiltCard } from "@/components/ui/tilt-card";

const STATS = [
  { value: 80,   suffix: "+",    label: "Logistics Clients",         prefix: ""  },
  { value: 3,    suffix: "×",    label: "Avg. Lead Growth",          prefix: ""  },
  { value: 12,   suffix: "M+",   label: "Revenue Generated",         prefix: "$" },
  { value: 96,   suffix: "%",    label: "Client Retention Rate",     prefix: ""  },
  { value: 40,   suffix: "+",    label: "Cities Covered",            prefix: ""  },
  { value: 12,   suffix: " yr",  label: "In Logistics Marketing",    prefix: ""  },
];

export default function Numbers() {
  return (
    <section className="resp-section" style={{ background: "var(--gray-900)" }}>
      <div className="resp-container">
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: 80 }}>Impact in Numbers</p>
        <div className="numbers-grid">
          {STATS.map((s, i) => <StatBlock key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function StatBlock({ s, i }: { s: typeof STATS[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const seen   = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || seen.current) return;
      seen.current = true;
      const start = performance.now();
      const duration = 2000;
      const animate = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        if (numRef.current) {
          const v = ease * s.value;
          numRef.current.textContent = Math.round(v).toString();
        }
        if (p < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [s]);

  return (
    <TiltCard
      tiltLimit={10}
      scale={1.03}
      perspective={800}
      effect="gravitate"
      spotlight={true}
    >
      <div ref={ref} className="p-8 sm:p-12">
        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 130px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "var(--white)", marginBottom: 10 }}>
          {s.prefix}<span ref={numRef}>0</span><span style={{ color: "var(--gray-500)" }}>{s.suffix}</span>
        </div>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--gray-500)" }}>{s.label}</p>
      </div>
    </TiltCard>
  );
}
