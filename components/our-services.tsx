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
    <section className="w-full max-w-[1440px] mx-auto px-[max(6vw,24px)] md:px-[min(6vw,96px)] py-24 z-10 relative">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-24">
        
        {/* Left Side: Folder Panel */}
        <div className="flex-1 w-full max-w-2xl relative">
          
          {/* Decorative Tabs */}
          <div className="flex gap-2 mb-[-1px] ml-4 relative z-0">
            {[1, 2].map((tab) => (
              <div 
                key={tab} 
                className="w-16 h-8 bg-folder-face rounded-t-lg border-t border-x border-folder-outline/50 flex items-center justify-center"
              >
                <span className="text-folder-outline text-xs">×</span>
              </div>
            ))}
          </div>

          {/* Folder Body (3D effect) */}
          <div 
            className="relative z-10 w-full min-h-[400px] p-8 md:p-12 flex flex-col bg-folder-face border border-folder-outline/30 rounded-lg rounded-tl-none shadow-2xl"
            style={{
              boxShadow: "inset 0 2px 0 0 var(--folder-edge), 12px 16px 24px -4px rgba(0,0,0,0.5)",
              background: "linear-gradient(180deg, var(--folder-edge) 0%, var(--folder-face) 10%, var(--folder-face) 100%)"
            }}
          >
            <h3 className="font-bebas text-accent text-3xl md:text-5xl tracking-wide mb-6">
              {SERVICES[activeIndex].name}
            </h3>
            <p className="font-bebas text-bone text-lg md:text-xl leading-[1.45] tracking-[0.02em] max-w-md">
              {SERVICES[activeIndex].desc}
            </p>
          </div>
        </div>

        {/* Right Side: Vertical List */}
        <div className="flex flex-col items-center justify-center shrink-0 w-full md:w-64 pt-8 md:pt-16">
          <button 
            onClick={handleUp}
            className="text-rose hover:text-accent transition-colors p-4 focus-visible:outline-accent"
            aria-label="Previous service"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M18 15L12 9L6 15" />
            </svg>
          </button>

          <div className="relative h-[120px] overflow-hidden w-full mask-image-y">
            <div 
              className="absolute top-0 left-0 w-full flex flex-col transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateY(calc(40px - ${activeIndex * 40}px))`
              }}
            >
              {SERVICES.map((srv, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={srv.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-[40px] flex items-center justify-center font-bebas text-xl md:text-2xl tracking-[0.1em] transition-all duration-300 ${
                      isActive ? "text-accent scale-110" : "text-rose opacity-50 hover:opacity-100 hover:text-accent"
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
            className="text-rose hover:text-accent transition-colors p-4 focus-visible:outline-accent"
            aria-label="Next service"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M6 9L12 15L18 9" />
            </svg>
          </button>
        </div>

      </div>

      <style jsx>{`
        .mask-image-y {
          mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
        }
      `}</style>
    </section>
  );
}
