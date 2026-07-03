"use client";

import { WorkCarousel } from "@/components/work-carousel";
import { GetYourImagination } from "@/components/get-your-imagination";

export default function WorkPage() {
  return (
    <div className="relative min-h-[720px] w-full flex flex-col bg-ink">
      <WorkCarousel />
      <GetYourImagination />
    </div>
  );
}
