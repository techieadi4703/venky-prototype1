"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame, useReducedMotion } from "motion/react";

/**
 * PrinterPaperFlow
 * ----------------
 * Discrete "fan-fold" prints: a photo emerges at the printer's slot, folds and
 * moves forward, then the next one appears — a continuous loop of overlapping
 * sheets draping from the printer (right) down, across the bottom and up the
 * left edge, exactly like the reference board.
 *
 * How it works:
 *   - A fixed drape PATH is defined (printer slot -> bottom sweep -> up left).
 *   - N sheets ride along that path. Each sheet is a flat rectangle (a printed
 *     photo) placed at its current point on the path, rotated to the path's
 *     tangent and scaled to the local paper width.
 *   - Every frame the sheets advance along the path (arc length). As a sheet
 *     rounds a bend its rotation changes -> it visually FOLDS. Sheets overlap
 *     their neighbours (edge shadow) -> the accordion / stacked look.
 *   - When a sheet reaches the end (off-screen, up the left) it wraps back to
 *     the printer (hidden behind the printer body) -> seamless infinite loop.
 */

// ---- Scene constants (SVG viewBox units) --------------------------------
const VB_W = 1440;
const VB_H = 900;

const PRINTER_ASPECT = 2142 / 2016;
const PRINTER = { w: 306, x: 1088, y: 374 };
const PRINTER_H = PRINTER.w / PRINTER_ASPECT;

// Drape path control points, right (printer slot) -> left/up (off screen).
// { x, y, w } — w is the paper width (grows as it comes toward the viewer).
const CTRL = [
  { x: 1238, y: 604, w: 58 }, // inside the slot
  { x: 1156, y: 660, w: 70 }, // drops faster
  { x: 1026, y: 720, w: 90 }, // steeper drop
  { x: 856, y: 760, w: 120 }, // getting near bottom
  { x: 626, y: 780, w: 160 }, // absolute lowest point
  { x: 376, y: 740, w: 200 }, // starting to go up
  { x: 126, y: 640, w: 250 }, // going up steeply
  { x: -124, y: 480, w: 310 },
  { x: -374, y: 250, w: 380 },
];

// ---- Build an arc-length sampled polyline from the control points -------
const STEPS = 100; // High density to completely eliminate rotation vibration

type Sample = { x: number; y: number; w: number; cum: number; cumU: number };

function buildSamples(pts: typeof CTRL) {
  const clamp = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  const out: Sample[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = clamp(i - 1);
    const p1 = clamp(i);
    const p2 = clamp(i + 1);
    const p3 = clamp(i + 2);
    for (let s = 0; s < STEPS; s++) {
      const t = s / STEPS;
      const t2 = t * t;
      const t3 = t2 * t;
      const cr = (a: number, b: number, c: number, d: number) =>
        0.5 *
        (2 * b +
          (-a + c) * t +
          (2 * a - 5 * b + 4 * c - d) * t2 +
          (-a + 3 * b - 3 * c + d) * t3);
      out.push({
        x: cr(p0.x, p1.x, p2.x, p3.x),
        y: cr(p0.y, p1.y, p2.y, p3.y),
        w: p1.w + (p2.w - p1.w) * t,
        cum: 0,
        cumU: 0,
      });
    }
  }
  const last = pts[pts.length - 1];
  out.push({ x: last.x, y: last.y, w: last.w, cum: 0, cumU: 0 });

  let PATH_LEN = 0;
  for (let i = 1; i < out.length; i++) {
    const ds = Math.hypot(out[i].x - out[i - 1].x, out[i].y - out[i - 1].y);
    (out[i] as any).ds = ds;
    PATH_LEN += ds;
  }

  let cum = 0;
  let cumU = 0;
  for (let i = 1; i < out.length; i++) {
    const ds = (out[i] as any).ds;
    cum += ds;
    const progress = cum / PATH_LEN;
    const rotY = -60 * progress;

    const avgW = (out[i].w + out[i - 1].w) / 2;
    const avgScale = avgW / 150;
    const apparentScale = avgScale * Math.max(0.2, Math.cos((rotY * Math.PI) / 180));

    cumU += ds / apparentScale;

    out[i].cum = cum;
    out[i].cumU = cumU;
  }
  return { samples: out, length: PATH_LEN, lengthU: cumU };
}

const { samples: SAMPLES, length: PATH_LEN, lengthU: PATH_U_LEN } = buildSamples(CTRL);

function pointAt(u: number) {
  const sm = ((u % PATH_U_LEN) + PATH_U_LEN) % PATH_U_LEN;
  let i = 1;
  while (i < SAMPLES.length - 1 && SAMPLES[i].cumU < sm) i++;
  const a = SAMPLES[i - 1];
  const b = SAMPLES[i];
  const seg = b.cumU - a.cumU || 1;
  const t = (sm - a.cumU) / seg;
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    w: a.w + (b.w - a.w) * t,
    cum: a.cum + (b.cum - a.cum) * t,
    dx: b.x - a.x,
    dy: b.y - a.y,
  };
}

