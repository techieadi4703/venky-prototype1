import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export interface PaperConveyorProps {
  speed?: number;
  paused?: boolean;
  sheetImages?: string[];
}

const NUM_SHEETS = 12;
const SHEET_WIDTH = 340;
const OVERLAP = 120;
const EFFECTIVE_WIDTH = SHEET_WIDTH - OVERLAP; // 220
// Calculate the exact width of one unit so the loop is mathematically seamless
const UNIT_WIDTH = SHEET_WIDTH + (NUM_SHEETS - 1) * EFFECTIVE_WIDTH; // 2760

const PaperUnit = ({ sheetImages }: { sheetImages: string[] }) => (
  <div 
    className="flex shrink-0 items-center" 
    style={{ width: `${UNIT_WIDTH}px` }}
  >
    {Array.from({ length: NUM_SHEETS }).map((_, i) => {
      // Alternating offset gives the "drape rhythm" across the horizontal conveyor
      const yOffset = i % 2 === 0 ? "15px" : "-15px";
      const gradient = i % 2 === 0
        ? "linear-gradient(135deg, #b59b8a 0%, #9d8475 70%, #735d4e 100%)"
        : "linear-gradient(135deg, #a48c7c 0%, #8a7364 70%, #685042 100%)";

      // Optional dog-ear curl on some sheets to match the design vibe
      const isDogEar = i % 4 === 2;

      return (
        <div
          key={i}
          className="relative shrink-0 rounded-[2px]"
          style={{
            width: `${SHEET_WIDTH}px`,
            height: '350px',
            marginLeft: i === 0 ? '0px' : `-${OVERLAP}px`,
            // Skew and rotate to simulate heavy drape folds sliding horizontally
            transform: `translateY(${yOffset}) rotate(-12deg) skewY(5deg)`,
            background: gradient,
            boxShadow: "-12px 15px 30px rgba(0,0,0,0.5), inset 2px 2px 10px rgba(255,255,255,0.08)",
            // Ensure sheets to the right overlap the sheets to the left
            zIndex: i,
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
  speed = 10, 
  paused = false,
  sheetImages = [],
}: PaperConveyorProps) {
  const prefersReducedMotion = useReducedMotion();
  const isPaused = paused || prefersReducedMotion;
  const queueLines = Array(8).fill("GET YOUR IMAGINATION");

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-[1] overflow-hidden flex flex-col justify-center"
      aria-hidden="true"
    >
      {/* 
        (a) Static printer illustration positioned absolute top-right, z-index above the paper.
        Fixed near the vertical center so the paper track aligns perfectly.
      */}
      <div className="absolute right-0 md:right-[3%] top-[30%] md:top-[38%] w-[200px] h-[160px] md:w-[320px] md:h-[260px] z-30 hidden md:block">
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

      {/* PAGE ON TOP OF PRINTER */}
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
        We position it vertically exactly at the printer's output slot level!
        The printer is at top-[38%] with height 260px.
        Setting the track to top-[42%] aligns the center of the paper belt 
        with the printer outlet precisely.
      */}
      <div className="absolute top-[35%] md:top-[44%] left-0 w-full z-10 flex">
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
          // Negative margin ensures the left edge of the track starts way offscreen,
          // which allows the right edge to easily span past the printer outlet.
          style={{ width: "max-content", marginLeft: "-1000px" }}
        >
          <PaperUnit sheetImages={sheetImages} />
          <PaperUnit sheetImages={sheetImages} />
        </motion.div>
      </div>
    </div>
  );
}
