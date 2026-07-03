"use client";

import { useState } from "react";
import { GridOverlay } from "@/components/grid-overlay";
import { HeroHeadline } from "@/components/hero-headline";
import { PaperConveyor } from "@/components/paper-conveyor";
import { CtaButton } from "@/components/cta-button";

export default function Home() {
  const [gridDrawn, setGridDrawn] = useState(false);

  return (
    <div className="relative min-h-[720px] h-auto md:h-screen w-full overflow-hidden flex flex-col pt-24 pb-[200px] md:pb-0">
      {/* 1. Background Grid draws in first */}
      <GridOverlay onComplete={() => setGridDrawn(true)} />

      {/* 2. Headline sequence waits for GridOverlay to finish (gridDrawn) */}
      <HeroHeadline isReady={gridDrawn} />
      
      {/* 3. CTA Button fades in after headline */}
      <CtaButton isReady={gridDrawn} />

      {/* 4. Ambient continuous printer ribbon loops */}
      <PaperConveyor speed={8} />
    </div>
  );
}
