import Image from "next/image";

export function Printer() {
  const queueLines = Array(8).fill("GET YOUR IMAGINATION");

  return (
    <>
      {/* ---- PRINTER BODY ---- */}
      {/* z-30 so it sits above the background grid and below the top tray page */}
      <div className="absolute right-[3%] top-[38%] w-[320px] h-[260px] z-30 pointer-events-none">
        <Image
          src="/images/printer-nobg.png"
          alt="Printer"
          fill
          sizes="320px"
          style={{ objectFit: "contain" }}
          className="drop-shadow-2xl"
          priority
        />
      </div>

      {/* ---- PAGE ON TOP OF PRINTER with "GET YOUR IMAGINATION" ---- */}
      {/* z-40 = ABOVE the printer (z-30), sits in the rear paper feed tray */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          right: "4.5%",
          top: "8%",
          width: "270px",
        }}
      >
        <div
          className="w-full px-5 py-5 relative"
          style={{
            backgroundColor: "var(--color-accent)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
          }}
        >
          {queueLines.map((text, i) => (
            <div
              key={i}
              className="font-bebas text-ink tracking-[0.1em] leading-[1.6] text-[1.1rem] font-bold"
              style={{
                opacity: 1 - i * 0.02,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
