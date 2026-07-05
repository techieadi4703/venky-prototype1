"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MO_CONFIG, isReducedMotion } from "@/lib/motion";

export function CtaButton({ isReady }: { isReady: boolean }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const arrowContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady || !buttonRef.current) return;

    if (isReducedMotion()) {
      gsap.set(buttonRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(buttonRef.current, { autoAlpha: 0, y: 20 });
    gsap.to(buttonRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: MO_CONFIG.duration.step,
      ease: MO_CONFIG.ease.primary,
      delay: 1.2, // waits for headline
    });
  }, [isReady]);

  const handleMouseEnter = () => {
    if (isReducedMotion() || !arrowContainerRef.current) return;
    const restArrow = arrowContainerRef.current.querySelector(".arrow-rest");
    const hoverArrow = arrowContainerRef.current.querySelector(".arrow-hover");

    gsap.to(restArrow, {
      x: -10, y: 10, autoAlpha: 0, duration: 0.25, ease: "power2.out"
    });
    gsap.fromTo(hoverArrow,
      { x: -10, y: 10, autoAlpha: 0, rotate: -45 },
      { x: 0, y: 0, autoAlpha: 1, rotate: 0, duration: 0.25, ease: "power2.out" }
    );
  };

  const handleMouseLeave = () => {
    if (isReducedMotion() || !arrowContainerRef.current) return;
    const restArrow = arrowContainerRef.current.querySelector(".arrow-rest");
    const hoverArrow = arrowContainerRef.current.querySelector(".arrow-hover");

    gsap.to(hoverArrow, {
      x: 10, y: -10, autoAlpha: 0, duration: 0.25, ease: "power2.out"
    });
    gsap.fromTo(restArrow,
      { x: 10, y: -10, autoAlpha: 0 },
      { x: 0, y: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out" }
    );
  };

  const handleClick = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { scale: 0.95, duration: 0.15, yoyo: true, repeat: 1 });
  };

  return (
    <div
      className="absolute z-10 flex items-start justify-center pointer-events-none pt-1 md:pt-2"
      style={{ left: '52%', width: '22%', top: '43%', height: '12%' }}
    >
      <Link
        href="/contact"
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="w-[90%] h-[75%] bg-accent text-ink font-bebas text-3xl md:text-[2.75rem] uppercase py-2 px-6 flex items-center justify-between transition-colors hover:bg-[#6b8b9a] focus-visible:outline-2 focus-visible:outline-bone focus-visible:outline-offset-4 pointer-events-auto"
      >
        <span className="tracking-normal font-extrabold w-full text-center">GET STARTED</span>
        <div ref={arrowContainerRef} className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden flex items-center justify-center">
          {/* Default state: down-right */}
          <svg className="arrow-rest absolute w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
            <path d="M7 7l10 10M17 7v10H7" />
          </svg>

          {/* Hover state: up-right */}
          <svg className="arrow-hover absolute opacity-0 w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
