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

        <g transform={`translate(${500 / 2}, ${500 / 2})`}>
          <g>
            <circle r={250} fill="url(#radial1)" />
            <circle r={248} fill="url(#radial2)" />
            <circle r={220} fill="url(#radial1)" />
            <circle r={218} fill="#101010" />
          </g>

          <g>
            <FineScale />
            <CoarseScale />
          </g>

          <DateSlot value={value} />

          <g strokeWidth={3}>
            <MonthDial value={value} />
            <MoonDial value={value} />
            <WeekdayDial value={value} />
          </g>

          <g>
            <HourHand value={value} />
            <MinuteHand value={value} />
            <SecondHand value={value} />
          </g>
        </g>
      </svg>
    </div>
  );
}
