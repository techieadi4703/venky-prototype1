"use client";

import { useState, useEffect, useRef } from "react";
import { Printer } from "./Printer";
import { Paper } from "./Paper";

export function PaperManager() {
  const [papers, setPapers] = useState<{ id: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    // Initial paper
    setPapers([{ id: nextId.current++ }]);

    // Spawn a new paper every 1.8 seconds as requested
    const interval = setInterval(() => {
      setPapers((prev) => [...prev, { id: nextId.current++ }]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleExit = (idToRemove: number) => {
    setPapers((prev) => prev.filter((p) => p.id !== idToRemove));
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* 
        The hidden SVG path that dictates the exact motion track.
        We use a fixed 1920x1080 coordinate space for the path to maintain aspect ratio and pure tangents.
      */}
      <svg 
        id="paper-svg-container"
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 1920 1080" 
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          id="paperPath"
          fill="none"
          stroke="transparent" // Invisible track
          strokeWidth="2"
          /* 
            M 1700 600 = Start at printer output slot
            L 1700 750 = Drop vertically down
            C 1700 950, 1200 1000, 1000 900 = Sweep left and slightly up
            C 800 800, 600 700, 300 800 = S-curve down again
            L -500 1100 = Exit offscreen horizontal/diagonal
          */
          d="M 1700 600 L 1700 750 C 1700 950, 1200 1000, 1000 900 C 800 800, 600 700, 300 800 L -500 1100"
        />
      </svg>

      <Printer />

      {/* The paper conveyor */}
      <div className="absolute inset-0 z-20">
        {papers.map((p, index) => (
          <Paper
            key={p.id}
            index={index}
            onExit={() => handleExit(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
