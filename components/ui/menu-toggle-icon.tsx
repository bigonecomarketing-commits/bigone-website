"use client";
import React from "react";

interface MenuToggleIconProps extends React.SVGProps<SVGSVGElement> {
  open: boolean;
  duration?: number;
}

export function MenuToggleIcon({ open, duration = 300, className = "", ...props }: MenuToggleIconProps) {
  const t = `transition-all duration-[${duration}ms] ease-in-out`;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <line
        x1="3" y1="6" x2="21" y2="6"
        className={t}
        style={{
          transformOrigin: "center",
          transform: open ? "translateY(6px) rotate(45deg)" : "none",
          transition: `transform ${duration}ms ease-in-out`,
        }}
      />
      <line
        x1="3" y1="12" x2="21" y2="12"
        style={{
          opacity: open ? 0 : 1,
          transition: `opacity ${duration}ms ease-in-out`,
        }}
      />
      <line
        x1="3" y1="18" x2="21" y2="18"
        style={{
          transformOrigin: "center",
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
          transition: `transform ${duration}ms ease-in-out`,
        }}
      />
    </svg>
  );
}
