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
        <g stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.25">
          {/* === VERTICAL LINES (paired as thin columns) === */}
          
          {/* Col 1 — left of logo area (~15%) */}
          <line x1="15%" y1="0" x2="15%" y2="100%" />
          <line x1="16%" y1="0" x2="16%" y2="100%" />
          
          {/* Col 2 — between logo and content (~40%) */}
          <line x1="40%" y1="0" x2="40%" y2="100%" />
          <line x1="41%" y1="0" x2="41%" y2="100%" />
          
          {/* Col 3 — right of content block (~72%) */}
          <line x1="72%" y1="0" x2="72%" y2="100%" />
          <line x1="73%" y1="0" x2="73%" y2="100%" />
          
          {/* Col 4 — right side, near printer (~90%) */}
          <line x1="90%" y1="0" x2="90%" y2="100%" />
          <line x1="91%" y1="0" x2="91%" y2="100%" />

          {/* === HORIZONTAL LINES (paired as thin rows) === */}
          
          {/* Row 1 — below header / above "30" (~15%) */}
          <line x1="0" y1="15%" x2="100%" y2="15%" />
          <line x1="0" y1="16%" x2="100%" y2="16%" />

          {/* Row 2 — below "FLAWLESS..." / above "GET STARTED" (~46%) */}
          <line x1="0" y1="46%" x2="100%" y2="46%" />
          <line x1="0" y1="47%" x2="100%" y2="47%" />

          {/* Row 3 — below CTA / through printer area (~62%) */}
          <line x1="0" y1="62%" x2="100%" y2="62%" />
          <line x1="0" y1="63%" x2="100%" y2="63%" />
        </g>
      </svg>
    </div>
  );
}
