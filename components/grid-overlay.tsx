"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MO_CONFIG, isReducedMotion } from "@/lib/motion";

export function GridOverlay({ onComplete }: { onComplete?: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const lines = svgRef.current.querySelectorAll("line");
    
    if (isReducedMotion()) {
      gsap.set(lines, { strokeDashoffset: 0 });
      if (onComplete) onComplete();
      return;
    }

    gsap.set(lines, { 
      strokeDasharray: "4000", 
      strokeDashoffset: "4000" 
    });

    gsap.to(lines, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: MO_CONFIG.ease.primary,
      stagger: 0.08,
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  }, [onComplete]);

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0" 
      aria-hidden="true"
    >
      <svg 
        ref={svgRef}
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.4">
          {/* === VERTICAL LINES === */}
          {/* Col 1 — right of Healing Tool (~16%) */}
          <line x1="16%" y1="0" x2="16%" y2="100%" />
          
          {/* Col 2 — left of 30 YEARS block (~52%) */}
          <line x1="52%" y1="0" x2="52%" y2="100%" />
          
          {/* Col 3 — right of GET STARTED button (~75%) */}
          <line x1="75%" y1="0" x2="75%" y2="100%" />
          
          {/* Col 4 — left of CONTACT US, cutting right side of printer (~91%) */}
          <line x1="91%" y1="0" x2="91%" y2="100%" />

          {/* === HORIZONTAL LINES === */}
          {/* Row 1 — below Header / Top Nav (~18%) */}
          <line x1="0" y1="18%" x2="100%" y2="18%" />

          {/* Row 2 — above GET STARTED button (~42%) */}
          <line x1="0" y1="42%" x2="100%" y2="42%" />

          {/* Row 3 — below GET STARTED button, resting line for printer (~53%) */}
          <line x1="0" y1="53%" x2="100%" y2="53%" />
          
          {/* Row 4 — passing through lower section of printer output (~65%) */}
          <line x1="0" y1="65%" x2="100%" y2="65%" />
        </g>
      </svg>
    </div>
  );
}