// ---- Sheet tuning -------------------------------------------------------
const SHEET_H0 = 150; // baked sheet height (paper width at scale 1)
const SHEET_L0 = 178; // Restored to natural photo aspect ratio so height is full
const TARGET_D = 140; // Exact spacing for guaranteed continuous overlap
const N = Math.round(PATH_U_LEN / TARGET_D);
const D = PATH_U_LEN / N; // exact spacing to make the loop perfectly seamless
const FOLD_TILT = 13; // degrees; alternates +/- so sheets tent into folds
const SPEED = 60; // virtual units / second

// A gallery of "retouched" prints — each sheet keeps its photo for the whole
// journey, so the loop stays seamless while still showing a mix of images.
const PHOTOS = [
  "/images/hero-ribbon-photo.png",
  "/images/portrait-woman.png",
  "/images/portrait-man.png",
  "/images/woman_saree.png",
  "/images/jewelry_necklace.png",
  "/images/watches_product.png",
];

const QUEUE_LINES = 8;

function sheetTransform(u: number, k: number, p: { x: number, y: number, w: number, dx: number, dy: number, cum: number }) {
  const scale = p.w / SHEET_H0;
  const ang = (Math.atan2(p.dy, p.dx) * 180) / Math.PI;

  const progress = p.cum / PATH_LEN;
  const rotY = -60 * progress; // Creates the trapezoid (broader one end, narrower on other)

  return `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) perspective(1200px) scale(${scale.toFixed(3)}) rotateZ(${(ang + 180).toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`;
}

