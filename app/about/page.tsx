"use client";

import Image from "next/image";
import { GetYourImagination } from "@/components/get-your-imagination";

export default function AboutPage() {
  const vLines = ["16%", "52%", "74%", "96%"];

  const h1 = "30%";
  const h2 = "65%";
  const h3 = "75%";

  return (
    <>
    <div className="relative min-h-[900px] h-screen w-full flex flex-col bg-ink pt-24 overflow-hidden">
      {/* Grid Lines Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.6">
          {/* H1: Full width */}
          <line x1="0" y1={`calc(${h1} - 2px)`} x2="100%" y2={`calc(${h1} - 2px)`} />
          <line x1="0" y1={`calc(${h1} + 2px)`} x2="100%" y2={`calc(${h1} + 2px)`} />
          
          {/* H2: 0 to Left edge of image (~57%) */}
          <line x1="0" y1={`calc(${h2} - 2px)`} x2="57%" y2={`calc(${h2} - 2px)`} />
          <line x1="0" y1={`calc(${h2} + 2px)`} x2="57%" y2={`calc(${h2} + 2px)`} />

          {/* H3: Right edge of image (~69%) to 100% */}
          <line x1="69%" y1={`calc(${h3} - 2px)`} x2="100%" y2={`calc(${h3} - 2px)`} />
          <line x1="69%" y1={`calc(${h3} + 2px)`} x2="100%" y2={`calc(${h3} + 2px)`} />

          {/* Vertical Lines */}
          {vLines.map((v: string, i: number) => (
            <g key={i}>
              <line x1={`calc(${v} - 2px)`} y1="0" x2={`calc(${v} - 2px)`} y2="100%" />
              <line x1={`calc(${v} + 2px)`} y1="0" x2={`calc(${v} + 2px)`} y2="100%" />
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 w-full h-full z-10 max-w-[1440px] mx-auto pointer-events-none">
        
        {/* Text Block (Column 2: 16% to 52%) */}
        <div 
          className="absolute flex flex-col pl-4 pr-12 pt-[8vh] pointer-events-auto"
          style={{ top: h1, height: `calc(${h2} - ${h1})`, left: `calc(16% + 2px)`, width: `calc(52% - 16% - 4px)` }}
        >
          <div className="flex flex-col gap-6 max-w-[540px]">
            <p className="font-sans text-[#5c7384] text-[12.5px] md:text-[14px] leading-[1.8] font-semibold tracking-tight">
              We are proud to say our achievement as - 'PrintWeek India Creative Repro Company of the Year 2012' in retouching of images. Healing Tool's proven service record of accomplishments extends with most of the well known agencies and some of the top most brands in the market. Our years of experience in studio activity with specialized skill sets in International Standard pre-media technology combined with high end infrastructure will assure high standard deliveries. We deliver jobs with excellence and in time. Healing Tool is amongst the very few companies who are involved in making the latest technologies work for the betterment of their customer's.
            </p>
            <p className="font-sans text-[#5c7384] text-[12.5px] md:text-[14px] leading-[1.8] font-semibold tracking-tight">
              As a leading structured image retouching solution provider of region, has a much diversified portfolio of services and solution that are available to the customer's, which can help them gain competitive advantage and become more productive.
            </p>
          </div>
        </div>

        {/* Image Block (Column 3: 52% to 74%) */}
        <div 
          className="absolute flex items-start justify-center pt-[8vh] pointer-events-auto"
          style={{ top: h1, height: `calc(100% - ${h1})`, left: `calc(52% + 2px)`, width: `calc(74% - 52% - 4px)` }}
        >
          <div className="relative w-[55%] aspect-[2/3] max-w-[280px]">
             <Image 
               src="/images/hero-ribbon-photo.png" 
               alt="About Us" 
               fill 
               className="object-cover" 
             />
          </div>
        </div>

      </div>
    </div>

    <GetYourImagination />
    </>
  );
}
