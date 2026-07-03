"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GetYourImagination() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate polaroids floating in
      gsap.from(".polaroid", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        rotation: (i) => gsap.utils.random(-30, 30),
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.2)"
      });
      
      // Animate the spark lines
      gsap.from(".spark", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
        stagger: 0.1,
        ease: "back.out(2)"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const polaroids = [
    { src: "/images/hero-ribbon-photo.png", rotation: -15, yOffset: 20 },
    { src: "/images/portrait-man.png", rotation: 10, yOffset: -10 },
    { src: "/images/portrait-woman.png", rotation: -5, yOffset: 10 },
    { src: "/images/portrait-man.png", rotation: 15, yOffset: -5 },
    { src: "/images/hero-ribbon-photo.png", rotation: -20, yOffset: 15 },
    { src: "/images/portrait-woman.png", rotation: 25, yOffset: -20 },
  ];

  return (
    <section className="relative min-h-[600px] w-full flex flex-col bg-[#010101] py-24 overflow-hidden" ref={containerRef}>
      
      <div className="flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto px-4 md:px-12 relative z-10">
        
        {/* Main Text Block */}
        <div className="relative mb-24 w-full flex justify-center">
          {/* Repeating background text */}
          <div className="absolute inset-0 flex flex-wrap overflow-hidden opacity-30 select-none items-center justify-center w-full max-w-[900px] mx-auto mask-image-fade">
            <p className="text-[#516e7b] font-bebas text-[10px] md:text-sm leading-none tracking-widest break-all text-justify">
              {Array(40).fill("GET YOUR IMAGINATION ").join("")}
            </p>
          </div>
          
          <h1 className="relative font-bebas text-[#516e7b] text-6xl md:text-[8rem] lg:text-[10rem] leading-none tracking-tight uppercase z-10 mix-blend-screen text-center">
            Get Your Imagination
          </h1>
        </div>

        {/* Polaroids */}
        <div className="relative w-full max-w-5xl mx-auto flex justify-between items-center gap-2 md:gap-4 px-8 mt-12">
          {polaroids.map((p, i) => (
            <div 
              key={i} 
              className="polaroid relative w-[12%] aspect-square bg-white p-1 md:p-2 shadow-2xl hover:scale-110 transition-transform duration-300 z-10"
              style={{ 
                transform: `rotate(${p.rotation}deg) translateY(${p.yOffset}px)`,
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image 
                  src={p.src} 
                  alt="Portfolio snippet" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              
              {/* Sparkles on the last polaroid */}
              {i === 5 && (
                <>
                  <div className="spark absolute -top-8 -left-4 w-1 h-6 bg-[#516e7b] rounded-full transform -rotate-45 origin-bottom"></div>
                  <div className="spark absolute -top-10 left-4 w-1 h-8 bg-[#516e7b] rounded-full transform -rotate-12 origin-bottom"></div>
                  <div className="spark absolute -top-6 left-12 w-1 h-6 bg-[#516e7b] rounded-full transform rotate-45 origin-bottom"></div>
                  <div className="spark absolute -bottom-6 -left-2 w-1 h-6 bg-[#516e7b] rounded-full transform -rotate-45 origin-top"></div>
                  <div className="spark absolute -bottom-8 left-6 w-1 h-6 bg-[#516e7b] rounded-full transform rotate-12 origin-top"></div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
