import React, { MutableRefObject } from "react";

import { CalendarMonth } from "./CalendarMonth";
import { isCurrentMonth } from "../utils";

export function CalendarYear({
  year,
  months,
  todayRef,
  onDayClick,
}: {
  year: number;
  months: number[];
  todayRef: MutableRefObject<null>;
  onDayClick: (month: number, monthRef: MutableRefObject<null>) => void;
}) {
  return (
    <div>
      <div className="sticky top-0 bg-bg z-50 text-center text-3xl font-extralight text-text_white p-2.5 pb-0">
        {year}
      </div>

      {months.map((month) => (
        <CalendarMonth
          key={`${year}-${month}`}
          year={year}
          month={month}
          todayRef={isCurrentMonth(year, month) ? todayRef : undefined}
          onDayClick={(monthRef) => onDayClick(month, monthRef)}
        />
      ))}
    </div>
  );
}
