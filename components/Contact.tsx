"use client";
import React, { useState } from "react";

function ContactCard({ l, v, href, icon, color }: {
  l: string; v: string; href: string;
  icon: React.ReactNode; color: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "14px 18px",
        borderRadius: 14,
        border: `1.5px solid ${hov ? color + "33" : "var(--gray-200)"}`,
        background: hov ? color + "08" : "transparent",
        textDecoration: "none",
        transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hov ? "translateX(6px)" : "translateX(0)",
        cursor: "pointer",
      }}
    >
      {/* Icon circle */}
      <span style={{
        width: 44, height: 44, borderRadius: "50%",
        background: hov ? color : "var(--gray-100)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? "#fff" : "var(--gray-500)",
        flexShrink: 0,
        transition: "background 0.25s, color 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hov ? "scale(1.12) rotate(-8deg)" : "scale(1) rotate(0deg)",
      }}>
        {icon}
      </span>
      {/* Text */}
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)" }}>{l}</span>
        <span style={{ fontSize: 15, fontWeight: 500, color: hov ? color : "var(--black)", transition: "color 0.2s" }}>{v}</span>
      </span>
      {/* Arrow */}
      <span style={{
        marginLeft: "auto",
        opacity: hov ? 1 : 0,
        transform: hov ? "translateX(0)" : "translateX(-6px)",
        transition: "all 0.25s ease",
        color: color,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </a>
  );
}

const SERVICES = [
  "Brand & Identity",
  "Website & SEO",
  "Content Marketing",
  "Paid Advertising",
  "Lead Generation",
  "Not sure yet",
];

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", services: [] as string[], message: "" });

  const toggleService = (s: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter(x => x !== s)
        : [...prev.services, s],
    }));
  };
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const inputStyle = (id: string): React.CSSProperties => ({
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1.5px solid ${focused === id ? "var(--black)" : "var(--gray-200)"}`,
    outline: "none", padding: "12px 0", fontSize: 16, fontWeight: 400,
    color: "var(--black)", fontFamily: "var(--font-sans)",
    transition: "border-color 0.2s", display: "block",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="resp-section" style={{ background: "var(--white)", borderTop: "1px solid var(--gray-200)" }}>
      <div className="resp-container" style={{ position: "relative" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20" style={{ alignItems: "start" }}>

          {/* Left */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 24 }}>Contact</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 110px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, color: "var(--black)", marginBottom: 56 }}>
              {"Let's grow"}<br />together.
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
              {[
                {
                  l: "Email", v: "bigonecomarketing", href: "mailto:bigonecomarketing@gmail.com",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="3"/>
                      <path d="m2 7 10 7 10-7"/>
                    </svg>
                  ),
                  color: "#0a0a0c",
                },
                {
                  l: "Telegram", v: "bigone_co", href: "https://t.me/bigone_co",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M21.8 2.2 2.4 9.9c-1.3.5-1.3 1.3-.2 1.6l4.9 1.5 1.9 5.8c.2.7.4.9 1 .9.4 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.8L22.9 3.2c.3-1.3-.5-1.8-1.1-1z" fill="currentColor"/>
                    </svg>
                  ),
                  color: "#0a0a0c",
                },
                {
                  l: "Instagram", v: "bigone.co", href: "https://www.instagram.com/bigone.co/",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4.5"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                  color: "#0a0a0c",
                },
                {
                  l: "Phone", v: "+998 94 063 08 80", href: "tel:+998940630880",
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 4.2 2 2 0 0 1 5.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L9.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9z"/>
                    </svg>
                  ),
                  color: "#0a0a0c",
                },
              ].map(c => (
                <ContactCard key={c.l} {...c} />
              ))}
            </div>


          </div>

          {/* Right — form */}
          <div>
            {!sent ? (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", display: "block", marginBottom: 8 }}>Your Name</label>
                  <input type="text" required placeholder="" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                    style={inputStyle("name")} />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", display: "block", marginBottom: 8 }}>Email Address</label>
                  <input type="email" required placeholder="" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                    style={inputStyle("email")} />
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", display: "block", marginBottom: 12 }}>I Need Help With</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {SERVICES.map(s => {
                      const active = form.services.includes(s);
                      return (
                        <button key={s} type="button" onClick={() => toggleService(s)}
                          className="service-tag"
                          style={{
                            padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                            cursor: "pointer", transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                            border: `1.5px solid ${active ? "var(--black)" : "var(--gray-200)"}`,
                            background: active ? "var(--black)" : "transparent",
                            color: active ? "var(--white)" : "var(--gray-600)",
                            transform: active ? "scale(1.07)" : "scale(1)",
                          }}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea required rows={4} placeholder="Tell us about your business and what you need..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), resize: "none", lineHeight: 1.7 }} />
                </div>

                {error && <p style={{ fontSize: 14, color: "#dc2626" }}>{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="send-msg-btn"
                  onMouseEnter={e => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 20px 50px rgba(0,0,0,0.32)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(0,0,0,0.18)";
                  }}
                  style={{
                    alignSelf: "flex-start",
                    display: "flex", alignItems: "center", gap: 18,
                    padding: "10px 10px 10px 30px",
                    background: "#000",
                    border: "none",
                    borderRadius: 9999,
                    cursor: loading ? "default" : "pointer",
                    opacity: loading ? 0.75 : 1,
                    boxShadow: "0 6px 28px rgba(0,0,0,0.18)",
                    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, opacity 0.2s",
                  }}
                >
                  <span style={{
                    fontSize: 16, fontWeight: 600, color: "#fff",
                    letterSpacing: "-0.01em", whiteSpace: "nowrap",
                  }}>
                    {loading ? "Sending…" : "Send message"}
                  </span>

                  <span style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    {loading ? (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ animation: "spin 0.8s linear infinite", transformOrigin: "center" }}>
                        <circle cx="9" cy="9" r="7" stroke="#000" strokeWidth="2" strokeDasharray="22" strokeDashoffset="8" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4 9h10M10 5l4 4-4 4" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              <div style={{ paddingTop: 48 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--black)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  <span style={{ color: "var(--white)", fontSize: 20 }}>✓</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--black)", marginBottom: 12 }}>Message received.</h3>
                <p style={{ fontSize: 15, color: "var(--gray-500)" }}>{"We'll be in touch within 48 hours."}</p>
              </div>
            )}
          </div>
        </div>


      </div>
    </section>
  );
}
