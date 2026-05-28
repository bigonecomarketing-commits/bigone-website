"use client";
import React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  variant?: "indigo" | "dark" | "light";
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  icon,
  title,
  subtitle,
  size = "md",
  variant = "indigo",
  className = "",
  ...props
}) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "10px 16px", borderRadius: 12 },
    md: { padding: "14px 20px", borderRadius: 16 },
    lg: { padding: "18px 24px", borderRadius: 20 },
  };

  const variants: Record<string, { border: string; bg: string; shimmer: string; glow: string }> = {
    indigo: {
      border: "rgba(99,102,241,0.5)",
      bg: "linear-gradient(135deg, rgba(99,102,241,0.35) 0%, rgba(79,70,229,0.25) 50%, rgba(99,102,241,0.45) 100%)",
      shimmer: "rgba(165,180,252,0.35)",
      glow: "rgba(99,102,241,0.25)",
    },
    dark: {
      border: "rgba(255,255,255,0.12)",
      bg: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)",
      shimmer: "rgba(255,255,255,0.12)",
      glow: "rgba(255,255,255,0.08)",
    },
    light: {
      border: "rgba(0,0,0,0.12)",
      bg: "linear-gradient(135deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.06) 100%)",
      shimmer: "rgba(0,0,0,0.06)",
      glow: "rgba(0,0,0,0.04)",
    },
  };

  const v = variants[variant];

  const iconEl = React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
    style: { width: size === "sm" ? 16 : size === "md" ? 20 : 24, height: size === "sm" ? 16 : size === "md" ? 20 : 24 },
  });

  return (
    <button
      {...props}
      className={`gradient-btn group relative overflow-hidden cursor-pointer transition-all duration-500 ease-out ${className}`}
      style={{
        ...sizeStyles[size],
        border: `1.5px solid ${v.border}`,
        background: v.bg,
        display: "flex",
        alignItems: "center",
        gap: size === "sm" ? 10 : 14,
        boxShadow: "none",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        ...(props.style ?? {}),
      }}
    >
      {/* Shimmer sweep */}
      <span
        className="gradient-btn-shimmer"
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(105deg, transparent 30%, ${v.shimmer} 50%, transparent 70%)`,
          transform: "translateX(-100%)",
          transition: "transform 0.8s ease",
          pointerEvents: "none",
        }}
      />

      {/* Glow overlay */}
      <span
        className="gradient-btn-glow"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, ${v.glow} 0%, transparent 70%)`,
          opacity: 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />

      {/* Icon box */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: size === "sm" ? 6 : 8,
          borderRadius: size === "sm" ? 8 : 10,
          background: variant === "indigo"
            ? "linear-gradient(135deg, rgba(99,102,241,0.5), rgba(79,70,229,0.3))"
            : variant === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.08)",
          backdropFilter: "blur(4px)",
          color: variant === "light" ? "#000" : "#fff",
          transition: "transform 0.3s ease, background 0.3s ease",
          flexShrink: 0,
        }}
        className="gradient-btn-icon"
      >
        {iconEl}
      </span>

      {/* Text */}
      <span style={{ position: "relative", zIndex: 1, flex: 1, textAlign: "left" }}>
        <span
          style={{
            display: "block",
            fontWeight: 700,
            fontSize: size === "sm" ? 14 : size === "md" ? 15 : 17,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: variant === "light" ? "#000" : "#fff",
            transition: "color 0.3s",
          }}
        >
          {title}
        </span>
        {subtitle && (
          <span
            style={{
              display: "block",
              fontSize: size === "sm" ? 11 : 12,
              marginTop: 2,
              color: variant === "light" ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.6)",
              transition: "color 0.3s",
            }}
          >
            {subtitle}
          </span>
        )}
      </span>

      {/* Arrow */}
      <span
        className="gradient-btn-arrow"
        style={{
          position: "relative",
          zIndex: 1,
          opacity: 0.45,
          transition: "opacity 0.3s, transform 0.3s",
          color: variant === "light" ? "#000" : "#fff",
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none"
          style={{ width: size === "sm" ? 14 : 16, height: size === "sm" ? 14 : 16 }}>
          <path d="M9 5l7 7-7 7" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </span>

      <style>{`
        .gradient-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 8px 32px rgba(99,102,241,0.25), 0 2px 8px rgba(0,0,0,0.15) !important; }
        .gradient-btn:active { transform: scale(0.97) !important; }
        .gradient-btn:hover .gradient-btn-shimmer { transform: translateX(100%); }
        .gradient-btn:hover .gradient-btn-glow { opacity: 1; }
        .gradient-btn:hover .gradient-btn-icon { transform: scale(1.1); }
        .gradient-btn:hover .gradient-btn-arrow { opacity: 1; transform: translateX(3px); }
      `}</style>
    </button>
  );
};
