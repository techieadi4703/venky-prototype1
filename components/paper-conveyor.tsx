import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export interface PaperConveyorProps {
  speed?: number; // Duration in seconds for one complete loop
  paused?: boolean;
  sheetImages?: string[]; // Optional images to display on the paper segments
}

// We define a repeating wave of separate, overlapping paper sheets.
// This matches the visual of discrete papers swooping out of the printer.
const UNIT_WIDTH = 2400;
const NUM_SHEETS = 12;
const SHEET_WIDTH = 340;
const SHEET_HEIGHT = 480;

const sheets = Array.from({ length: NUM_SHEETS }).map((_, i) => {
  const progress = i / NUM_SHEETS;
  const angleRad = progress * 2 * Math.PI;
  
  // Center X position
  const x = progress * UNIT_WIDTH;
  
  // Center Y position (a cosine wave dipping down)
  // Dip from y=50 to y=550 (amplitude = 250, offset = 300)
  const y = 300 - 250 * Math.cos(angleRad);
  
  // Rotation (derivative of the wave)
  const slope = 250 * (2 * Math.PI / UNIT_WIDTH) * Math.sin(angleRad);
  const rot = Math.atan(slope) * (180 / Math.PI);
  
  return { id: i, x, y, rot };
});

const PaperUnit = ({ sheetImages }: { sheetImages: string[] }) => (
  <div 
    className="relative shrink-0" 
    style={{ width: `${UNIT_WIDTH}px`, height: '700px' }}
  >
    {sheets.map((sheet, i) => {
      // Alternate base colors slightly for distinction
      const gradient = i % 2 === 0
        ? "linear-gradient(135deg, #b59b8a 0%, #9d8475 70%, #735d4e 100%)"
        : "linear-gradient(135deg, #a48c7c 0%, #8a7364 70%, #685042 100%)";

      // Optional dog-ear curl on one of the trough sheets to match the design vibe
      const isDogEar = i === Math.floor(NUM_SHEETS / 2);

      return (
        <div
          key={sheet.id}
          className="absolute rounded-[2px] overflow-hidden"
          style={{
            left: `${sheet.x}px`,
            top: `${sheet.y}px`,
            width: `${SHEET_WIDTH}px`,
            height: `${SHEET_HEIGHT}px`,
            // Origin at center so x,y position exactly along the wave path
            transform: `translate(-50%, -50%) rotate(${sheet.rot}deg)`,
            background: gradient,
            // Heavy shadow to emphasize the separation of the discrete sheets
            boxShadow: "-10px 15px 30px rgba(0,0,0,0.5), inset 2px 2px 10px rgba(255,255,255,0.08)",
            ...(isDogEar && {
              clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
            })
          }}
        >
          {isDogEar && (
            <div 
              className="absolute bottom-0 right-0 w-[40px] h-[40px]"
              style={{
                background: "linear-gradient(135deg, #735d4e 0%, #4a382a 100%)",
                boxShadow: "-2px -2px 5px rgba(0,0,0,0.3)",
                transformOrigin: "bottom right",
                transform: "rotate(0deg)", // Folded up appearance
                borderRadius: "2px 0 0 0"
              }}
            />
          )}

          {sheetImages[i] && (
            <div className="absolute inset-0 w-full h-full p-6 opacity-40 mix-blend-multiply">
              <Image 
                src={sheetImages[i]} 
                alt="" 
                fill 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          )}
          
          {/* Subtle paper texture (dots or noise) */}
          <div
              className="absolute inset-0 opacity-[0.04]"
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
  speed = 12, 
  paused = false,
  sheetImages = [],
}: PaperConveyorProps) {
  const prefersReducedMotion = useReducedMotion();
  const isPaused = paused || prefersReducedMotion;
  const queueLines = Array(8).fill("GET YOUR IMAGINATION");

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden flex items-center"
      aria-hidden="true"
    >
      {/* 
        (a) Static printer illustration positioned absolute top-right, z-index above the paper 
      */}
      <div className="absolute right-0 md:right-[3%] top-[20%] md:top-[38%] w-[200px] h-[160px] md:w-[320px] md:h-[260px] z-30 hidden md:block">
        <Image
          src="/images/printer-nobg.png"
          alt="Printer"
          fill
          sizes="(max-width: 768px) 200px, 320px"
          style={{ objectFit: "contain" }}
          className="drop-shadow-2xl"
          priority
        />
      </div>

      {/* PAGE ON TOP OF PRINTER with "GET YOUR IMAGINATION" */}
      <div 
        className="absolute z-40 hidden md:block"
        style={{
          right: "4.5%",
          top: "8%",
          width: "270px",
        }}
      >
        <div
          className="w-full px-5 py-5 relative"
          style={{
            backgroundColor: "var(--color-accent, #9cb8b9)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
          }}
        >
          {queueLines.map((text, i) => (
            <div
              key={i}
              className="font-bebas text-ink tracking-[0.1em] leading-[1.6] text-[1.1rem] font-bold text-black"
              style={{ opacity: 1 - i * 0.02 }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* 
        (b) Endless horizontal paper strip behind/under it.
      */}
      <div className="absolute top-[20%] md:top-[0%] left-0 w-full z-10 flex">
        <motion.div
          className="flex will-change-transform"
          animate={{
            x: isPaused ? "0%" : "-50%",
          }}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{ width: "max-content" }}
        >
          <PaperUnit sheetImages={sheetImages} />
          <PaperUnit sheetImages={sheetImages} />
        </motion.div>
      </div>
    </div>
  );
}
