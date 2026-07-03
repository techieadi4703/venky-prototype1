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
    { src: "/images/jewelry_necklace.png", rotation: -20, yOffset: 10 },
    { src: "/images/hero-ribbon-photo.png", rotation: -12, yOffset: 30 },
    { src: "/images/watches_product.png", rotation: 15, yOffset: 45 },
    { src: "/images/scooter_vehicle.png", rotation: 22, yOffset: 5 },
    { src: "/images/portrait-man.png", rotation: -15, yOffset: 25 },
    { src: "/images/portrait-woman.png", rotation: -25, yOffset: 40 },
    { src: "/images/woman_saree.png", rotation: -18, yOffset: -10 },
  ];

  return (
    <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-[#050607] py-16 overflow-hidden" ref={containerRef}>
      
      <div className="flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Main Text Block (No external background grid, mask only) */}
        <div className="relative mb-6 md:mb-10 w-full flex justify-center">
          <div className="relative font-bebas text-[clamp(3rem,10.5vw,12rem)] leading-none tracking-tight uppercase text-center font-bold isolate">
            
            {/* Layer 1: Main Solid Text (Large overlaid letters - Slate blue-gray) */}
            <div className="relative text-[#5D7686] z-10">
              GET YOUR IMAGINATION
            </div>
            
            {/* Layer 2: Shadow Overlay (Near-black text clipped inside the letters) */}
            <div 
              className="absolute inset-0 pointer-events-none select-none z-20"
              style={{
                WebkitTextFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='380' height='16'%3E%3Ctext x='0' y='12' fill='%230B0F11' font-family='Bebas Neue, sans-serif' font-size='12' letter-spacing='2px' opacity='1'%3EGET YOUR IMAGINATION GET YOUR IMAGINATION GET YOUR IMAGINATION%3C/text%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center center',
                color: 'transparent'
              }}
              aria-hidden="true"
            >
              GET YOUR IMAGINATION
            </div>
            
          </div>
        </div>

        {/* Polaroids (No border, tight gaps) */}
        <div className="relative w-full max-w-[1400px] mx-auto flex justify-center items-center gap-2 md:gap-4 px-4">
          {polaroids.map((p, i) => (
            <div 
              key={i} 
              className="polaroid relative w-[12%] aspect-square hover:scale-110 transition-transform duration-300 z-10"
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
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>
              
              {/* Sparkles on the last polaroid */}
              {i === 6 && (
                <>
                  {/* Top Right Sparkles */}
                  <div className="spark absolute -top-6 right-6 w-[6px] h-6 bg-[#516e7b] origin-bottom" style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 30% 100%)", transform: "rotate(-30deg)" }}></div>
                  <div className="spark absolute -top-10 right-0 w-[8px] h-10 bg-[#516e7b] origin-bottom" style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 30% 100%)", transform: "rotate(15deg)" }}></div>
                  <div className="spark absolute -top-6 -right-6 w-[6px] h-6 bg-[#516e7b] origin-bottom" style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 30% 100%)", transform: "rotate(60deg)" }}></div>
                  
                  {/* Bottom Left Sparkles */}
                  <div className="spark absolute -bottom-6 left-6 w-[6px] h-6 bg-[#516e7b] origin-top" style={{ clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)", transform: "rotate(-30deg)" }}></div>
                  <div className="spark absolute -bottom-10 left-0 w-[8px] h-10 bg-[#516e7b] origin-top" style={{ clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)", transform: "rotate(15deg)" }}></div>
                  <div className="spark absolute -bottom-6 -left-6 w-[6px] h-6 bg-[#516e7b] origin-top" style={{ clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)", transform: "rotate(60deg)" }}></div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
