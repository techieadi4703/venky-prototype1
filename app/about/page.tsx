"use client";

import Image from "next/image";
import { GetYourImagination } from "@/components/get-your-imagination";

export default function AboutPage() {
  const vLines = ["16%", "52%", "70%", "83%", "95%"];

  const H1 = 300;
  const H2 = 800;

  return (
    <>
    <div className="relative min-h-[1000px] h-screen w-full flex flex-col bg-ink pt-24 overflow-hidden">
      {/* Grid Lines Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <g stroke="var(--color-accent)" strokeWidth="1" opacity="0.4">
          {/* Horizontal Lines */}
          <line x1="0" y1={H1 - 2} x2="100%" y2={H1 - 2} />
          <line x1="0" y1={H1 + 2} x2="100%" y2={H1 + 2} />
          
          <line x1="0" y1={H2 - 2} x2="100%" y2={H2 - 2} />
          <line x1="0" y1={H2 + 2} x2="100%" y2={H2 + 2} />

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
          className="absolute flex items-center px-8 lg:px-16 pointer-events-auto"
          style={{ top: H1, height: H2 - H1, left: `calc(${vLines[0]} + 2px)`, width: `calc(${vLines[1]} - ${vLines[0]} - 4px)` }}
        >
          <div className="flex flex-col gap-6">
            <p className="font-bebas text-[#7C93A3] text-sm md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              We are proud to say our achievement as - 'PrintWeek India Creative Repro Company of the Year 2012' in retouching of images. Healing Tool's proven service record of accomplishments extends with most of the well known agencies and some of the top most brands in the market. Our years of experience in studio activity with specialized skill sets in International Standard pre-media technology combined with high end infrastructure will assure high standard deliveries. We deliver jobs with excellence and in time. Healing Tool is amongst the very few companies who are involved in making the latest technologies work for the betterment of their customer's.
            </p>
            <p className="font-bebas text-[#7C93A3] text-sm md:text-[15px] leading-[1.6] tracking-wider text-balance opacity-80 uppercase">
              As a leading structured image retouching solution provider of region, has a much diversified portfolio of services and solution that are available to the customer's, which can help them gain competitive advantage and become more productive.
            </p>
          </div>
        </div>

        {/* Image Block (Column 3: 52% to 70%) */}
        <div 
          className="absolute flex items-center justify-center p-8 pointer-events-auto"
          style={{ top: H1, height: H2 - H1, left: `calc(${vLines[1]} + 2px)`, width: `calc(${vLines[2]} - ${vLines[1]} - 4px)` }}
        >
          <div className="relative w-full aspect-[2/3] max-w-[300px]">
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
