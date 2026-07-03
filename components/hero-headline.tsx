"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MO_CONFIG, isReducedMotion } from "@/lib/motion";

export function HeroHeadline({ isReady }: { isReady: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const strips = containerRef.current.querySelectorAll(".headline-strip-inner");
    const subhead = containerRef.current.querySelector(".subhead-fade");

    if (isReducedMotion()) {
      gsap.set(strips, { yPercent: 0 });
      gsap.set(subhead, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(strips, { yPercent: 100 });
    gsap.set(subhead, { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline();
    tl.to(strips, {
      yPercent: 0,
      duration: 1.2,
      ease: MO_CONFIG.ease.heavy,
      stagger: 0.1,
    })
    .to(subhead, {
      autoAlpha: 1,
      y: 0,
      duration: MO_CONFIG.duration.step,
      ease: MO_CONFIG.ease.primary,
    }, "-=0.6");

  }, [isReady]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute top-[18%] left-[42%] z-10 flex flex-col items-start"
    >
      <div className="relative flex items-center font-bebas text-bone overflow-hidden">
        {/* The large '30' */}
        <div className="overflow-hidden">
          <div className="headline-strip-inner text-accent text-[7rem] md:text-[11rem] leading-[0.85] pr-3 tracking-tighter">
            30
          </div>
        </div>
        
        {/* 'YEARS EXPERTS' stacked */}
        <div className="flex flex-col justify-center">
          <div className="overflow-hidden">
            <div className="headline-strip-inner text-[2.5rem] md:text-[4rem] leading-[0.85] tracking-wider">
              YEARS
            </div>
          </div>
          <div className="overflow-hidden mt-1">
            <div className="headline-strip-inner text-[2.5rem] md:text-[4rem] leading-[0.85] tracking-wider">
              EXPERTS
            </div>
          </div>
        </div>
      </div>

      <div className="subhead-fade mt-4 font-bebas text-bone text-lg md:text-xl tracking-[0.2em] uppercase">
        Flawless retouch to print
      </div>
    </div>
  );
}
