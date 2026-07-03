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
      gsap.set(strips, { y: 0, autoAlpha: 1 });
      gsap.set(subhead, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(strips, { y: 60, autoAlpha: 0 });
    gsap.set(subhead, { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline();
    tl.to(strips, {
      y: 0,
      autoAlpha: 1,
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
      className="absolute z-10 flex flex-col items-start justify-start pointer-events-none pl-6 -mt-6 md:-mt-10"
      style={{ left: '52%', width: '22%', top: '32%', height: '22%' }}
    >
      <div className="flex flex-col items-start">
        <div className="relative flex items-center font-bebas text-bone w-full justify-start gap-3">
          {/* The large '30' */}
          <div className="overflow-hidden font-anton">
            <div className="headline-strip-inner text-accent text-[6rem] md:text-[9rem] leading-[0.8] tracking-tight">
              30
            </div>
          </div>
          
          {/* 'YEARS EXPERTS' stacked */}
          <div className="flex flex-col justify-center gap-0">
            <div className="overflow-hidden">
              <div className="headline-strip-inner text-[2.2rem] md:text-[3.2rem] leading-[0.9] tracking-wider">
                YEARS
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="headline-strip-inner text-[2.2rem] md:text-[3.2rem] leading-[0.9] tracking-wider">
                EXPERTS
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden w-full mt-2">
          <div className="subhead-fade font-bebas text-accent text-[1.1rem] md:text-[1.4rem] leading-none tracking-[0.08em] uppercase w-full">
            Flawless retouch to print
          </div>
        </div>
      </div>
    </div>
  );
}
