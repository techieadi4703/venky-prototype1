"use client";

import { useState } from "react";
import { GridOverlay } from "@/components/grid-overlay";
import { HeroHeadline } from "@/components/hero-headline";
import { PaperConveyor } from "@/components/paper-conveyor";
import { CtaButton } from "@/components/cta-button";
import { WhyChooseUs } from "@/components/why-choose-us";
import { WorkPreviewStrip } from "@/components/work-preview-strip";
import { OurServices } from "@/components/our-services";
import { OurProcess } from "@/components/our-process";

export default function Home() {
  const [gridDrawn, setGridDrawn] = useState(false);

  return (
    <div className="relative w-full flex flex-col overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[720px] h-screen w-full flex flex-col pt-24">
        {/* 1. Background Grid draws in first */}
        <GridOverlay onComplete={() => setGridDrawn(true)} />

        {/* 2. Headline sequence waits for GridOverlay to finish (gridDrawn) */}
        <HeroHeadline isReady={gridDrawn} />
        
        {/* 3. CTA Button fades in after headline */}
        <CtaButton isReady={gridDrawn} />

        {/* 4. Ambient continuous printer ribbon loops */}
        <PaperConveyor speed={8} />
      </section>

      {/* --- PHASE 2 SECTIONS --- */}
      <WhyChooseUs />
      <WorkPreviewStrip />
      <OurServices />
      <OurProcess />
    </div>
  );
}
