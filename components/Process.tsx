"use client";

const STEPS = [
  { num: "01", title: "Discovery Call",        desc: "We audit your current marketing, understand your lanes, and identify the fastest path to new shippers. 45 minutes, no slides." },
  { num: "02", title: "Strategy & Proposal",   desc: "Within 5 business days you get a tailored marketing plan — exact channels, budget, timeline, and fixed pricing. No retainer surprises." },
  { num: "03", title: "Launch & Execute",      desc: "We build campaigns, content, and funnels. Weekly reports, real numbers, full transparency. You always know what's running and why." },
  { num: "04", title: "Scale What Works",      desc: "We double down on the channels driving the most qualified shipper leads and cut what doesn't. Your pipeline grows, your cost per lead drops." },
];

export default function Process() {
  return (
    <section id="process" className="resp-section" style={{ background: "var(--gray-50)", borderTop: "1px solid var(--gray-200)", borderBottom: "1px solid var(--gray-200)" }}>
      <div className="resp-container">

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-20" style={{ alignItems: "start" }}>

          <div className="md:sticky" style={{ top: 100 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 16 }}>How It Works</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 110px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--black)", marginBottom: 20 }}>
              From first call to first lead.
            </h2>
            <p style={{ fontSize: 15, color: "var(--gray-500)", lineHeight: 1.7 }}>
              We move fast because logistics companies don&apos;t have time to wait on a slow agency.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--gray-200)" }}>
            {STEPS.map((step) => (
              <div key={step.num}
                className="process-step"
              style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 24, padding: "40px 0", borderBottom: "1px solid var(--gray-200)", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--white)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--gray-300)", paddingTop: 4 }}>{step.num}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--black)", marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--gray-500)", lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
