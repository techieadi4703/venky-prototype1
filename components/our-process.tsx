"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const NODES = [
  { id: "client-brief", label: "client brief", x: 150, y: 200, isPill: true },
  { id: "internal-brief", label: "internal brief", x: 300, y: 100, isPill: false },
  { id: "estimation", label: "estimation", x: 525, y: 100, isPill: false },
  { id: "retouching", label: "retouching/adapting", x: 750, y: 100, isPill: false },
  { id: "internal-approval", label: "internal approval/quality check", x: 750, y: 300, isPill: false },
  { id: "correction", label: "correction", x: 525, y: 300, isPill: false },
  { id: "client-approval", label: "client approval", x: 300, y: 300, isPill: false },
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
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-24 z-10 relative bg-ink">
      <div className="flex flex-col mb-16 items-center">
        <h2 className="font-bebas text-accent text-4xl md:text-[3rem] tracking-wide mb-4 uppercase">
          OUR PROCESS
        </h2>
      </div>

      <div ref={containerRef} className="relative w-full aspect-[2/1] md:aspect-[2.5/1] max-w-7xl mx-auto">

        {/* SVG Track and Connector Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Main Track */}
          <path
            className="process-track"
            d="M 150 200 A 100 100 0 0 1 250 100 L 800 100 A 100 100 0 0 1 800 300 L 300 300"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="2"
            strokeDasharray="4000"
          />

          {/* Vertical Connectors */}
          {NODES.map((node) => (
            <g key={`connector-${node.id}`}>
              <line
                x1={node.x}
                y1={node.y}
                x2={node.x}
                y2={node.y + 60}
                stroke="#4A4A4A"
                strokeWidth="2"
              />
              <circle
                cx={node.x}
                cy={node.y + 60}
                r="4"
                fill="#4A4A4A"
              />
            </g>
          ))}
        </svg>

        {/* Nodes and Labels */}
        {NODES.map((node) => {
          const isHovered = hoveredNode === node.id;

          return (
            <div
              key={node.id}
              className="process-node absolute flex flex-col items-center group cursor-pointer"
              style={{
                left: `${(node.x / 1000) * 100}%`,
                top: `${(node.y / 400) * 100}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isHovered ? 20 : 10
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Expanding Circle / Pill */}
              <div
                className={`flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden shadow-lg ${isHovered ? "bg-accent scale-[4]" : "bg-[#4A4A4A] scale-100"
                  } ${node.isPill ? (isHovered ? "w-8 h-8 rounded-full" : "w-16 h-8 rounded-full") : "w-8 h-8 rounded-full"}`}
              >
                {/* Illustration (Visible on hover) */}
                <div
                  className={`relative w-full h-full transition-opacity duration-300 delay-100 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <img
                    src="/images/hero-ribbon-photo.png"
                    alt={node.label}
                    className="w-full h-full object-cover mix-blend-multiply opacity-50"
                  />
                </div>
              </div>

              {/* Label */}
              <div
                className="absolute text-center pointer-events-none whitespace-nowrap"
                style={{ top: '110px' }} // Adjusted for more margin top
              >
                <span className="font-oswald text-[#7C93A3] text-sm md:text-lg tracking-wide opacity-80">
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
