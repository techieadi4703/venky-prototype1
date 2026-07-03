"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { isReducedMotion } from "@/lib/motion";
import Image from "next/image";

/*
 * The ribbon is a series of rectangular "pages" positioned along a
 * smooth catenary/U-curve that:
 *   - Exits the printer (right side, ~83% x, ~52% y)
 *   - Swoops down and to the left (bottom center, ~40% x, ~92% y)
 *   - Curves back up steeply on the left (left edge, ~2% x, ~10% y)
 *
 * Each page is a solid rose-colored rectangle with a shadow edge
 * to give 3D overlap depth. Pages continuously emerge from the
 * printer and travel the path.
 */

// Waypoints along the curve (percentage of viewport)
// { x%, y%, rotation°, width, height }
const CURVE_POINTS = [
  // At printer exit — small, nearly flat
  { xPct: 80, yPct: 54, rot: -2, w: 100, h: 70 },
  // Curving down-right
  { xPct: 73, yPct: 62, rot: -18, w: 130, h: 90 },
  // Sweeping down
  { xPct: 62, yPct: 74, rot: -32, w: 160, h: 110 },
  // Near bottom of curve
  { xPct: 48, yPct: 84, rot: -20, w: 180, h: 125 },
  // Bottom center
  { xPct: 36, yPct: 88, rot: -5, w: 190, h: 130 },
  // Starting to rise
  { xPct: 24, yPct: 82, rot: 15, w: 200, h: 138 },
  // Rising steeply on left
  { xPct: 14, yPct: 68, rot: 35, w: 220, h: 150 },
  // Going up left side
  { xPct: 6, yPct: 48, rot: 55, w: 240, h: 165 },
  // Near top-left corner
  { xPct: 0, yPct: 26, rot: 70, w: 260, h: 175 },
  // Off-screen top-left
  { xPct: -5, yPct: 4, rot: 80, w: 280, h: 190 },
];

const TOTAL_PAGES = CURVE_POINTS.length;
const PRINTER_X_PCT = 83;
const PRINTER_Y_PCT = 52;

export function PrinterFeed() {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const queueLines = Array(8).fill("GET YOUR IMAGINATION");

  useEffect(() => {
    if (!ribbonRef.current) return;

    const pages = ribbonRef.current.querySelectorAll<HTMLElement>(".page-card");

    if (isReducedMotion()) {
      // Show all pages at their final positions immediately
      pages.forEach((page, i) => {
        const pt = CURVE_POINTS[i];
        gsap.set(page, {
          left: `${pt.xPct}%`,
          top: `${pt.yPct}%`,
          rotation: pt.rot,
          width: pt.w,
          height: pt.h,
          opacity: 1,
        });
      });
      return;
    }

    // -- ENTRANCE ANIMATION --
    // All pages start stacked at the printer exit, tiny and invisible
    pages.forEach((page) => {
      gsap.set(page, {
        left: `${PRINTER_X_PCT}%`,
        top: `${PRINTER_Y_PCT}%`,
        rotation: -5,
        width: 60,
        height: 42,
        opacity: 0,
        transformOrigin: "center center",
      });
    });

    const masterTl = gsap.timeline({ delay: 1.5 });

    // Each page slides from the printer to its resting position
    pages.forEach((page, i) => {
      const pt = CURVE_POINTS[i];
      masterTl.to(
        page,
        {
          left: `${pt.xPct}%`,
          top: `${pt.yPct}%`,
          rotation: pt.rot,
          width: pt.w,
          height: pt.h,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        i * 0.25 // stagger each page by 0.25s
      );
    });

    // -- CONTINUOUS SUBTLE FLOAT --
    // After entrance, add a gentle breathing animation
    masterTl.call(() => {
      pages.forEach((page, i) => {
        gsap.to(page, {
          y: `+=${2 + Math.random() * 4}`,
          rotation: `+=${0.5 + Math.random()}`,
          duration: 2.5 + Math.random() * 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        });
      });
    });
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* ---- PRINTER BODY ---- */}
      <div className="absolute right-[3%] top-[38%] w-[320px] h-[260px] z-30">
        <Image
          src="/images/printer-nobg.png"
          alt="Printer"
          fill
          sizes="320px"
          style={{ objectFit: "contain" }}
          className="drop-shadow-2xl"
          priority
        />
      </div>

      {/* ---- PAGE ON TOP OF PRINTER with "GET YOUR IMAGINATION" ---- */}
      {/* z-40 = ABOVE the printer (z-30), sits in the rear paper feed tray */}
      <div 
        className="absolute z-40"
        style={{
          right: "4.5%",
          top: "8%",
          width: "270px",
        }}
      >
        <div
          className="w-full px-5 py-5 relative"
          style={{
            backgroundColor: "var(--color-accent)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
          }}
        >
          {queueLines.map((text, i) => (
            <div
              key={i}
              className="font-bebas text-ink tracking-[0.1em] leading-[1.6] text-[1.1rem] font-bold"
              style={{
                opacity: 1 - i * 0.02,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* ---- RIBBON OF PAGES ---- */}
      <div ref={ribbonRef} className="absolute inset-0">
        {CURVE_POINTS.map((pt, i) => (
          <div
            key={i}
            className="page-card absolute"
            style={{
              /* Final positions are set by GSAP; these are fallback */
              left: `${pt.xPct}%`,
              top: `${pt.yPct}%`,
              width: pt.w,
              height: pt.h,
              transform: `rotate(${pt.rot}deg)`,
              zIndex: TOTAL_PAGES - i, // pages near printer are on top
              opacity: 0,
            }}
          >
            {/* Page body */}
            <div className="w-full h-full rounded-[2px] relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, var(--color-rose) 0%, var(--color-rose) 70%, var(--color-rose-shadow) 100%)`,
                boxShadow: "4px 6px 16px rgba(0,0,0,0.45), inset 0 0 20px rgba(0,0,0,0.08)",
              }}
            >
              {/* Subtle paper texture */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
                  backgroundSize: "5px 5px",
                }}
              />
              {/* Light highlight on the top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 10%, rgba(234,236,230,0.15) 50%, transparent 90%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
