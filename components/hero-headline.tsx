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
      className="absolute z-10 flex flex-col justify-center pl-[2%]"
      style={{ left: '52%', width: '22%', top: '35%', height: '15%' }}
    >
      <div className="relative flex items-center font-bebas text-bone">
        {/* The large '30' */}
        <div>
          <div className="headline-strip-inner text-accent text-[7rem] md:text-[11rem] leading-none pr-3 tracking-tighter">
            30
          </div>
        </div>
        
        {/* 'YEARS EXPERTS' stacked */}
        <div className="flex flex-col justify-center">
          <div>
            <div className="headline-strip-inner text-[2.5rem] md:text-[4rem] leading-none tracking-wider">
              YEARS
            </div>
          </div>
          <div>
            <div className="headline-strip-inner text-[2.5rem] md:text-[4rem] leading-none tracking-wider mt-1">
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
