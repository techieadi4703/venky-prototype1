"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MO_CONFIG, isReducedMotion } from "@/lib/motion";

export function GridOverlay({ onComplete }: { onComplete?: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const verticalLines = ["16%", "52%", "74%", "85%", "96%"];

  // H-lines (in %)
  const h1 = 12; // Below Header
  const h2 = 32; // Above Headline
  const h3 = 54; // Below Headline, Above CTA
  const h4 = 66; // Below CTA
  const h5 = 85; // Bottom

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
        {/* Use the exact color from the screenshot: #506E7B (accent) but with high opacity to match */}
        <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.6">
          {/* === VERTICAL LINES (Double lines with 6px gap) === */}
          {verticalLines.map((v, i) => (
            <g key={`v-${i}`}>
              <line x1={`calc(${v} - 3px)`} y1="0" x2={`calc(${v} - 3px)`} y2="100%" />
              <line x1={`calc(${v} + 3px)`} y1="0" x2={`calc(${v} + 3px)`} y2="100%" />
            </g>
          ))}

          {/* === HORIZONTAL LINES (Double lines with 6px gap) === */}
          {[h1, h2, h3, h4, h5].map((h, i) => (
            <g key={`h-${i}`}>
              <line x1="0" y1={`calc(${h}% - 3px)`} x2="100%" y2={`calc(${h}% - 3px)`} />
              <line x1="0" y1={`calc(${h}% + 3px)`} x2="100%" y2={`calc(${h}% + 3px)`} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
