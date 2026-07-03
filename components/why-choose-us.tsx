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
        { selector: ".parallax-img-1", y: -150, x: -100, rotation: -5 }, // BBQ - up and left, slight rotate
        { selector: ".parallax-img-2", y: -800, x: 50, rotation: 10 },  // Qubz - very fast up and right
        { selector: ".parallax-img-3", y: 300, x: 250, rotation: -15 },  // Sari - down and right
        { selector: ".parallax-img-4", y: -200, x: 150, rotation: 5 },   // Jewelry - up and right
      ];

      parallaxSpeeds.forEach(({ selector, y, x, rotation }) => {
        gsap.to(selector, {
          y: y,
          x: x,
          rotation: rotation,
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
  const H2 = 550;
  const H3 = 850;

  return (
    <section 
      ref={containerRef}
      className="w-full h-[950px] relative bg-ink"
    >
      {/* Grid Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.4">
          {/* Horizontal Lines */}
          <line x1="0" y1={H1 - 2} x2="100%" y2={H1 - 2} />
          <line x1="0" y1={H1 + 2} x2="100%" y2={H1 + 2} />
          
          <line x1="0" y1={H2 - 2} x2="100%" y2={H2 - 2} />
          <line x1="0" y1={H2 + 2} x2="100%" y2={H2 + 2} />

          <line x1="0" y1={H3 - 2} x2="100%" y2={H3 - 2} />
          <line x1="0" y1={H3 + 2} x2="100%" y2={H3 + 2} />

          {/* Vertical Lines (Only draw the last 3, ignoring the left-most margin) */}
          {vLines.slice(1).map((v: string, i: number) => (
            <g key={i}>
              <line x1={`calc(${v} - 2px)`} y1="0" x2={`calc(${v} - 2px)`} y2="100%" />
              <line x1={`calc(${v} + 2px)`} y1="0" x2={`calc(${v} + 2px)`} y2="100%" />
            </g>
          ))}
        </g>
      </svg>

      {/* Content Container */}
      <div className="absolute inset-0 w-full h-full z-10 max-w-[1440px] mx-auto pointer-events-none">
        
        {/* Title */}
        <div 
          className="absolute flex items-center justify-center fade-up pointer-events-auto" 
          style={{ top: 0, height: H1 - 2, left: 0, width: `calc(${vLines[1]} - 2px)` }}
        >
          <h2 className="font-bebas text-bone text-4xl md:text-[3rem] tracking-wide uppercase">
            Why Choose Us
          </h2>
        </div>

        {/* Reasons Row 1 */}
        <div 
          className="absolute flex items-center px-8 lg:px-16 md:pl-[max(6vw,24px)] fade-up pointer-events-auto" 
          style={{ top: H1 + 2, height: H2 - H1 - 4, left: 0, width: `calc(${vLines[1]} - 2px)` }}
        >
          <div className="grid grid-cols-2 gap-x-12 w-full">
            <p className="font-bebas text-[#7C93A3] text-[13px] md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              {reasons[0]}
            </p>
            <p className="font-bebas text-[#7C93A3] text-[13px] md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              {reasons[1]}
            </p>
          </div>
        </div>

        {/* Reasons Row 2 */}
        <div 
          className="absolute flex items-center px-8 lg:px-16 md:pl-[max(6vw,24px)] fade-up pointer-events-auto" 
          style={{ top: H2 + 2, height: H3 - H2 - 4, left: 0, width: `calc(${vLines[1]} - 2px)` }}
        >
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
        {/* BBQ - top left (V2-V3, Above H1) */}
        <div 
          className="absolute fade-up pointer-events-auto parallax-img-1 z-20" 
          style={{ top: H1 - 200, height: 198, left: `calc(${vLines[1]} + 2px)`, width: `calc(${vLines[2]} - ${vLines[1]} - 4px)` }}
        >
          <div className="relative w-full h-full overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="BBQ" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          </div>
        </div>

        {/* Qubz - top right (V3-V4, Above H2) */}
        <div 
          className="absolute fade-up pointer-events-auto parallax-img-2 z-20" 
          style={{ top: H1 - 200, height: H2 - (H1 - 200) - 2, left: `calc(${vLines[2]} + 2px)`, width: `calc(${vLines[3]} - ${vLines[2]} - 4px)` }}
        >
          <div className="relative w-full h-full overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="Qubz" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          </div>
        </div>

        {/* Sari - bottom left (V2-V3, H1 to H3) */}
        <div 
          className="absolute fade-up pointer-events-auto parallax-img-3 z-20" 
          style={{ top: H1 + 2, height: H3 - H1 - 4, left: `calc(${vLines[1]} + 2px)`, width: `calc(${vLines[2]} - ${vLines[1]} - 4px)` }}
        >
          <div className="relative w-full h-full overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="Sari" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          </div>
        </div>

        {/* Jewelry - bottom right (V3-V4, H2 to H3) */}
        <div 
          className="absolute fade-up pointer-events-auto parallax-img-4 z-20" 
          style={{ top: H2 + 2, height: H3 - H2 - 4, left: `calc(${vLines[2]} + 2px)`, width: `calc(${vLines[3]} - ${vLines[2]} - 4px)` }}
        >
          <div className="relative w-full h-full overflow-hidden bg-[#EAECE6]">
             <Image src="/images/hero-ribbon-photo.png" alt="Jewelry" fill className="object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer hover:mix-blend-normal" />
          </div>
        </div>

      </div>
    </section>
  );
}
