"use client";

import { HeroScrub } from "@/components/ui/hero-scrub";

export default function HeroScrubSection() {
  return (
    <HeroScrub
      frameCount={300}
      frameUrl={(i) =>
        `/frames/peterbilt-black/${String(i + 1).padStart(4, "0")}.webp`
      }
      titleTop="BLACK"
      titleBottom="PETERBILT"
      accentHex="#3a9b8a"
    />
  );
}
