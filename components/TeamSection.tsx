import TeamShowcase from "@/components/ui/team-showcase";

export default function TeamSection() {
  return (
    <section id="team" className="resp-section" style={{ background: "var(--white)", borderTop: "1px solid var(--gray-200)" }}>
      <div className="resp-container">
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 14 }}>
            Our Team
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 110px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--black)", margin: 0 }}>
            The people<br />behind the work.
          </h2>
        </div>

        {/* Team showcase */}
        <TeamShowcase />
      </div>
    </section>
  );
}
