"use client";
import { useEffect, useState } from "react";

function getScrollY(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function useScroll(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(getScrollY() > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);
  return scrolled;
}
