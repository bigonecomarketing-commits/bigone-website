"use client";
import { cn } from "@/lib/utils";

type RipplePulseLoaderProps = {
  className?: string;
  color?: string;
};

export const RipplePulseLoader = ({ className, color = "#0A0A0A" }: RipplePulseLoaderProps) => {
  return (
    <div
      className={cn("rpl-loader", className)}
      style={{ "--logo-color": color } as React.CSSProperties}
    >
      {/* Box 1 — center, contains B.O text */}
      <div className="rpl-box">
        <div className="rpl-logo">
          <span className="rpl-text">B.O</span>
        </div>
      </div>

      {/* Boxes 2–5 — surrounding pulsing dots */}
      <div className="rpl-box" />
      <div className="rpl-box" />
      <div className="rpl-box" />
      <div className="rpl-box" />
    </div>
  );
};

export default RipplePulseLoader;