export function PrinterPaperFlow() {
  const reduce = useReducedMotion();
  const sheetRefs = useRef<(SVGGElement | null)[]>([]);
  const groupRef = useRef<SVGGElement | null>(null);
  const orderRef = useRef<string>("");

  const applyFrame = (flow: number) => {
    const svals: number[] = new Array(N);
    for (let k = 0; k < N; k++) {
      const u = ((k * D + flow) % PATH_U_LEN + PATH_U_LEN) % PATH_U_LEN;
      svals[k] = u;
      const el = sheetRefs.current[k];
      if (!el) continue;

      const p = pointAt(u);

      el.setAttribute("transform", "");
      el.style.transform = sheetTransform(u, k, p);

      // Compute the folded corner size
      const progress = p.cum / PATH_LEN;
      let foldAmt = 0;
      if (progress > 0.1 && progress < 0.9) {
        foldAmt = Math.sin(((progress - 0.1) / 0.8) * Math.PI);
      }
      const F = 50 * foldAmt; // Max fold size
      const L = SHEET_L0;
      const H = SHEET_H0;

      // Update the clip-path cutting the corner
      const clipPoly = document.getElementById(`poly-clip-${k}`);
      if (clipPoly) {
        clipPoly.setAttribute("points", `${-L / 2},${-H / 2} ${L / 2 - F},${-H / 2} ${L / 2},${-H / 2 + F} ${L / 2},${H / 2} ${-L / 2},${H / 2}`);
      }

      // Update the folded flap triangle
      const flapPoly = document.getElementById(`poly-flap-${k}`);
      if (flapPoly) {
        flapPoly.setAttribute("points", `${L / 2 - F},${-H / 2} ${L / 2},${-H / 2 + F} ${L / 2 - F},${-H / 2 + F}`);
        flapPoly.style.opacity = F > 1 ? "1" : "0";
      }

      // fade in as it emerges from the slot so the wrap is invisible
      el.style.opacity = String(Math.min(1, u / 55));
    }
    // paint order: printer side (smallest u) ON TOP
    const order = [...Array(N).keys()].sort((a, b) => svals[b] - svals[a]);
    const key = order.join(",");
    if (key !== orderRef.current && groupRef.current) {
      orderRef.current = key;
      for (const k of order) {
        const el = sheetRefs.current[k];
        if (el) groupRef.current.appendChild(el);
      }
    }
  };

  // Static first paint (also the reduced-motion resting state).
  useEffect(() => {
    applyFrame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAnimationFrame((t) => {
    if (reduce) return;
    applyFrame((t / 1000) * SPEED);
  });

  return (
    <>
      {/* Preload highly optimized Next.js Image versions to eliminate pop-in */}
      <link rel="preload" as="image" href={`/_next/image?url=${encodeURIComponent("/images/printer-nobg.png")}&w=640&q=75`} />
      {PHOTOS.map((p) => (
        <link key={p} rel="preload" as="image" href={`/_next/image?url=${encodeURIComponent(p)}&w=384&q=75`} />
      ))}

      <div
        className="absolute inset-0 z-[1] hidden md:block pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMax slice"
          className="w-full h-full"
        >
          <defs>
            {/* light warm tint to keep the prints on-palette without hiding them */}
            <linearGradient id="ppf-tint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C7A59F" stopOpacity="0.12" />
              <stop offset="1" stopColor="#8D6759" stopOpacity="0.2" />
            </linearGradient>
            {/* soft top-lit sheen across each sheet */}
            <linearGradient id="ppf-sheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="1" stopColor="#000000" stopOpacity="0.34" />
            </linearGradient>
            {/* drop shadow so each sheet reads as a separate physical print */}
            <filter id="ppf-drop" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000" floodOpacity="0.55" />
            </filter>
            {/* Clip path to hide the part of the ribbon that is "inside" the printer */}
            <clipPath id="printer-slot-clip">
              <polygon points="-2000,-1000 1126,-1000 1126,600 1238,600 1238,3000 -2000,3000" />
            </clipPath>
          </defs>

          {/* ================= PRINTER AND TEAL PAPER (Scaled down around the slot point) ===== */}
          <g transform="translate(-24, 0) translate(1262, 604) scale(0.6) translate(-1262, -604)">
            {/* PRINTER (drawn first -> behind the prints) */}
            <image
              href={`/_next/image?url=${encodeURIComponent("/images/printer-nobg.png")}&w=640&q=75`}
              x={PRINTER.x}
              y={PRINTER.y}
              width={PRINTER.w}
              height={PRINTER_H}
              preserveAspectRatio="xMidYMid meet"
            />

            {/* teal "GET YOUR IMAGINATION" sheet standing in the rear feed tray */}
            <g>
              <rect x={1165} y={360} width={134} height={133} fill="var(--color-accent)" />
              {Array.from({ length: 8 }).map((_, i) => (
                <text
                  key={i}
                  x={1171}
                  y={375 + i * 16}
                  fontFamily="var(--font-anton), sans-serif"
                  fontSize={15}
                  letterSpacing={-0.1}
                  fill="#050607"
                >
                  GET YOUR IMAGINATION
                </text>
              ))}
            </g>
          </g>

          {/* ===== FAN-FOLD SHEETS (drawn last -> in FRONT, out of the slot) ===== */}
          <g ref={groupRef} clipPath="url(#printer-slot-clip)">
            {Array.from({ length: N }).map((_, k) => {
              const u0 = (k * D) % PATH_U_LEN;
              const p = pointAt(u0);
              const L = SHEET_L0;
              const H = SHEET_H0; // Keep the photo proportions constant!

              const progress = p.cum / PATH_LEN;
              let foldAmt = 0;
              if (progress > 0.1 && progress < 0.9) {
                foldAmt = Math.sin(((progress - 0.1) / 0.8) * Math.PI);
              }
              const F = 50 * foldAmt;
              const clipPoints = `${-L / 2},${-H / 2} ${L / 2 - F},${-H / 2} ${L / 2},${-H / 2 + F} ${L / 2},${H / 2} ${-L / 2},${H / 2}`;
              const flapPoints = `${L / 2 - F},${-H / 2} ${L / 2},${-H / 2 + F} ${L / 2 - F},${-H / 2 + F}`;

              return (
                <g
                  key={k}
                  ref={(el) => {
                    sheetRefs.current[k] = el;
                  }}
                  style={{ transform: sheetTransform(u0, k, p) }}
                  filter="url(#ppf-drop)"
                >
                  <clipPath id={`clip-fold-${k}`}>
                    <polygon id={`poly-clip-${k}`} points={clipPoints} />
                  </clipPath>

                  <g clipPath={`url(#clip-fold-${k})`}>
                    <image
                      href={`/_next/image?url=${encodeURIComponent(PHOTOS[k % PHOTOS.length])}&w=384&q=75`}
                      x={-L / 2}
                      y={-H / 2}
                      width={L}
                      height={H}
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <rect x={-L / 2} y={-H / 2} width={L} height={H} fill="url(#ppf-tint)" />
                    <rect x={-L / 2} y={-H / 2} width={L} height={H} fill="url(#ppf-sheen)" />
                    {/* crisp paper edge */}
                    <rect
                      x={-L / 2}
                      y={-H / 2}
                      width={L}
                      height={H}
                      fill="none"
                      stroke="#EAECE6"
                      strokeOpacity={0.28}
                      strokeWidth={2}
                    />
                  </g>

                  {/* The folded corner flap */}
                  <polygon
                    id={`poly-flap-${k}`}
                    points={flapPoints}
                    fill="#e0d8d0"
                    opacity={F > 1 ? 1 : 0}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </>
  );
}
