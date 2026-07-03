"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Big heading + the small repeating text that fills the letters.
const TITLE = "GET YOUR IMAGINATION";
const PATTERN_LINE = "GET YOUR IMAGINATION ".repeat(18);
const PATTERN_ROWS = Array.from({ length: 13 }, (_, i) => 46 + i * 12);

const PHOTOS = [
  { src: "/images/jewelry_necklace.png", rot: -8, y: 4 },
  { src: "/images/hero-ribbon-photo.png", rot: 6, y: 26 },
  { src: "/images/watches_product.png", rot: -5, y: 40 },
  { src: "/images/scooter_vehicle.png", rot: 7, y: 46 },
  { src: "/images/portrait-man.png", rot: -6, y: 32 },
  { src: "/images/portrait-woman.png", rot: 8, y: 16 },
  { src: "/images/woman_saree.png", rot: -9, y: -4 },
];

export function GetYourImagination() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gyi-photo", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
      gsap.from(".gyi-spark", {
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        scale: 0,
        opacity: 0,
        transformOrigin: "center",
        duration: 0.5,
        delay: 1.4,
        stagger: 0.08,
        ease: "back.out(2)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-ink py-20 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col items-center">
        {/* ---- Heading: slate letters filled with repeating text ---- */}
        <svg
          viewBox="0 0 1400 210"
          className="w-full max-w-[1300px] h-auto select-none"
          role="img"
          aria-label={TITLE}
        >
          <defs>
            <clipPath id="gyi-clip">
              <text
                x="700"
                y="168"
                textAnchor="middle"
                fontFamily="var(--font-anton), sans-serif"
                fontSize="152"
                letterSpacing="-1"
              >
                {TITLE}
              </text>
            </clipPath>
          </defs>

          {/* faint repeating-text field behind the letters */}
          <g opacity="0.07" fill="#5D7686">
            {PATTERN_ROWS.map((y, i) => (
              <text
                key={i}
                x={i % 2 ? -30 : -6}
                y={y}
                fontFamily="var(--font-anton), sans-serif"
                fontSize="11"
                letterSpacing="1.5"
              >
                {PATTERN_LINE}
              </text>
            ))}
          </g>

          {/* base slate fill of the big letters */}
          <text
            x="700"
            y="168"
            textAnchor="middle"
            fontFamily="var(--font-anton), sans-serif"
            fontSize="152"
            letterSpacing="-1"
            fill="#5D7686"
          >
            {TITLE}
          </text>

          {/* darker repeating text clipped INSIDE the letters */}
          <g clipPath="url(#gyi-clip)" opacity="0.85">
            {PATTERN_ROWS.map((y, i) => (
              <text
                key={i}
                x={i % 2 ? -30 : -6}
                y={y}
                fontFamily="var(--font-anton), sans-serif"
                fontSize="11"
                letterSpacing="1.5"
                fill="#141f26"
              >
                {PATTERN_LINE}
              </text>
            ))}
          </g>
        </svg>

        {/* ---- Photo fan ---- */}
        <div className="mt-10 md:mt-16 w-full flex justify-center items-start gap-2 md:gap-3">
          {PHOTOS.map((p, i) => (
            <div key={i} className="gyi-photo relative w-[13%] max-w-[190px]">
              <div
                className="relative"
                style={{ transform: `translateY(${p.y}px) rotate(${p.rot}deg)` }}
              >
                <div
                  className="relative w-full aspect-square overflow-hidden group"
                  style={{ boxShadow: "0 22px 45px rgba(0,0,0,0.55)" }}
                >
                  <Image
                    src={p.src}
                    alt="Retouched work sample"
                    fill
                    sizes="(max-width: 768px) 40vw, 190px"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* teal sparks on the last photo */}
                {i === PHOTOS.length - 1 && (
                  <>
                    <span className="gyi-spark absolute -top-5 right-8 w-[5px] h-6 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(-28deg)" }} />
                    <span className="gyi-spark absolute -top-9 right-1 w-[7px] h-9 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(12deg)" }} />
                    <span className="gyi-spark absolute -top-5 -right-5 w-[5px] h-6 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(52deg)" }} />
                    <span className="gyi-spark absolute -bottom-5 -right-4 w-[5px] h-6 bg-accent" style={{ clipPath: "polygon(30% 0,70% 0,100% 100%,0 100%)", transform: "rotate(-40deg)" }} />
                    <span className="gyi-spark absolute -bottom-9 right-3 w-[7px] h-9 bg-accent" style={{ clipPath: "polygon(30% 0,70% 0,100% 100%,0 100%)", transform: "rotate(10deg)" }} />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
