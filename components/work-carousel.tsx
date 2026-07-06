"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "@/components/before-after-slider";

const CASE_STUDIES = [
  {
    id: 1,
    before: "/images/hero-ribbon-photo.png",
    after: "/images/hero-ribbon-photo.png",
    title: "LOREM IPSUM",
    desc: "LOREM IPSUM DOLOR SIT AMET, CONSECTETUER ADIPISCING ELIT, SED DIAM NONUMMY NIBH EUISMOD TINCIDUNT UT LAOREET DOLORE MAGNA ALIQUAM ERAT VOLUTPAT. UT WISI ENIM AD MINIM VENIAM, QUIS NOSTRUD EXERCI TATION ULLAMCORPER SUSCIPIT LOBORTIS NISL UT ALIQUIP EX EA COMMODO CONSEQUAT. DUIS AUTEM VEL EUM IRIURE DOLOR IN HENDRERIT IN VULPUTATE VELIT ESSE MOLESTIE CONSEQUAT, VEL ILLUM DOLORE EU FEUGIAT NULLA FACILISIS AT VERO EROS ET ACCUMSAN ET IUSTO ODIO DIGNISSIM QUI BLANDIT",
  },
  {
    id: 2,
    before: "/images/scooter_vehicle.png",
    after: "/images/scooter_vehicle.png",
    title: "LOREM IPSUM 2",
    desc: "Another example of our high quality retouching work. Bringing out the details and color accuracy to meet the highest industry standards.",
  },
  {
    id: 3,
    before: "/images/watches_product.png",
    after: "/images/watches_product.png",
    title: "LOREM IPSUM 3",
    desc: "Flawless skin retouching and dramatic lighting enhancement to create the perfect studio portrait look for commercial applications.",
  }
];

export function WorkCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CASE_STUDIES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CASE_STUDIES.length - 1 ? prev + 1 : 0));
  };

  const activeStudy = CASE_STUDIES[activeIndex];

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center py-20 md:py-24">
      
      {/* SVG Filter for Distorted Ripple Glass Effect */}
      <svg className="hidden">
        <defs>
          <filter id="glass-ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Background (Glass Texture Effect) */}
      <div 
        className="absolute inset-0 z-0 bg-ink transition-all duration-700"
        style={{
          backgroundImage: `url('${activeStudy.after}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "url(#glass-ripple) blur(15px) contrast(1.3) brightness(0.5)",
          transform: "scale(1.15)", // Prevent edges from showing
        }}
      />
      {/* 50% Black Tint Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0 mix-blend-multiply" />
      <div className="absolute inset-0 backdrop-blur-[40px] z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between">
        
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="w-12 h-24 md:w-16 md:h-32 shrink-0 flex items-center justify-center text-[#B58A59] hover:scale-110 transition-transform focus-visible:outline-accent z-20"
          aria-label="Previous Project"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" className="w-full h-full">
            <path d="M15 4l-10 8 10 8v-16z" />
          </svg>
        </button>

        {/* Carousel Content */}
        <div className="flex-1 max-w-7xl w-full mx-auto flex items-stretch aspect-[4/3] md:aspect-[2.2/1] max-h-[70vh]">
          
          {/* Left Detail Panel */}
          <div className="w-1/4 bg-black/40 border border-white/10 p-8 flex flex-col justify-center relative">
            <div className="flex items-center gap-4 mb-6">
              <h4 className="font-bebas text-bone text-2xl tracking-widest">KNOW MORE</h4>
              <div className="flex-1 h-px bg-bone/30"></div>
            </div>
            
            <p className="font-bebas text-accent text-[11px] leading-[1.6] tracking-widest mb-12 text-balance">
              {activeStudy.desc}
            </p>

            <h3 className="font-bebas text-[#B58A59] text-4xl tracking-widest uppercase">
              {activeStudy.title}
            </h3>
          </div>

          {/* Right Slider Panel */}
          <div className="w-3/4 border border-white/10 border-l-0 bg-ink relative">
            <div className="absolute inset-0">
              <BeforeAfterSlider 
                beforeImage={activeStudy.before} 
                afterImage={activeStudy.after} 
              />
            </div>
          </div>

        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="w-12 h-24 md:w-16 md:h-32 shrink-0 flex items-center justify-center text-[#B58A59] hover:scale-110 transition-transform focus-visible:outline-accent z-20"
          aria-label="Next Project"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" className="w-full h-full">
            <path d="M9 4v16l10-8-10-8z" />
          </svg>
        </button>

      </div>
    </section>
  );
}
