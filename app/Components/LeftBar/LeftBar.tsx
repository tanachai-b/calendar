import React, { MutableRefObject } from "react";

import { CalendarYear } from "./CalendarYear";

export function LeftBar({ todayRef }: { todayRef: MutableRefObject<null> }) {
  return (
    <div className="flex flex-col overflow-y-auto snap-y scroll-p-[44px] hide-scroll border-r border-border">
      <div className="left-over-height" />

      <CalendarYear year={2023} todayRef={todayRef} />

      <CalendarYear year={2024} todayRef={todayRef} />

      <div className="left-over-height" />
    </div>
  );
}
