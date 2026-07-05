"use client";

import Image from "next/image";
import { GetYourImagination } from "@/components/get-your-imagination";
import { GridOverlay } from "@/components/grid-overlay";

export default function AboutPage() {
  const vLines = ["16%", "52%", "74%", "96%"];

  const h1 = "30%";
  const h2 = "65%";
  const h3 = "75%";

  return (
    <>
      <div className="relative min-h-[900px] h-screen w-full flex flex-col bg-ink pt-24 overflow-hidden">
        {/* Grid Lines Overlay */}
        <GridOverlay />

        <div className="absolute inset-0 w-full h-full z-10 max-w-[1440px] mx-auto pointer-events-none">

          {/* Text Block (Column 2: 16% to 52%) */}
          <div
            className="absolute flex flex-col justify-start pt-8 lg:pt-12 pl-8 md:pl-16 pr-8 md:pr-16 pointer-events-auto"
            style={{ top: '41%', height: '25%', left: '16%', width: '36%' }}
          >
            <div className="flex flex-col gap-3 md:gap-4 max-w-[480px]">
              <p className="font-sans text-[#5c7384] text-[10px] md:text-[11.5px] lg:text-[12.7px] leading-[1.5] font-bold tracking-tight text-justify">
                We are proud to say our achievement as - 'PrintWeek India Creative Repro Company of the Year 2012' in retouching of images. Healing Tool's proven service record of accomplishments extends with most of the well known agencies and some of the top most brands in the market. Our years of experience in studio activity with specialized skill sets in International Standard pre-media technology combined with high end infrastructure will assure high standard deliveries. We deliver jobs with excellence and in time. Healing Tool is amongst the very few companies who are involved in making the latest technologies work for the betterment of their customer's.
              </p>
              <p className="font-sans text-[#5c7384] text-[10px] md:text-[11.5px] lg:text-[12.7px] leading-[1.5] font-bold tracking-tight text-justify">
                As a leading structured image retouching solution provider of region, has a much diversified portfolio of services and solution that are available to the customer's, which can help them gain competitive advantage and become more productive.
              </p>
            </div>
          </div>

          {/* Image Block (Column 3: 52% to 74%) */}
          <div
            className="absolute flex items-start justify-center pt-16 pointer-events-auto"
            style={{ top: '41%', left: '52%', width: '22%' }}
          >
            <div className="relative w-[60%] max-w-[250px] aspect-[2/3] -translate-x-4">
              <Image
                src="/images/woman_saree.png"
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
