"use client";

import { DateSlot } from "./DateSlot";
import { SvgDefinitions } from "./SvgDefinitions";
import { MonthDial } from "./small-dials/MonthDial";
import { MoonDial } from "./small-dials/MoonDial";
import { WeekdayDial } from "./small-dials/WeekdayDial";
import { HourHand } from "./watch-hands/HourHand";
import { MinuteHand } from "./watch-hands/MinuteHand";
import { SecondHand } from "./watch-hands/SecondHand";
import { CoarseScale } from "./watch-scales/CoarseScale";
import { FineScale } from "./watch-scales/FineScale";

export function Watch({
  className,
  value,
}: {
  className: string;
  value: number;
}) {
  return (
    <div className={className}>
      <svg viewBox="0 0 500 500">
        <SvgDefinitions />

        <circle cx="250" cy="250" r="250" fill="#101010" />

        <g transform={`translate(${250}, ${250})`}>
          <circle cx={0} cy={0} r={250} stroke="none" fill="url(#radial1)" />
          <circle cx={0} cy={0} r={249} stroke="none" fill="url(#radial2)" />
          <circle cx={0} cy={0} r={220} stroke="none" fill="url(#radial1)" />
          <circle cx={0} cy={0} r={219} stroke="none" fill="#101010" />
        </g>

        <g>
          <FineScale />
          <CoarseScale />
        </g>

        <DateSlot />

        <g
          stroke="#808080"
          strokeWidth={3}
          transform={`translate(${250}, ${250})`}
        >
          <MonthDial />
          <MoonDial />
          <WeekdayDial value={value} />
        </g>

        <g>
          <HourHand value={value} />
          <MinuteHand value={value} />
          <SecondHand value={value} />
        </g>
      </svg>
    </div>
  );
}
