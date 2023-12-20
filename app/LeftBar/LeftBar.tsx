import React from "react";
import { CalendarYear } from "./CalendarYear";

export function LeftBar() {
  return (
    <div className="flex flex-col overflow-y-auto snap-y scroll-p-[44px] hide-scroll border-r border-border">
      <div className="left-over-height" />

      <CalendarYear year={2023} />

      <div className="left-over-height" />
    </div>
  );
}
