"use client";

import { WorkCarousel } from "@/components/work-carousel";
import { GetYourImagination } from "@/components/get-your-imagination";
import { OurWork } from "@/components/our-work";

export default function WorkPage() {
  return (
    <div className="relative min-h-[720px] w-full flex flex-col bg-ink pt-24">
      <WorkCarousel />
      <OurWork />
      {/* <GetYourImagination /> */}
    </div>
  );
}
