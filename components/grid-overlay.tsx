"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MO_CONFIG, isReducedMotion } from "@/lib/motion";

export function GridOverlay({ onComplete }: { onComplete?: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [verticalLines, setVerticalLines] = useState([
    "16%", "53%", "74.3%", "91%"
  ]);

  useEffect(() => {
    const updatePositions = () => {
      const navLinks = document.querySelectorAll("header nav.hidden.md\\:flex a");
      if (navLinks.length >= 4) {
        const ww = window.innerWidth;
        setVerticalLines([
          "16%",
          `${(navLinks[0].getBoundingClientRect().left / ww) * 100}%`,
          `${(navLinks[2].getBoundingClientRect().left / ww) * 100}%`,
          `${(navLinks[3].getBoundingClientRect().left / ww) * 100}%`,
        ]);
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    // Initial delay in case fonts/layout shift on load
    const timeout = setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener("resize", updatePositions);
      clearTimeout(timeout);
    };
  }, []);

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
          {/* === VERTICAL LINES (Double lines with 4px gap) === */}
          {/* Col 1 */}
          <line x1={`calc(${verticalLines[0]}% - 2px)`} y1="0" x2={`calc(${verticalLines[0]}% - 2px)`} y2="100%" />
          <line x1={`calc(${verticalLines[0]}% + 2px)`} y1="0" x2={`calc(${verticalLines[0]}% + 2px)`} y2="100%" />
          
          {/* Col 2 (Left of HOME) - Stops at H3 */}
          <line x1={`calc(${verticalLines[1]}% - 2px)`} y1="0" x2={`calc(${verticalLines[1]}% - 2px)`} y2="49.4%" />
          <line x1={`calc(${verticalLines[1]}% + 2px)`} y1="0" x2={`calc(${verticalLines[1]}% + 2px)`} y2="49.4%" />
          
          {/* Col 3 (Left of OUR WORK) - Stops at H3 */}
          <line x1={`calc(${verticalLines[2]}% - 2px)`} y1="0" x2={`calc(${verticalLines[2]}% - 2px)`} y2="49.4%" />
          <line x1={`calc(${verticalLines[2]}% + 2px)`} y1="0" x2={`calc(${verticalLines[2]}% + 2px)`} y2="49.4%" />
          
          {/* Col 4 (Right of CONTACT US) - Stops at H3 */}
          <line x1={`calc(${verticalLines[3]}% - 2px)`} y1="0" x2={`calc(${verticalLines[3]}% - 2px)`} y2="49.4%" />
          <line x1={`calc(${verticalLines[3]}% + 2px)`} y1="0" x2={`calc(${verticalLines[3]}% + 2px)`} y2="49.4%" />

          {/* === HORIZONTAL LINES (Double lines with 4px gap) === */}
          {/* Row 1 (Below Header) */}
          <line x1="0" y1="calc(18.5% - 2px)" x2="100%" y2="calc(18.5% - 2px)" />
          <line x1="0" y1="calc(18.5% + 2px)" x2="100%" y2="calc(18.5% + 2px)" />

          {/* Row 2 (Above CTA) - Ends at V3 (Left of OUR WORK) */}
          <line x1="0" y1="calc(39.4% - 2px)" x2={`calc(${verticalLines[2]}% + 2px)`} y2="calc(39.4% - 2px)" />
          <line x1="0" y1="calc(39.4% + 2px)" x2={`calc(${verticalLines[2]}% + 2px)`} y2="calc(39.4% + 2px)" />

          {/* Row 3 (Below CTA, crossing printer) - Full Width */}
          <line x1="0" y1="calc(49.4% - 2px)" x2="100%" y2="calc(49.4% - 2px)" />
          <line x1="0" y1="calc(49.4% + 2px)" x2="100%" y2="calc(49.4% + 2px)" />
        </g>
      </svg>
    </div>
  );
}
