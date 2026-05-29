"use client";
import { ProductHighlightCard } from "@/components/ui/product-highlight-card";

const BG = "#111114";

const SERVICES = [
  {
    num: "01",
    title: "SMM Management",
    desc: "Full social media management across Instagram, LinkedIn, Facebook and TikTok — content, scheduling, and community for logistics brands.",
    tags: ["Instagram", "LinkedIn", "TikTok", "Analytics"],
    icon: "/icons/smm.png",
  },
  {
    num: "02",
    title: "Video Production",
    desc: "Full-cycle video from on-site filming to final cut — fleet shoots, drone, reels, ads, and branded content with motion graphics.",
    tags: ["Filming", "Drone", "Editing", "Reels", "Motion Graphics"],
    icon: "/icons/video.png",
  },
  {
    num: "03",
    title: "Website Development",
    desc: "High-converting logistics websites built for speed and SEO. Designed to turn shipper visits into inbound calls.",
    tags: ["Web Design", "SEO", "Copywriting", "CMS"],
    icon: "/icons/website.png",
  },
  {
    num: "04",
    title: "Lead Generation",
    desc: "Cold outreach, shipper lists, and multi-channel sequences that fill your pipeline with qualified freight clients.",
    tags: ["Cold Email", "LinkedIn SDR", "CRM Setup", "Sequences"],
    icon: "/icons/leads.png",
  },
  {
    num: "05",
    title: "Graphic Design",
    desc: "Brand visuals, fleet wraps, pitch decks, and social creatives — all designed with the logistics industry in mind.",
    tags: ["Logo", "Fleet Wrap", "Pitch Deck", "Creatives"],
    icon: "/icons/design.png",
  },
  {
    num: "06",
    title: "Professional Brand Faces",
    desc: "We connect your brand with credible industry voices — drivers, operators, and freight influencers who speak your audience's language.",
    tags: ["Influencers", "Testimonials", "UGC", "Spokesperson"],
    icon: "/icons/brand.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="resp-section" style={{ background: "var(--white)" }}>
      <div className="resp-container">

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(40px, 6vw, 80px)", flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 16 }}>What We Do</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 120px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--black)" }}>
              Six services.<br />One focus.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--gray-500)", maxWidth: 360, lineHeight: 1.7 }}>
            Exclusively built for only logistics industry.
          </p>
        </div>

        <div className="services-grid grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 justify-items-center" style={{ overflow: "visible" }}>
          {SERVICES.map((s) => (
            <ProductHighlightCard
              key={s.num}
              title={s.title}
              description={s.desc}
              imageSrc={s.icon}
              imageAlt={s.title}
              tags={s.tags}
              style={{ background: BG, color: "#ffffff" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
