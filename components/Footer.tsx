"use client";

const LINKS = {
  Services: ["Branding", "Web & Software", "Operations", "Growth", "HR & Talent", "Finance & Legal"],
  Company:  ["About", "Careers", "Press", "Blog"],
  Legal:    ["Privacy Policy", "Terms of Service", "Cookies"],
};

export default function Footer() {

  return (
    <footer className="resp-section" style={{ background: "var(--gray-900)", borderTop: "1px solid var(--gray-800)", position: "relative", zIndex: 2 }}>
      <div className="resp-container">

        <div className="footer-grid">

          {/* Brand */}
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.04em", color: "var(--white)", marginBottom: 16 }}>
              BigOne<span style={{ color: "var(--gray-600)" }}>.</span>
            </p>
            <p style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.7, maxWidth: 260, marginBottom: 32 }}>
              The full-service agency built exclusively for logistics companies.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["Tg", "Li", "Tw"].map(s => (
                <a key={s} href="#"
                  style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--gray-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--gray-500)", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gray-500)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--gray-700)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--gray-500)"; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-600)", marginBottom: 20 }}>{group}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => (
                  <a key={item} href="#"
                    style={{ fontSize: 14, color: "var(--gray-500)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)"}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--gray-500)"}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>
    </footer>
  );
}
