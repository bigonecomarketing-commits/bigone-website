"use client";
import { useEffect, useRef } from "react";

interface GrainDividerProps {
  height?: number;
  /** RGB at the top edge, e.g. [0,0,0] black or [23,23,23] dark-gray */
  from?: [number, number, number];
  /** RGB at the bottom edge, e.g. [255,255,255] white or [23,23,23] dark-gray */
  to?: [number, number, number];
  className?: string;
}

export function GrainDivider({
  height = 300,
  from   = [0, 0, 0],
  to     = [255, 255, 255],
  className,
}: GrainDividerProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = canvas.clientWidth || window.innerWidth;
      const H = height;
      canvas.width  = W;
      canvas.height = H;

      const img = ctx.createImageData(W, H);
      const d   = img.data;

      // 10 % solid edges so the divider blends flush with adjacent sections
      const solidFraction = 0.10;

      for (let y = 0; y < H; y++) {
        const t = y / H; // 0 = top, 1 = bottom

        // Clamp to solid zones, then remap the middle to 0-1
        let adj: number;
        if (t <= solidFraction) {
          adj = 0;
        } else if (t >= 1 - solidFraction) {
          adj = 1;
        } else {
          adj = (t - solidFraction) / (1 - 2 * solidFraction);
        }

        // Smooth-step: eased = 0 → all "from" pixels, eased = 1 → all "to" pixels
        const eased = adj * adj * (3 - 2 * adj);

        for (let x = 0; x < W; x++) {
          // Two noise samples averaged → clustered-particle look
          const threshold = (Math.random() + Math.random()) / 2;

          const rgb = threshold < eased ? to : from;
          const idx = (y * W + x) * 4;
          d[idx]     = rgb[0];
          d[idx + 1] = rgb[1];
          d[idx + 2] = rgb[2];
          d[idx + 3] = 255;
        }
      }

      ctx.putImageData(img, 0, 0);
    };

    draw();

    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [height, from, to]);

  return (
    <canvas
      ref={ref}
      style={{ display: "block", width: "100%", height }}
      className={className}
    />
  );
}
