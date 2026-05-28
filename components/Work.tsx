"use client";

import { ProductHighlightCard } from "@/components/ui/product-highlight-card";
import { Truck, BarChart2, Users, FileText } from "lucide-react";

function Icon3D({ icon, accent = "rgba(255,255,255,0.8)" }: { icon: React.ReactNode; accent?: string }) {
  return (
    <div style={{
      width: 148, height: 148,
      transform: "perspective(700px) rotateX(-12deg) rotateY(16deg)",
      background: "linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.03) 100%)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 28,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative",
      boxShadow: `0 30px 60px rgba(0,0,0,0.55), 0 12px 24px rgba(0,0,0,0.35), 0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.25)`,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, transparent 100%)", borderRadius: "28px 28px 0 0", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 6, left: 0, width: "30%", bottom: 6, background: "linear-gradient(90deg, rgba(255,255,255,0.07), transparent)", borderRadius: "28px 0 0 28px", pointerEvents: "none" }} />
      <div style={{ color: accent, position: "relative", zIndex: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))" }}>
        {icon}
      </div>
    </div>
  );
}

const CASES = [
  {
    tag: "Brand + SEO",
    icon: <Truck size={16} />,
    title: "3× leads",
    desc: "Complete rebrand for a 200-truck carrier. #1 for 14 keywords in 60 days.",
    metric: "3× inbound leads",
    bigIcon: <Truck size={64} strokeWidth={1.2} />,
    accent: "rgba(255,200,120,0.95)",
    bg: "#0A0A0A",
    color: "#ffffff",
  },
  {
    tag: "Paid Ads",
    icon: <BarChart2 size={16} />,
    title: "–40% CPL",
    desc: "Google & LinkedIn ads for a freight brokerage. Lead volume doubled.",
    metric: "–40% cost per lead",
    bigIcon: <BarChart2 size={64} strokeWidth={1.2} />,
    accent: "rgba(100,220,160,0.95)",
    bg: "#1a1a2e",
    color: "#ffffff",
  },
  {
    tag: "Lead Generation",
    icon: <Users size={16} />,
    title: "$2.4M",
    desc: "Cold outreach targeting mid-market shippers. Pipeline built in 90 days.",
    metric: "$2.4M pipeline",
    bigIcon: <Users size={64} strokeWidth={1.2} />,
    accent: "rgba(255,140,120,0.95)",
    bg: "#0f2027",
    color: "#ffffff",
  },
  {
    tag: "Content + Social",
    icon: <FileText size={16} />,
    title: "120 leads",
    desc: "LinkedIn content & email nurture built from scratch. Per month, every month.",
    metric: "120 leads / month",
    bigIcon: <FileText size={64} strokeWidth={1.2} />,
    accent: "rgba(180,140,255,0.95)",
    bg: "#161616",
    color: "#ffffff",
  },
];

export default function Work() {
  return (
    <section id="work" className="resp-section" style={{ background: "var(--white)" }}>
      <div className="resp-container">

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 16 }}>Case Studies</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 120px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--black)" }}>
              Results, not promises.
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "var(--gray-500)", maxWidth: 340, lineHeight: 1.7 }}>
            Every case study below is a real logistics company with real numbers.
          </p>
        </div>

        {/* ProductHighlightCards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
          {CASES.map((c) => (
            <ProductHighlightCard
              key={c.title}
              categoryIcon={
                <span style={{ color: c.color, opacity: 0.7 }}>{c.icon}</span>
              }
              category={c.tag}
              title={c.title}
              description={c.desc}
              imageNode={<Icon3D icon={c.bigIcon} accent={c.accent} />}
              style={{ background: c.bg, color: c.color }}
            />
          ))}
        </div>

        {/* Metric strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-16 md:mt-20" style={{
          borderTop: "1px solid var(--gray-200)",
          borderLeft: "1px solid var(--gray-200)",
        }}>
          {CASES.map((c) => (
            <div key={c.metric} style={{
              padding: "32px 28px",
              borderRight: "1px solid var(--gray-200)",
              borderBottom: "1px solid var(--gray-200)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 8 }}>{c.tag}</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--black)" }}>{c.metric}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
