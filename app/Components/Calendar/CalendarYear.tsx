import React, { MutableRefObject } from "react";

import { CalendarMonth } from "./CalendarMonth";
import { isCurrentMonth } from "../../utils";

export function CalendarYear({
  year,
  months,
  todayRef,
  onDayClick,
}: {
  year: number;
  months: { month: number; days: { day: number; keypointCount: number }[] }[];
  todayRef: MutableRefObject<null>;
  onDayClick: (
    month: number,
    day: number,
    monthRef: MutableRefObject<null>
  ) => void;
}) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {months.map(({ month, days }) => (
        <CalendarMonth
          key={`${year}-${month}`}
          year={year}
          month={month}
          days={days}
          todayRef={isCurrentMonth(year, month) ? todayRef : undefined}
          onDayClick={(day, monthRef) => onDayClick(month, day, monthRef)}
        />
      ))}
    </div>
  );
}
