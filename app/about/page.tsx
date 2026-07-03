"use client";

import { useState } from "react";
import Image from "next/image";
import { GridOverlay } from "@/components/grid-overlay";

export default function AboutPage() {
  const [gridDrawn, setGridDrawn] = useState(false);

  return (
    <div className="relative min-h-[720px] h-screen w-full flex flex-col pt-24 overflow-hidden">
      {/* Background Grid */}
      <GridOverlay onComplete={() => setGridDrawn(true)} />

      {/* Content */}
      <div 
        className={`relative z-10 w-full h-full max-w-[1440px] mx-auto transition-opacity duration-1000 ${
          gridDrawn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-[39.4%] left-[16.3%] w-[35.5%] pr-12 pt-8">
          <p className="font-bebas text-accent text-[15px] leading-[1.45] tracking-[0.02em] mb-6 text-balance">
            We are proud to say our achievement as – ‘PrintWeek India Creative Repro Company of the Year 2012’ in retouching of images. Healing Tool’s proven service record of accomplishments extends with most of the well known agencies and some of the top most brands in the market. Our years of experience in studio activity with specialized skill sets in International Standard pre-media technology combined with high end infrastructure will assure high standard deliveries. We deliver jobs with excellence and in time. Healing Tool is amongst the very few companies who are involved in making the latest technologies work for the betterment of their customer’s.
          </p>
          <p className="font-bebas text-accent text-[15px] leading-[1.45] tracking-[0.02em] text-balance">
            As a leading structured image retouching solution provider of region, has a much diversified portfolio of services and solution that are available to the customer’s, which can help them gain competitive advantage and become more productive.
          </p>
        </div>

        <div className="absolute top-[39.4%] left-[51.8%] pl-8 pt-8 w-[22.3%]">
          <div className="relative w-[80%] aspect-[2/3] mx-auto overflow-hidden">
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
  );
}
