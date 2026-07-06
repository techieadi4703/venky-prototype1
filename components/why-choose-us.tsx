"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  "Small-scale pre-press powerhouse in Bengaluru delivering big-league results.",
  "Fast, precise, and affordable print-ready solutions that transform your vision into flawless files.",
  "Personalized single-point support and meticulous attention to detail for every project.",
  "Committed to empowering businesses today while building a lasting legacy of excellence."
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const [vLines] = useState(["16%", "51.8%", "74.1%", "93.3%"]);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Fade up elements
      gsap.from(".fade-up", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Parallax scatter animation for images
      const parallaxSpeeds = [
        { selector: ".parallax-img-1", y: 0, x: -300 }, // Top-left - moves LEFT
        { selector: ".parallax-img-2", y: -500, x: 0 }, // Top-right - moves UP
        { selector: ".parallax-img-3", y: 400, x: 0 },  // Bottom-left - moves DOWN
        { selector: ".parallax-img-4", y: 0, x: 300 },  // Bottom-right - moves RIGHT
      ];

      parallaxSpeeds.forEach(({ selector, y, x }) => {
        gsap.to(selector, {
          y: y,
          x: x,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", // Start parallax when section hits top of viewport
            end: "+=150%", // Continue scrolling for 1.5x screen height
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Grid Horizontal Lines
  const H1 = 300;
  const H2 = 620;
  const H3 = 910;

  return (
    <section 
      ref={containerRef}
      className="w-full h-[1100px] relative bg-ink"
    >
      {/* Grid Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.8">
          {/* Horizontal Lines */}
          <line x1="0" y1={H1 - 5} x2={vLines[3]} y2={H1 - 5} />
          <line x1="0" y1={H1 + 5} x2={vLines[3]} y2={H1 + 5} />
          
          <line x1={`calc(${vLines[1]} + 8px)`} y1={H2 - 5} x2={vLines[3]} y2={H2 - 5} />
          <line x1={`calc(${vLines[1]} + 8px)`} y1={H2 + 5} x2={vLines[3]} y2={H2 + 5} />

          <line x1="0" y1={H3} x2="100%" y2={H3} />

          {/* Vertical Lines (Only draw the last 3, ignoring the left-most margin) */}
          {vLines.slice(1).map((v: string, i: number, arr) => {
            if (i === arr.length - 1) {
              return (
                <g key={i}>
                  <line x1={v} y1="0" x2={v} y2="100%" />
                </g>
              );
            }
            return (
              <g key={i}>
                <line x1={`calc(${v} - 8px)`} y1="0" x2={`calc(${v} - 8px)`} y2="100%" />
                <line x1={`calc(${v} + 8px)`} y1="0" x2={`calc(${v} + 8px)`} y2="100%" />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Content Container */}
      <div className="absolute inset-0 w-full h-full z-10 max-w-[1440px] mx-auto pointer-events-none">
        
        {/* Title */}
        <div 
          className="absolute flex items-end justify-center pb-6 fade-up pointer-events-auto" 
          style={{ top: 0, height: H1 - 5, left: 0, width: `calc(${vLines[1]} - 8px)` }}
        >
          <h2 className="font-bebas text-bone text-4xl md:text-[3rem] tracking-wide uppercase">
            Why Choose Us
          </h2>
        </div>

        {/* Reasons (All 4 paragraphs) */}
        <div 
          className="absolute flex flex-col pt-24 gap-y-16 px-8 lg:px-16 md:pl-[max(6vw,24px)] fade-up pointer-events-auto" 
          style={{ top: H1, left: 0, width: `calc(${vLines[1]} - 8px)` }}
        >
          <div className="grid grid-cols-2 gap-x-12 w-full">
            <p className="font-bebas text-[#7C93A3] text-[13px] md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              {reasons[0]}
            </p>
            <p className="font-bebas text-[#7C93A3] text-[13px] md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              {reasons[1]}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 w-full">
            <p className="font-bebas text-[#7C93A3] text-[13px] md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              {reasons[2]}
            </p>
            <p className="font-bebas text-[#7C93A3] text-[13px] md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              {reasons[3]}
            </p>
          </div>
        </div>

        {/* Images */}
        {/* BBQ - top left (V1-V2) */}
        <div 
          className="absolute fade-up pointer-events-auto z-20" 
          style={{ top: 250, height: 220, left: `calc(${vLines[1]} - 8px)`, width: `calc(${vLines[2]} - ${vLines[1]})` }}
        >
          <div className="parallax-img-1 relative w-full h-full overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="BBQ" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          </div>
        </div>

        {/* Qubz - top right (V2-V3) */}
        <div 
          className="absolute fade-up pointer-events-auto z-20" 
          style={{ top: 250, height: 380, left: `calc(${vLines[2]} + 8px)`, width: `calc(${vLines[3]} - ${vLines[2]} - 8px)` }}
        >
          <div className="parallax-img-2 relative w-full h-full overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="Qubz" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          </div>
        </div>

        {/* Sari - bottom left (V1-V2) */}
        <div 
          className="absolute fade-up pointer-events-auto z-20 overflow-hidden" 
          style={{ top: H1 + 230, height: H3 - (H1 + 230), left: `calc(${vLines[1]} - 8px)`, width: `calc(${vLines[2]} - ${vLines[1]})` }}
        >
          <div className="parallax-img-3 relative w-full overflow-hidden" style={{ height: 280 }}>
             <Image src="/images/woman_saree.png" alt="Sari" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          </div>
        </div>

        {/* Jewelry - bottom right (V2-V3) */}
        <div 
          className="absolute fade-up pointer-events-auto z-20" 
          style={{ top: H2 + 30, height: 180, left: `calc(${vLines[2]} + 8px)`, width: `calc(${vLines[3]} - ${vLines[2]} - 8px)` }}
        >
          <div className="parallax-img-4 relative w-full h-full overflow-hidden bg-[#EAECE6]">
             <Image src="/images/jewelry_necklace.png" alt="Jewelry" fill className="object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:mix-blend-normal" />
          </div>
        </div>

      </div>
    </section>
  );
}
