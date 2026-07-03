"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NODES = [
  { id: "client-brief", label: "Client Brief", x: 10, y: 25, isPill: true },
  { id: "internal-brief", label: "Internal Brief", x: 35, y: 25, isPill: false },
  { id: "estimation", label: "Estimation", x: 60, y: 25, isPill: false },
  { id: "retouching", label: "Retouching/Adapting", x: 85, y: 25, isPill: false },
  { id: "internal-approval", label: "Internal Approval/Quality Check", x: 85, y: 75, isPill: false },
  { id: "correction", label: "Correction", x: 60, y: 75, isPill: false },
  { id: "client-approval", label: "Client Approval", x: 35, y: 75, isPill: false },
];

export function OurProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useGSAP(() => {
    // Reveal nodes sequentially on scroll
    gsap.from(".process-node", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)",
    });
    
    gsap.from(".process-track", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      strokeDashoffset: 4000,
      duration: 2,
      ease: "power2.inOut",
    });
  }, { scope: containerRef });

  return (
    <section className="w-full max-w-[1440px] mx-auto px-[max(6vw,24px)] md:px-[min(6vw,96px)] py-24 z-10 relative">
      <div className="flex flex-col mb-16">
        <h2 className="font-bebas text-accent text-4xl md:text-[2.5rem] tracking-wide mb-4 uppercase">
          Our Process
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full aspect-[4/3] md:aspect-[2.5/1]">
        
        {/* SVG Track */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Path linking all nodes in a loop */}
          <path 
            className="process-track"
            d="M 10 25 L 85 25 A 15 25 0 0 1 85 75 L 35 75 A 15 25 0 0 1 10 25 Z" 
            fill="none" 
            stroke="var(--color-node-line)" 
            strokeWidth="0.5" 
            strokeDasharray="4000"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isHovered = hoveredNode === node.id;
          
          return (
            <div 
              key={node.id}
              className="process-node absolute flex flex-col items-center group cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 20 : 10
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Circle/Pill */}
              <div 
                className={`flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  isHovered ? "bg-accent scale-150" : "bg-node-inactive scale-100"
                } ${node.isPill ? "w-20 md:w-32 h-10 md:h-12 rounded-full" : "w-10 md:w-12 h-10 md:h-12 rounded-full"}`}
              >
                {/* Placeholder Icon */}
                <span className={`font-bebas transition-opacity duration-300 text-ink ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}>
                  {node.isPill ? "BRIEF" : i}
                </span>
              </div>

              {/* Label (absolute so it doesn't move when node scales) */}
              <div className="absolute top-full mt-4 md:mt-6 w-32 md:w-48 text-center pointer-events-none">
                <span className={`font-bebas text-sm md:text-base leading-[1.2] tracking-wide transition-colors ${
                  isHovered ? "text-bone" : "text-rose"
                }`}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
