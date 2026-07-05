"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MO_CONFIG, isReducedMotion } from "@/lib/motion";

export function GridOverlay({ onComplete }: { onComplete?: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const verticalLines = ["16%", "52%", "74%", "96%"];

  // H-lines (in %)
  const h1 = 15; // Below Header
  const h3 = 41; // Below Headline, Above CTA
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
          {/* === VERTICAL LINES === */}
          {verticalLines.map((v, i) => {
            if (i === verticalLines.length - 1) {
              return (
                <g key={`v-${i}`}>
                  <line x1={v} y1="0" x2={v} y2="100%" />
                </g>
              );
            }
            return (
              <g key={`v-${i}`}>
                <line x1={`calc(${v} - 5px)`} y1="0" x2={`calc(${v} - 5px)`} y2="100%" />
                <line x1={`calc(${v} + 5px)`} y1="0" x2={`calc(${v} + 5px)`} y2="100%" />
              </g>
            );
          })}

          {/* === HORIZONTAL LINES (Double lines with 10px gap) === */}
          <g key="h-h3">
            <line x1="0" y1={`calc(${h3}% - 5px)`} x2="74%" y2={`calc(${h3}% - 5px)`} />
            <line x1="0" y1={`calc(${h3}% + 5px)`} x2="74%" y2={`calc(${h3}% + 5px)`} />
          </g>
          <g key="h-h4">
            <line x1="74%" y1={`calc(${h4}% - 5px)`} x2="100%" y2={`calc(${h4}% - 5px)`} />
            <line x1="74%" y1={`calc(${h4}% + 5px)`} x2="100%" y2={`calc(${h4}% + 5px)`} />
          </g>
          <g key="h-h5">
            <line x1="0" y1={`calc(${h5}% - 5px)`} x2="100%" y2={`calc(${h5}% - 5px)`} />
            <line x1="0" y1={`calc(${h5}% + 5px)`} x2="100%" y2={`calc(${h5}% + 5px)`} />
          </g>
        </g>
      </svg>
    </div>
  );
}
