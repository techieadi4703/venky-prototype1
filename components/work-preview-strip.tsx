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

  useEffect(() => {
    if (!containerRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".scatter-item");
      
      // Each item gets a slightly different parallax speed upwards
      items.forEach((item: any, i) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -200 - (i * 100), // Move upwards at different speeds
          ease: "none",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full h-[800px] relative overflow-hidden bg-ink border-y border-tile-frame/30"
    >
      <div className="absolute inset-0 w-full h-full max-w-[1440px] mx-auto z-10">
        {/* Top Left */}
        <div className="scatter-item absolute top-[20%] left-[20%] w-[20%] aspect-[4/3]">
          <div className="relative w-full h-full border border-tile-frame overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="Work 1" fill className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Top Right */}
        <div className="scatter-item absolute top-[10%] right-[25%] w-[15%] aspect-[3/4]">
          <div className="relative w-full h-full border border-tile-frame overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="Work 2" fill className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Bottom Left */}
        <div className="scatter-item absolute bottom-[15%] left-[30%] w-[12%] aspect-square">
          <div className="relative w-full h-full border border-tile-frame overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="Work 3" fill className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Bottom Right */}
        <div className="scatter-item absolute bottom-[25%] right-[15%] w-[18%] aspect-[4/3]">
          <div className="relative w-full h-full border border-tile-frame overflow-hidden">
             <Image src="/images/hero-ribbon-photo.png" alt="Work 4" fill className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
