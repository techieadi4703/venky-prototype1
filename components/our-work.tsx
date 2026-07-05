"use client";

import Image from "next/image";
import { useState } from "react";

const WORKS = [
  {
    id: 1,
    image: "/images/portrait-man.png",
    title: "Career",
    hoverColor: "bg-[#064e3b]", // Dark emerald/green
  },
  {
    id: 2,
    image: "/images/portrait-woman.png",
    title: "Zev",
    hoverColor: "bg-[#0ea5e9]", // Bright blue
  },
  {
    id: 3,
    image: "/images/woman_saree.png",
    title: "Editorial",
    hoverColor: "bg-[#be123c]", // Dark rose/red
  }
];

export function OurWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-ink relative z-10 flex flex-col pt-24 pb-32" id="our-work">
      <div className="flex flex-col items-center mb-16 px-6">
        <h2 className="font-bebas text-accent text-4xl md:text-[3rem] tracking-wide uppercase">
          OUR WORK
        </h2>
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 border-t border-b border-white/10">
        {WORKS.map((work, index) => (
          <div
            key={work.id}
            className={`
              relative flex items-center justify-center py-24 px-8 
              transition-colors duration-500 ease-out border-white/10
              ${index !== WORKS.length - 1 ? 'md:border-r' : ''}
              ${hoveredIndex === index ? work.hoverColor : "bg-transparent"}
            `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Image Container */}
            <div className="relative w-full max-w-[300px] aspect-[3/4] overflow-hidden drop-shadow-2xl">
              <Image 
                src={work.image} 
                alt={work.title} 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105" 
              />
              
              {/* Overlay Pill Label */}
              <div 
                className={`
                  absolute inset-0 flex items-center justify-center 
                  transition-opacity duration-300 pointer-events-none
                  ${hoveredIndex === index ? "opacity-100" : "opacity-0"}
                `}
              >
                <div className="bg-black/90 backdrop-blur-sm text-white px-8 py-2 rounded-full font-bebas tracking-wider text-xl shadow-xl border border-white/20">
                  {work.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
