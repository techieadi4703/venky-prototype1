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
  { x: 1262, y: 604, w: 58 }, // at the front output slot (spawn point)
  { x: 1222, y: 646, w: 74 }, // sliding out onto the tray
  { x: 1150, y: 690, w: 92 }, // tipping down off the tray
  { x: 1080, y: 752, w: 112 },
  { x: 940, y: 800, w: 132 }, // bottom sweep begins
  { x: 748, y: 814, w: 150 },
  { x: 552, y: 802, w: 166 },
  { x: 366, y: 762, w: 178 },
  { x: 214, y: 690, w: 184 },
  { x: 118, y: 566, w: 186 }, // rising up the left
  { x: 40, y: 450, w: 186 },
  { x: -150, y: 350, w: 186 }, // off the left screen edge (recycle point)
];

// ---- Build an arc-length sampled polyline from the control points -------
const STEPS = 22;

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

  let cum = 0;
  let cumU = 0;
  for (let i = 1; i < out.length; i++) {
    const ds = Math.hypot(out[i].x - out[i - 1].x, out[i].y - out[i - 1].y);
    cum += ds;
    const avgW = (out[i].w + out[i - 1].w) / 2;
    const avgScale = avgW / 150; // SHEET_H0 is 150
    cumU += ds / avgScale;
    out[i].cum = cum;
    out[i].cumU = cumU;
  }
  return { samples: out, length: cum, lengthU: cumU };
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
    ang: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI,
  };
}

// ---- Sheet tuning -------------------------------------------------------
const SHEET_H0 = 150; // baked sheet height (paper width at scale 1)
const SHEET_L0 = 178; // baked sheet length (along the feed direction)
const TARGET_D = 210; // desired uniform visual spacing
const N = Math.round(PATH_U_LEN / TARGET_D);
const D = PATH_U_LEN / N; // exact spacing to make the loop perfectly seamless
const FOLD_TILT = 13; // degrees; alternates +/- so sheets tent into folds
const SPEED = 45; // virtual units / second

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

function sheetTransform(s: number, k: number) {
  const p = pointAt(s);
  const scale = p.w / SHEET_H0;
  // alternate the tilt so consecutive sheets fold against each other
  const tilt = k % 2 === 0 ? FOLD_TILT : -FOLD_TILT;
  return `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(
    p.ang + tilt + 180
  ).toFixed(1)}) scale(${scale.toFixed(3)})`;
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
      el.setAttribute("transform", sheetTransform(u, k));
      // fade in as it emerges from the slot so the wrap is invisible
      el.style.opacity = String(Math.min(1, u / 55));
    }
    // paint order: furthest along the path (largest u) at the back, the sheet
    // nearest the printer on top -> newest print sits on the stack.
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
          {/* fold shadow along the leading edge of each sheet */}
          <linearGradient id="ppf-fold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000000" stopOpacity="0.55" />
            <stop offset="0.18" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          {/* drop shadow so each sheet reads as a separate physical print */}
          <filter id="ppf-drop" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* ================= PRINTER (drawn first -> behind the prints) ===== */}
        <image
          href="/images/printer-nobg.png"
          x={PRINTER.x}
          y={PRINTER.y}
          width={PRINTER.w}
          height={PRINTER_H}
          preserveAspectRatio="xMidYMid meet"
        />

        {/* teal "GET YOUR IMAGINATION" sheet standing in the rear feed tray */}
        <g>
          <rect x={1147} y={312} width={188} height={196} fill="var(--color-accent)" />
          {Array.from({ length: QUEUE_LINES }).map((_, i) => (
            <text
              key={i}
              x={1156}
              y={346 + i * 20}
              fontFamily="var(--font-anton), sans-serif"
              fontSize={21}
              letterSpacing={-0.2}
              fill="#050607"
            >
              GET YOUR IMAGINATION
            </text>
          ))}
        </g>

        {/* ===== FAN-FOLD SHEETS (drawn last -> in FRONT, out of the slot) ===== */}
        <g ref={groupRef}>
          {Array.from({ length: N }).map((_, k) => {
            const L = SHEET_L0;
            const H = SHEET_H0;
            return (
              <g
                key={k}
                ref={(el) => {
                  sheetRefs.current[k] = el;
                }}
                transform={sheetTransform((k * D) % PATH_U_LEN, k)}
                filter="url(#ppf-drop)"
              >
                {/* the printed photo */}
                <image
                  href={PHOTOS[k % PHOTOS.length]}
                  x={-L / 2}
                  y={-H / 2}
                  width={L}
                  height={H}
                  preserveAspectRatio="xMidYMid slice"
                />
                {/* warm tint + sheen so it reads as printed on paper */}
                <rect x={-L / 2} y={-H / 2} width={L} height={H} fill="url(#ppf-tint)" />
                <rect x={-L / 2} y={-H / 2} width={L} height={H} fill="url(#ppf-sheen)" />
                {/* crease shadow on the leading (printer-side) edge */}
                <rect x={L / 2 - L * 0.18} y={-H / 2} width={L * 0.18} height={H} fill="url(#ppf-fold)" />
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
            );
          })}
        </g>
      </svg>
    </div>
  );
}
