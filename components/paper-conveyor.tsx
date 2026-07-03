import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export interface PaperConveyorProps {
  speed?: number;
  paused?: boolean;
  sheetImages?: string[];
}

const UNIT_HEIGHT = 800; // height of one complete repeating texture unit

const PaperUnit = ({ sheetImages }: { sheetImages: string[] }) => (
  <div className="w-full flex flex-col justify-between" style={{ height: `${UNIT_HEIGHT}px` }}>
    {Array.from({ length: 8 }).map((_, i) => {
      // Use the rose color from the palette to match the image
      const gradient = "linear-gradient(to bottom, #A98A86 0%, #9B7D79 100%)";

      return (
        <div
          key={i}
          className="w-full relative shrink-0 overflow-hidden"
          style={{
            height: `calc(12.5% - 12px)`, // Creates a gap between sheets
            background: gradient,
            // Subtle curve effect via box shadow
            boxShadow: "inset 0 -10px 20px -10px rgba(0,0,0,0.2)",
          }}
        >
          {sheetImages[i] && (
            <div className="absolute inset-0 w-full h-full p-4 opacity-40 mix-blend-multiply">
              <Image 
                src={sheetImages[i]} 
                alt="" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          )}
          
          <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, #000 0.5px, transparent 0.5px)",
                backgroundSize: "6px 6px",
              }}
          />
        </div>
      );
    })}
  </div>
);

export function PaperConveyor({
  speed = 8, 
  paused = false,
  sheetImages = [],
}: PaperConveyorProps) {
  const prefersReducedMotion = useReducedMotion();
  const isPaused = paused || prefersReducedMotion;
  const queueLines = Array(8).fill("GET YOUR IMAGINATION");

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* 
        Printer Group positioned on the right side of the screen.
        Contains the printer, the rear text queue, and the 3D front paper output.
      */}
      <div className="absolute right-[5%] md:right-[8%] top-[25%] md:top-[35%] w-[280px] md:w-[480px] z-30 hidden md:block">
        
        {/* PAGE ON TOP OF PRINTER */}
        <div 
          className="absolute z-[40]" // Put ON TOP of the printer as requested
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "55%", // Sits right on the middle ledge, covering the rear flap
            width: "max-content", // Hug the text tightly
          }}
        >
          <div
            className="relative flex flex-col items-center justify-center px-3 py-2"
            style={{
              backgroundColor: "var(--color-accent, #506E7B)", 
              transform: "scaleY(1.1)", // slightly taller to match the condensed look
            }}
          >
            {queueLines.map((text, i) => (
              <div
                key={i}
                className="font-bebas text-black tracking-tight leading-[0.85] text-[1.2rem] md:text-[1.6rem] font-bold text-center w-full m-0 p-0"
                style={{ opacity: 1 - i * 0.03 }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* PRINTER BODY */}
        <div className="relative w-full aspect-[320/260] drop-shadow-2xl">
          <Image
            src="/images/printer-nobg.png"
            alt="Printer"
            fill
            sizes="(max-width: 768px) 280px, 480px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* 
          3D PAPER OUTPUT
          Uses CSS perspective to create a perfect, mathematically smooth flare 
          towards the camera, exactly like the screenshot. 
        */}
        <div 
          className="absolute z-20"
          style={{
             top: "69%", // Matches the front output slot height
             left: "29%", // Matches the left edge of the front slot
             width: "42%", // Matches the width of the front slot
             perspective: "1000px",
             perspectiveOrigin: "top center",
          }}
        >
           <div 
             className="w-full relative overflow-hidden"
             style={{
               height: "100vh", // Extends cleanly off the bottom of the screen
               // The skew and rotation bend the path to the left like the U-shape in the design
               transform: "rotateX(45deg) rotateZ(-15deg) skewX(-20deg) translateX(-10%)", 
               transformOrigin: "top center",
               boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
             }}
           >
              {/* The scrolling conveyor content */}
              <motion.div
                className="w-full absolute top-0 left-0"
                animate={{
                  y: isPaused ? "0%" : "-50%",
                }}
                transition={{
                  duration: speed,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                style={{ height: `${UNIT_HEIGHT * 2}px` }}
              >
                <PaperUnit sheetImages={sheetImages} />
                <PaperUnit sheetImages={sheetImages} />
              </motion.div>
           </div>
        </div>

      </div>
    </div>
  );
}
