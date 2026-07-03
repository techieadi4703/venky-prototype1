"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export function Paper({
  onExit,
  index,
}: {
  onExit: () => void;
  index: number;
}) {
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paperRef.current) return;

    // Register plugin (safe to do multiple times)
    gsap.registerPlugin(MotionPathPlugin);

    const tl = gsap.timeline({
      onComplete: onExit,
    });

    // We use a fixed width=500px, height=120px paper.
    // The direction of motion is leftward. GSAP autoRotate aligns the right edge (+X) forward by default.
    // We add 180 offset so the left edge is forward.
    // alignOrigin: [1, 0.5] aligns the trailing edge (right side) to the path coordinate.
    
    // 1. Initial State: Set on the motion path at progress 0, but clipped so it's invisible.
    gsap.set(paperRef.current, {
      motionPath: {
        path: "#paperPath",
        align: "#paperPath",
        alignOrigin: [1, 0.5], 
        autoRotate: 180, // Offset so the left side leads
        start: 0,
        end: 0,
      },
      // inset(top right bottom left) -> inset(0 0 0 100%) hides everything except the right edge.
      clipPath: "inset(0 0 0 100%)",
      opacity: 1,
    });

    // 2. Phase 1: Grow vertically out of the printer (0.6s)
    // The paper stays at progress 0 (which is the vertical drop).
    // The clip-path animates to 0%, revealing the paper from the trailing edge down to the leading edge.
    tl.to(paperRef.current, {
      clipPath: "inset(0 0 0 0%)",
      duration: 0.6,
      ease: "power2.out",
    });

    // 3. Phase 2: Follow the S-curve track
    // Glides seamlessly along the SVG path we defined in PaperManager.
    tl.to(paperRef.current, {
      motionPath: {
        path: "#paperPath",
        align: "#paperPath",
        alignOrigin: [1, 0.5],
        autoRotate: 180,
        start: 0,
        end: 1, // Full path
      },
      duration: 8.0,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, [onExit]);

  return (
    <div
      ref={paperRef}
      className="absolute w-[500px] h-[120px] pointer-events-none"
      style={{
        zIndex: 100 - (index % 100), // Newer papers spawn underneath older ones
      }}
    >
      {/* 
        The paper uses SVG for crisp, premium rendering with subtle perspective/shadows.
      */}
      <svg
        viewBox="0 0 500 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
        preserveAspectRatio="none"
      >
        {/* Base paper */}
        <path
          d="M 10 0 L 490 0 C 495 0 500 5 500 10 L 500 110 C 500 115 495 120 490 120 L 10 120 C 5 120 0 115 0 110 L 0 10 C 0 5 5 0 10 0 Z"
          fill="var(--color-rose)"
        />
        {/* Subtle shading to fake 3D volume */}
        <path
          d="M 10 0 L 490 0 C 495 0 500 5 500 10 L 500 110 C 500 115 495 120 490 120 L 10 120 C 5 120 0 115 0 110 L 0 10 C 0 5 5 0 10 0 Z"
          fill="url(#premium-shading)"
          opacity="0.35"
        />
        {/* Subtle left-edge curl highlight */}
        <path
          d="M 0 10 L 20 10 L 20 110 L 0 110 Z"
          fill="rgba(255,255,255,0.15)"
        />

        <defs>
          <linearGradient id="premium-shading" x1="0" y1="0" x2="500" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="black" stopOpacity="0.5" />
            <stop offset="0.3" stopColor="white" stopOpacity="0.1" />
            <stop offset="0.7" stopColor="black" stopOpacity="0.1" />
            <stop offset="1" stopColor="black" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
