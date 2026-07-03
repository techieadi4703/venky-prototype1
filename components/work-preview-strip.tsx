"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ROW_1_IMAGES = [1, 2, 3, 4];
const ROW_2_IMAGES = [5, 6, 7, 8];

export function WorkPreviewStrip() {
  const containerRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Scrub animations for parallax effect
      gsap.to(row1Ref.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: "-15%",
        ease: "none",
      });

      gsap.to(row2Ref.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: "5%",
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full py-24 overflow-hidden relative z-10 bg-ink border-y border-tile-frame/30"
    >
      <div className="flex flex-col gap-6 md:gap-10 opacity-90">
        
        {/* Row 1 */}
        <div 
          ref={row1Ref} 
          className="flex gap-6 md:gap-10 w-[150vw] md:w-[120vw] -ml-[10vw]"
        >
          {ROW_1_IMAGES.map((item) => (
            <div 
              key={item} 
              className="relative aspect-[4/3] flex-1 shrink-0 border border-tile-frame overflow-hidden group"
            >
              <Image 
                src="/images/hero-ribbon-photo.png" 
                alt={`Work thumbnail ${item}`}
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-300 ease-out"
              />
            </div>
          ))}
        </div>

        {/* Row 2 (Staggered offset) */}
        <div 
          ref={row2Ref} 
          className="flex gap-6 md:gap-10 w-[150vw] md:w-[120vw] -ml-[25vw]"
        >
          {ROW_2_IMAGES.map((item) => (
            <div 
              key={item} 
              className="relative aspect-[4/3] flex-1 shrink-0 border border-tile-frame overflow-hidden group"
            >
              <Image 
                src="/images/hero-ribbon-photo.png" 
                alt={`Work thumbnail ${item}`}
                fill
                className="object-cover filter grayscale hover:grayscale-0 transition-all duration-300 ease-out"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
