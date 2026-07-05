"use client";

import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SERVICES = [
  {
    id: "pre-press",
    name: "PRE-PRESS",
    desc: "We ensure flawless print-ready files tailored to your specific output requirements. Meticulous quality checks at every step."
  },
  {
    id: "printing",
    name: "PRINTING",
    desc: "State-of-the-art printing solutions delivering unparalleled color accuracy and material finish for your brand."
  },
  {
    id: "photo-editing",
    name: "PHOTO EDITING",
    desc: "Expert retouching to elevate your imagery, combining creative vision with technical precision."
  }
];

export function OurServices() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleUp = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SERVICES.length - 1));
  };

  const handleDown = () => {
    setActiveIndex((prev) => (prev < SERVICES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-[max(6vw,24px)] md:px-[min(6vw,96px)] py-24 z-10 relative bg-ink">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-16 lg:gap-32">
        
        {/* Left Side: Folder Panel */}
        <div className="flex-1 w-full max-w-lg relative mt-12">
          
          {/* Folder Body (SVG) */}
          <div className="relative z-10 w-full aspect-[1.4] drop-shadow-2xl">
            <svg viewBox="0 0 600 420" className="w-full h-full overflow-visible drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="folderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A2A2A" />
                  <stop offset="100%" stopColor="#151515" />
                </linearGradient>
                <linearGradient id="backTabGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F1F1F" />
                  <stop offset="100%" stopColor="#0F0F0F" />
                </linearGradient>
                <clipPath id="leftTabClip">
                  <path d="M 280 40 L 310 10 Q 320 0 330 0 L 380 0 Q 390 0 400 10 L 430 40 Z" />
                </clipPath>
                <clipPath id="folderClip">
                  <path d="M 0 60 Q 0 40 20 40 L 390 40 L 420 10 Q 430 0 440 0 L 490 0 Q 500 0 510 10 L 580 80 L 580 400 Q 580 420 560 420 L 20 420 Q 0 420 0 400 Z" />
                </clipPath>
              </defs>

              {/* Left Tab Background */}
              <path 
                d="M 280 40 L 310 10 Q 320 0 330 0 L 380 0 Q 390 0 400 10 L 430 40 Z" 
                fill="url(#backTabGrad)" 
              />
              {/* Left Tab 3D Extrusion */}
              <path 
                d="M 280 40 L 310 10 Q 320 0 330 0 L 380 0 Q 390 0 400 10 L 430 40" 
                fill="none" 
                stroke="#383838" 
                strokeWidth="8" 
                clipPath="url(#leftTabClip)"
              />
              
              {/* Left Tab Cross */}
              <g stroke="#000" strokeWidth="2.5" opacity="0.8" strokeLinecap="round">
                <line x1="350" y1="15" x2="360" y2="25" />
                <line x1="360" y1="15" x2="350" y2="25" />
              </g>

              {/* Right Tab + Folder Body (Foreground) */}
              <path 
                d="M 0 60 Q 0 40 20 40 L 390 40 L 420 10 Q 430 0 440 0 L 490 0 Q 500 0 510 10 L 580 80 L 580 400 Q 580 420 560 420 L 20 420 Q 0 420 0 400 Z" 
                fill="url(#folderGrad)" 
              />

              {/* Folder 3D Extrusion (Thick Bevel) */}
              <path 
                d="M 0 60 Q 0 40 20 40 L 390 40 L 420 10 Q 430 0 440 0 L 490 0 Q 500 0 510 10 L 580 80" 
                fill="none" 
                stroke="#4A4A4A" 
                strokeWidth="12" 
                clipPath="url(#folderClip)"
              />
              {/* Folder 3D Extrusion (Bright Highlight) */}
              <path 
                d="M 0 60 Q 0 40 20 40 L 390 40 L 420 10 Q 430 0 440 0 L 490 0 Q 500 0 510 10 L 580 80" 
                fill="none" 
                stroke="#666666" 
                strokeWidth="4" 
                clipPath="url(#folderClip)"
              />

              {/* Right Tab Cross */}
              <g stroke="#000" strokeWidth="2.5" opacity="0.8" strokeLinecap="round">
                <line x1="460" y1="15" x2="470" y2="25" />
                <line x1="470" y1="15" x2="460" y2="25" />
              </g>
            </svg>

            {/* Folder Text Overlay */}
            <div className="absolute inset-0 pt-10 flex flex-col items-center justify-center pointer-events-none">
              <h3 className="font-bebas text-[#7C93A3] text-4xl md:text-[3.5rem] tracking-[0.1em] text-center opacity-90" style={{ filter: 'drop-shadow(0px -1px 1px rgba(255,255,255,0.05)) drop-shadow(0px 3px 4px rgba(0,0,0,0.8))' }}>
                {SERVICES[activeIndex].name === "PRE-PRESS" || SERVICES[activeIndex].name === "PRINTING" || SERVICES[activeIndex].name === "PHOTO EDITING" ? "OUR SERVICES" : SERVICES[activeIndex].name}
              </h3>
              <p className="sr-only">
                {SERVICES[activeIndex].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Vertical List */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-64 pt-8 md:pt-16">
          <button 
            onClick={handleUp}
            className="text-folder-outline hover:text-bone transition-colors p-4 focus-visible:outline-accent"
            aria-label="Previous service"
          >
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M16 2L30 22H2Z" />
            </svg>
          </button>

          <div className="relative h-[200px] overflow-hidden w-full mask-image-y my-4">
            <div 
              className="absolute top-0 left-0 w-full flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                transform: `translateY(calc(80px - ${activeIndex * 60}px))`
              }}
            >
              {SERVICES.map((srv, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-[60px] flex items-center justify-center font-bebas text-2xl md:text-4xl tracking-[0.05em] transition-all duration-300 ${
                      isActive ? "text-bone" : "text-folder-outline opacity-60 hover:opacity-100 hover:text-bone"
                    }`}
                  >
                    {srv.name}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            onClick={handleDown}
            className="text-folder-outline hover:text-bone transition-colors p-4 focus-visible:outline-accent"
            aria-label="Next service"
          >
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M16 22L2 2H30Z" />
            </svg>
          </button>
        </div>

      </div>

      <style jsx>{`
        .mask-image-y {
          mask-image: linear-gradient(to bottom, transparent, black 40%, black 60%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 40%, black 60%, transparent);
        }
      `}</style>
    </section>
  );
}
