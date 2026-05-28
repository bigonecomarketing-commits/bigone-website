"use client";

import React, { useState, useRef, useLayoutEffect, cloneElement } from "react";

type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  isDark?: boolean;
};

export const LimelightNav = ({
  items = [],
  defaultActiveIndex = 0,
  onTabChange,
  className = "",
  isDark = true,
}: LimelightNavProps) => {
  const textColor = isDark ? "#ffffff" : "#0a0a0c";
  const indicatorBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const barColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)";
  const barShadow = isDark ? "0 0 10px 2px rgba(255,255,255,0.4)" : "0 0 10px 2px rgba(0,0,0,0.15)";
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [ready, setReady] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    if (!ready) setTimeout(() => setReady(true), 30);
  }, [activeIndex, ready, items]);

  if (items.length === 0) return null;

  const handleClick = (index: number, cb?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    cb?.();
  };

  return (
    <nav
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 44,
        borderRadius: 9999,
        overflow: "hidden", // keeps glow inside pill
        padding: "0 4px",
      }}
    >
      {/* Sliding background pill (active indicator) */}
      <span
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: indicatorStyle.left + 4,
          width: Math.max(0, indicatorStyle.width - 8),
          borderRadius: 9999,
          background: indicatorBg,
          backdropFilter: "blur(8px)",
          transition: ready
            ? "left 0.35s cubic-bezier(0.34,1.56,0.64,1), width 0.35s cubic-bezier(0.34,1.56,0.64,1)"
            : "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />


      {/* Nav items */}
      {items.map(({ id, icon, label, onClick }, index) => {
        const isActive = activeIndex === index;
        return (
          <button
            key={id}
            ref={(el) => (itemRefs.current[index] = el)}
            onClick={() => handleClick(index, onClick)}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 16px",
              height: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: 9999,
              whiteSpace: "nowrap",
              transition: "opacity 0.2s ease",
              opacity: isActive ? 1 : 0.45,
            }}
          >
            {cloneElement(icon, {
              style: { width: 14, height: 14, flexShrink: 0 },
              className: undefined,
            })}
            {label && (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: textColor,
                  transition: "color 0.3s, font-weight 0.2s, letter-spacing 0.2s",
                  letterSpacing: isActive ? "-0.01em" : "0",
                }}
              >
                {label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
