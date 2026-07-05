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
  { src: "/images/jewelry_necklace.png", rot: -25, y: 20 },
  { src: "/images/hero-ribbon-photo.png", rot: 15, y: 60 },
  { src: "/images/watches_product.png", rot: -10, y: 15 },
  { src: "/images/scooter_vehicle.png", rot: 15, y: 50 },
  { src: "/images/portrait-man.png", rot: -20, y: 20 },
  { src: "/images/portrait-woman.png", rot: 25, y: 60 },
  { src: "/images/woman_saree.png", rot: -30, y: -5 },
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
            <filter id="ripped">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <clipPath id="gyi-clip">
              <text
                x="700"
                y="154"
                textAnchor="middle"
                fontFamily="var(--font-bricolage), sans-serif"
                fontWeight="900"
                fontSize="140"
                letterSpacing="-15"
              >
                {TITLE}
              </text>
            </clipPath>
          </defs>

          {/* 1. Base dark teal background for the big letters (acts as the thick outline base) */}
          <text
            x="700"
            y="154"
            textAnchor="middle"
            fontFamily="var(--font-bricolage), sans-serif"
            fontWeight="900"
            fontSize="140"
            letterSpacing="-15"
            fill="#324450"
            stroke="#324450"
            strokeWidth="4"
          >
            {TITLE}
          </text>

          {/* 2. Black patterned text clipped to the big letters, providing texture to the outline */}
          <g clipPath="url(#gyi-clip)" opacity="1">
            {PATTERN_ROWS.map((y, i) => (
              <text
                key={i}
                x={i % 2 ? -30 : -6}
                y={y}
                fontFamily="var(--font-bricolage), sans-serif"
                fontWeight="900"
                fontSize="13"
                letterSpacing="-0.5"
                fill="#000000"
              >
                {PATTERN_LINE}
              </text>
            ))}
          </g>

          {/* 3. The overlapping illusion! Slightly smaller solid light teal text on top to hide the center of the pattern */}
          <text
            x="700"
            y="160"
            textAnchor="middle"
            fontFamily="var(--font-bricolage), sans-serif"
            fontWeight="900"
            fontSize="124"
            letterSpacing="-5.5"
            fill="#5E7D8F"
            stroke="#5E7D8F"
            strokeWidth="4"
            transform="scale(1, 0.96)"
          >
            {TITLE}
          </text>
        </svg>

        {/* ---- Photo fan ---- */}
        <div className="mt-10 md:mt-16 w-full flex justify-center items-start gap-4 md:gap-6">
          {PHOTOS.map((p, i) => (
            <div key={i} className="gyi-photo relative w-[12%] max-w-[175px]">
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
                  {/* Ripped black frame overlay */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: "-20px",
                      left: "-20px",
                      right: "-20px",
                      bottom: "-20px",
                      border: "26px solid #000000",
                      filter: "url(#ripped)",
                    }}
                  />
                </div>

                {/* teal sparks on the last photo */}
                {i === PHOTOS.length - 1 && (
                  <>
                    {/* Top right sparks (mirrored from bottom left) */}
                    <span className="gyi-spark absolute -top-4 -right-7 w-[5px] h-7 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(75deg)" }} />
                    <span className="gyi-spark absolute -top-9 -right-4 w-[6px] h-8 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(40deg)" }} />
                    <span className="gyi-spark absolute -top-11 right-0 w-[5px] h-6 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(15deg)" }} />
                    
                    {/* Bottom left sparks */}
                    <span className="gyi-spark absolute -bottom-4 -left-7 w-[5px] h-7 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(-105deg)" }} />
                    <span className="gyi-spark absolute -bottom-9 -left-4 w-[6px] h-8 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(-140deg)" }} />
                    <span className="gyi-spark absolute -bottom-11 left-0 w-[5px] h-6 bg-accent" style={{ clipPath: "polygon(0 0,100% 0,70% 100%,30% 100%)", transform: "rotate(-165deg)" }} />
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
