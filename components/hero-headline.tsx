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
      style={{ left: '52%', width: '22%', top: '24%', height: '22%' }}
    >
      <div className="flex flex-col items-start mt-2">
        <div className="relative flex items-stretch font-bebas text-bone w-full justify-start gap-2">
          {/* The large '30' */}
          <div className="overflow-hidden font-anton py-4 -my-4">
            <div className="headline-strip-inner text-accent text-[6rem] md:text-[9rem] leading-[0.8] tracking-tight">
              30
            </div>
          </div>

          {/* 'YEARS EXPERTS' stacked */}
          <div className="flex flex-col justify-between py-1">
            <div className="overflow-hidden">
              <div className="headline-strip-inner text-[2.2rem] md:text-[3.2rem] leading-[0.9] tracking-normal">
                YEARS
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="headline-strip-inner text-[2.2rem] md:text-[3.2rem] leading-[0.9] tracking-normal">
                EXPERTS
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <div className="subhead-fade font-bebas text-[#9eb5c0] text-[1.35em] md:text-[1.8rem] leading-none tracking-normal uppercase w-full">
            Flawless retouch to print
          </div>
        </div>
      </div>
    </div>
  );
}
