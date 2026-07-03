"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  "Small-scale pre-press powerhouse in Bengaluru delivering big-league results.",
  "Fast, precise, and affordable print-ready solutions that transform your vision into flawless files.",
  "Personalized single-point support and meticulous attention to detail for every project.",
  "Committed to empowering businesses today while building a lasting legacy of excellence."
];

export function WhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const reasonEls = gsap.utils.toArray(".reason-item");
      const imageEls = gsap.utils.toArray(".image-tile");

      // Animate headline
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Animate reasons
      gsap.from(reasonEls, {
        scrollTrigger: {
          trigger: reasonsRef.current,
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Animate images
      gsap.from(imageEls, {
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 80%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full max-w-[1440px] mx-auto px-[max(6vw,24px)] md:px-[min(6vw,96px)] py-24 z-10 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Column: Copy */}
        <div className="flex flex-col">
          <h2 
            ref={headlineRef}
            className="font-bebas text-bone text-4xl md:text-[2.5rem] tracking-wide mb-12 uppercase"
          >
            Why Choose Us
          </h2>
          
          <div ref={reasonsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {reasons.map((text, i) => (
              <div key={i} className="reason-item flex flex-col">
                <p 
                  className="font-bebas text-rose text-[15px] md:text-[17px] leading-[1.45] tracking-[0.02em] text-balance"
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Images */}
        <div ref={imagesRef} className="grid grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-0 items-center">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className="image-tile relative aspect-[4/5] border border-tile-frame overflow-hidden"
            >
              <Image 
                src="/images/hero-ribbon-photo.png" 
                alt={`Work sample ${item}`}
                fill
                className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
