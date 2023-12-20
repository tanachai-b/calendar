import React from "react";
import { CalendarMonth } from "./CalendarMonth";

export function LeftBar() {
  return (
    <div className="flex flex-col overflow-y-auto snap-y scroll-p-[44px] hide-scroll border-r border-border">
      <div>
        <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight p-2 pb-0">
          {2022}
        </div>
        {Array.from({ length: 12 }).map((_, index) => (
          <CalendarMonth key={index} year={2022} month={index} />
        ))}
      </div>

      <div>
        <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight p-2 pb-0">
          {2023}
        </div>
        {Array.from({ length: 12 }).map((_, index) => (
          <CalendarMonth key={index} year={2023} month={index} />
        ))}
      </div>

      <div>
        <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight p-2 pb-0">
          {2024}
        </div>
        {Array.from({ length: 12 }).map((_, index) => (
          <CalendarMonth key={index} year={2024} month={index} />
        ))}
      </div>
    </div>
  );
}
