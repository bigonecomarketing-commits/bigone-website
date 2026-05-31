"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { Layers, Building2, Users, Mail, ArrowRight, Home } from "lucide-react";

const scrollTo = (id: string) =>
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });

const NAV_ITEMS = [
  { id: "home",     icon: <Home      size={14} />, label: "Home",     onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { id: "services", icon: <Layers    size={14} />, label: "Services", onClick: () => scrollTo("services")  },
  { id: "clients",  icon: <Building2 size={14} />, label: "Clients",  onClick: () => scrollTo("clients")   },
  { id: "team",     icon: <Users     size={14} />, label: "Team",     onClick: () => scrollTo("team")      },
  { id: "contact",  icon: <Mail      size={14} />, label: "Contact",  onClick: () => scrollTo("contact")   },
];

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(80);
  const [compact, setCompact] = React.useState(true);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!headerRef.current) return;
    const ro = new ResizeObserver(entries => {
      setCompact(entries[0].contentRect.width < 768);
    });
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, []);

  // Detect if current scroll position is over a dark section (hero)
  const [isDark, setIsDark] = React.useState(true);

  React.useEffect(() => {
    const getY = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const update = () => {
      const heroHeight = window.innerHeight * 0.9;
      setIsDark(getY() < heroHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    document.body.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      document.body.removeEventListener("scroll", update);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const textColor = scrolled && !isDark ? "#0a0a0c" : "#ffffff";
  const mutedColor = scrolled && !isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)";

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
        scrolled && !open ? "top-4 px-4" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between transition-all duration-500 ease-out",
          scrolled && !open
            ? isDark
              ? "max-w-[920px] rounded-2xl border border-white/20 bg-white/10 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl h-[48px]"
              : "max-w-[920px] rounded-2xl border border-black/10 bg-black/8 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl h-[48px]"
            : "max-w-7xl bg-transparent px-6 lg:px-8",
        )}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 20, letterSpacing: "-0.04em",
            color: textColor,
            transition: "color 0.3s",
          }}
        >
          BigOne<span style={{ color: mutedColor, transition: "color 0.3s" }}>.</span>
        </button>

        {/* LimelightNav — all sizes (icons only on mobile) */}
        <div className="flex">
          <LimelightNav
            items={compact ? NAV_ITEMS.map(({ label, ...rest }) => ({ ...rest })) : NAV_ITEMS}
            defaultActiveIndex={0}
            isDark={!scrolled || isDark}
            compact={compact}
            className={
              !scrolled || isDark
                ? "bg-white/5 backdrop-blur-xl border border-white/10"
                : "bg-black/5 backdrop-blur-xl border border-black/8"
            }
          />
        </div>

        {/* CTA — desktop only */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:flex items-center gap-2"
          style={{
            background: textColor, color: scrolled && !isDark ? "#fff" : "#000",
            border: "none", cursor: "pointer",
            borderRadius: 9999, padding: "9px 20px",
            fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em",
            transition: "opacity 0.2s, background 0.3s, color 0.3s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Get in touch
          <ArrowRight size={13} />
        </button>

        {/* Spacer for mobile burger (keeps pill layout balanced) */}
        <div className="md:hidden" style={{ width: 30 }} />
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-0 flex-col overflow-hidden md:hidden",
          open ? "flex" : "hidden",
        )}
        style={{ background: "rgba(10,10,12,0.97)", backdropFilter: "blur(20px)", zIndex: 55 }}
      >
        <div className="flex h-full flex-col justify-between p-6">
          {/* Spacer for the fixed toggle button */}
          <div style={{ height: 56 }} />
          <div style={{ display: "grid", gap: 4 }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => { setOpen(false); item.onClick?.(); }} style={{
                display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left",
                background: "none", border: "none", cursor: "pointer",
                padding: "14px 8px", fontSize: 22, fontWeight: 600,
                fontFamily: "var(--font-display)", letterSpacing: "-0.03em",
                color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                <span style={{ opacity: 0.5 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <button onClick={() => { setOpen(false); scrollTo("contact"); }} style={{
            width: "100%", padding: 16,
            background: "#fff", color: "#000",
            border: "none", cursor: "pointer", fontSize: 16, fontWeight: 600,
            borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            Get in touch
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile burger — outside header so backdrop-filter doesn't break fixed positioning */}
    <button
      onClick={() => setOpen(!open)}
      className="md:hidden"
      style={{
        position: "fixed", top: 24, right: 20, zIndex: 60,
        background: "none", border: "none",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 4,
      }}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <MenuToggleIcon
        open={open} duration={400}
        style={{ width: 22, height: 22, color: open ? "#fff" : textColor, transition: "color 0.3s" }}
      />
    </button>
    </>
  );
}
