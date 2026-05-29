"use client";

const PILLARS = [
  {
    title: "Logistics-Only",
    body: "We don't work with retail, tech, or restaurants. Every campaign, every hire, every tool is built for trucking and freight. No learning curve, no generic playbooks.",
  },
  {
    title: "Results-First",
    body: "No retainers for vanity metrics. Every service we offer is tied to leads generated, revenue won, or brand visibility that converts — not just impressions.",
  },
  {
    title: "Industry Insiders",
    body: "Our team has dispatched loads, managed fleets, and run freight ops. We speak the language because we lived it — that's what makes our marketing different.",
  },
];

export default function About() {
  return (
    <section id="about" className="resp-section" style={{ background: "var(--white)", borderTop: "1px solid var(--gray-200)" }}>
      <div className="resp-container">

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px, 5vw, 80px)", alignItems: "start" }}>

          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 24 }}>About BigOne</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 110px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--black)", marginBottom: 24 }}>
              Built from inside<br />the industry.
            </h2>
            <p style={{ fontSize: 16, color: "var(--gray-500)", lineHeight: 1.75, marginBottom: 20 }}>
              BigOne was founded by logistics operators who got tired of briefing generic agencies that didn&apos;t know a manifest from a mile marker. So we built the marketing agency we always wanted — one that speaks the language, knows the pain, and drives real freight revenue.
            </p>
            <p style={{ fontSize: 16, color: "var(--gray-500)", lineHeight: 1.75 }}>
              We are a 20-person marketing team. No outsourcing, no account manager handoffs. Your campaigns stay in one room, managed by people who understand logistics.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--gray-200)" }}>
            {PILLARS.map((p, i) => (
              <div key={p.title} style={{ padding: "32px 0", borderBottom: "1px solid var(--gray-200)", display: "grid", gridTemplateColumns: "20px 1fr", gap: 24, alignItems: "start" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-300)", paddingTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--black)", marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.7 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", marginTop: 80, paddingTop: 48, borderTop: "1px solid var(--gray-200)" }}>
          {[
            { v: "2013",         l: "Founded"           },
            { v: "20+",          l: "Team Members"       },
            { v: "Logistics",    l: "Only Industry"      },
            { v: "Remote-First", l: "Work Model"         },
          ].map(s => (
            <div key={s.l}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--black)", lineHeight: 1 }}>{s.v}</p>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", marginTop: 6 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
