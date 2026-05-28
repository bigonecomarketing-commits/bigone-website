"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductHighlightCardProps {
  categoryIcon?: React.ReactNode;
  category?: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  imageNode?: React.ReactNode;
  tags?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  ({ className, style, categoryIcon, category, title, description, imageSrc, imageAlt = "", imageNode, tags }, ref) => {

    const mouseX = useMotionValue(175);
    const mouseY = useMotionValue(175);

    const handleMouseMove = (e: React.MouseEvent<Element>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      mouseX.set(175);
      mouseY.set(175);
    };

    const spring = { stiffness: 300, damping: 20 };
    const rotateX = useSpring(useTransform(mouseY, [0, 350], [10, -10]), spring);
    const rotateY = useSpring(useTransform(mouseX, [0, 350], [-10, 10]), spring);

    const glowX  = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY  = useTransform(mouseY, [0, 350], [0, 100]);
    const glowOp = useTransform(mouseX, [0, 350], [0, 0.55]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover="cardHover"
        variants={{ cardHover: { zIndex: 30 } }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", position: "relative", zIndex: 1, ...style }}
        className={cn(
          "relative h-[350px] w-full max-w-[350px] rounded-2xl shadow-xl cursor-default",
          className
        )}
      >
        {/* Inner raised layer — clipped for grid/glow/text */}
        <div style={{
          position: "absolute", inset: 16,
          borderRadius: 12, overflow: "hidden",
          transform: "translateZ(20px)",
          background: "rgba(255,255,255,0.04)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
        }}>
          {/* Grid texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(to right,rgba(128,128,128,0.07) 1px,transparent 1px)," +
              "linear-gradient(to bottom,rgba(128,128,128,0.07) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%,#000 60%,transparent 100%)",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%,#000 60%,transparent 100%)",
          }} />

          {/* Glow */}
          <motion.div style={{
            position: "absolute", inset: -1,
            borderRadius: 12,
            pointerEvents: "none",
            opacity: glowOp,
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(90px at ${x}% ${y}%, rgba(255,255,255,0.22), transparent 65%)`
            ),
          }} />

          {/* Text */}
          <div style={{
            position: "relative", zIndex: 10,
            display: "flex", flexDirection: "column",
            justifyContent: "space-between",
            height: "100%", padding: 24,
          }}>
            {(categoryIcon || category) && (
              <div style={{ display: "flex", alignItems: "center", gap: 7, opacity: 0.75 }}>
                {categoryIcon}
                {category && <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{category}</span>}
              </div>
            )}
            <div>
              <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{title}</h2>
              <p style={{ marginTop: 8, maxWidth: "62%", fontSize: 11, opacity: 0.5, lineHeight: 1.65 }}>{description}</p>
              {tags && tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 14 }}>
                  {tags.map(t => (
                    <span key={t} style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 4, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Icon — outside clip div, floats above card boundary on hover */}
        {(imageNode || imageSrc) && (
          <motion.div
            variants={{
              cardHover: { y: -40, x: 10, scale: 1.18, rotate: 6, zIndex: 40 },
            }}
            transition={{ type: "spring", stiffness: 240, damping: 16 }}
            style={{
              position: "absolute",
              right: -10,
              bottom: -10,
              width: 220,
              height: 220,
              pointerEvents: "none",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.7))",
            }}
          >
            {imageNode ?? (
              <img
                src={imageSrc}
                alt={imageAlt}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
          </motion.div>
        )}
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
